var bestiary = require('./SpyCards_Bestiary');

/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
Array.prototype.sum            = function() { return this.reduce((e, sum) => (sum += e), 0) }
Array.prototype.nonnull        = function() { return this.filter(e => e) }
Array.prototype.choose_random  = function() { return this[Math.floor(Math.random()*(this.length))] }
Array.prototype.find_abilities = function(keyword) { return this.map(e => e[keyword]).nonnull() }

const won_coinflip = () =>  (Math.round(Math.random()))
const set = (arr) => { return arr.filter((e,i) => arr.indexOf(e) === i) }

const calc_independent_stats = (p) => {
    let player = { ...p }

    let stats = player.stats
    let abilities = player.field.map(e => e.abilities).nonnull()

    // 0a. Activate Previous Turn's Setup Abilities:
    if (player.setup) {
        for (let setup of player.setup) {stats[setup.stat] += setup.amount}
        player.setup = []
    }
    // 0b. Trigger Setup abilities for next turn
    let setup_abilities = abilities.find_abilities("setup")
    for (let setup of setup_abilities) {
        player.setup = [...player.setup, setup]
    }

    // 1. Resolve Coin Summon:
    let coinsummon_abilities = abilities.find_abilities("coinsummon")
    for (let coinsummons of coinsummon_abilities) {
        for (let coinsummon of coinsummons){
            if (won_coinflip()) { 
                player.summons = [...player.summons, bestiary[coinsummon]]
            }
        }
    }

    // 2. Field-Altering Abilities: Summon, Randomsummon
    let summon_abilities = abilities.find_abilities("summon")
    for (let summons of summon_abilities) {
        player.summons = [...player.summons, ...summons.map(e => bestiary[e])]
    }

    let randomsummon_abilities = abilities.find_abilities("randomsummon")
    for (let randomsummons of randomsummon_abilities) {
        player.summons = [...player.summons, ...randomsummons.map( e => e.choose_random() )]
    }

    // Now that summons are all finished, create summons & field merger
    // MEMO: Keep summons separate from field so as not shuffle summon into deck
    let active_field = [...player.field, ...player.summons]

    // calc ATK && DEF
    stats.atk += active_field.map(e => e.atk).sum()
    stats.def += active_field.filter(e => e.def).map(e => e.def).sum()

    abilities = active_field.map(e => e.abilities).nonnull()

    // 3. Resolve Non-Attack Conditionals: IF, COIN, TRIBE(X)
    // 3a. Resolve coin
    let coin_abilities = abilities.find_abilities("coin")
    for (let coins of coin_abilities) {
        for (let coin of coins) {
            let affected_stat = coin.stat
            if (won_coinflip()) {
                stats[affected_stat] += coin["amount"]
            }
        }
    }
    // 3b. Resolve If/Combo abilities
    let combo_abilities = abilities.find_abilities("combo")
    for (let combo of combo_abilities) {
        let affected_stat = combo.effect.stat 
        stats[affected_stat] +=
            active_field.map(card => card.name).includes(combo.card) ? 
                combo.effect.amount : 0
    }

    // 3c. Resolve Tribe(X) abilities
    let tribe_x_abilities = abilities.find_abilities("tribe_x")
    for (let tribe_x of tribe_x_abilities) {
        if (active_field.filter(e => e.tribe.includes(tribe_x.ally)).length >= tribe_x.threshold) {
            let affected_stat = tribe_x.effect.stat
            stats[affected_stat] += tribe_x.effect.amount
        }
    }

    // 4. Resolve Atk_Or_Buffs = => 
    // MEMO: stats["atk_or_def"] is a list of buff_values, e.g. [1,2,1,1]
    for (let value of stats.atk_or_def) {
        let chosen_stat = won_coinflip() ? "atk" : "def"
        stats[chosen_stat] += value
    }

    // 5. ATK-Altering Abilities:    {EMPOWER}, UNITY
    let empower_abilities = abilities.find_abilities("empower")
    for (let empower of empower_abilities) {
        stats.atk += empower.gain * active_field.filter(e => e.tribe.includes(empower.ally)).length
    }
    // MEMO: each Unity ability can only proc once; ~= empower but only counts num of unique allies
    let unity_abilities = abilities.find_abilities("unity")
    let unique_initiators = unity_abilities.map(e => e.initiator)
    let unique_unity = unique_initiators.map(e => bestiary[e].abilities.unity)

    for (let unity of unique_unity) {
        let unique_allies = set(active_field.filter(e => e.tribe.includes(unity.ally)).map(e => e.name))
        stats.atk += unity.gain * unique_allies.length
    }

    // 6. ATK-Conditional Abilities: {ATK(X)}
    let if_atk_x_abilities = abilities.find_abilities("if_atk_x")
    for (let if_atk_x of if_atk_x_abilities){
        if (stats["atk"] >= if_atk_x["threshold"]){
            stats[if_atk_x.effect.stat] += if_atk_x.effect.amount
        }
    }
    // 7. Life-Altering Abilities: {HEAL}
    player["hp"] += player["stats"]["heal"]
    player["hp"] = Math.min(player["hp"], 5)

    // 8. Calculate Lifesteal
    player.stats.lifesteal += abilities.map(e => e.lifesteal).nonnull().sum()
 
    return { ...player }
};

const calc_enemy_dependent_abilities = (p, e) => {
    let player = p
    let enemy  = e

    let active_field       = [...player.field, ...player.summons]
    let enemy_active_field = [...enemy.field, ...enemy.summons]
    let abilities          = active_field.map(e => e.abilities).nonnull()

    // 9a. {VS} -- Apply VS
    let vs_abilities = abilities.find_abilities("vs")
    for (let vs of vs_abilities) {
        // need flat list of enemy card["tribe"] values
        if ( enemy_active_field.map(e => e.tribe).flat().includes(vs.target) ) {
            player.stats.atk += vs.gain
        }
    }
    // 9b. {PIERCE} -- Apply Pierce: before they gain from =  numb (don't pierce numb DEF => 
    let piercing = abilities.find_abilities("pierce").sum()
    player.stats.atk += Math.min(enemy.stats.def, piercing)


    // 9c. {NUMB} -- Apply Numb: make NUMB gain Defense equal to attacker's Attack
    player.stats.numb += abilities.find_abilities("numb").sum()
    
    if (player.stats.numb) {
        let attackers = enemy_active_field.filter(e => e.type === "attacker")
        if (player.stats.numb >= attackers.length) {
            let numbed_damage = attackers.map(e => e.atk).sum()
            player.stats.numb_def += numbed_damage
        }
        else {
        // DESIGN CHOICE: numb N weakest instead of front N attackers; b/c can play attackers in any order
            let n = player.stats.numb
            player.stats.numb_def += [...attackers]
                .sort((a,b) => (a.atk - b.atk))
                .slice(0,n)
                .map(e => e.atk).sum()
            console.log("sorted attackers:", [...attackers].sort(e => e.atk))
        }
    }

    return player
}

const determine_turn_winner = (p1, p2) => {
    let player1 = { ...p1 }
    let player2 = { ...p2 }

    // 10. Apply Defense
    let p1_final_atk = Math.max(0, player1.stats.atk - player2.stats.def - player2.stats.numb_def)
    let p2_final_atk = Math.max(0, player2.stats.atk - player1.stats.def - player1.stats.numb_def)

    // 11. Determine turn's victor: deal damage && apply Lifesteal
    if (p1_final_atk !== p2_final_atk){
        let victor = p1_final_atk > p2_final_atk ? player1.name : player2.name
        // let loser = p1_final_atk > p2_final_atk  ? player2 : player1

        for (let player of [player1, player2]) {
            if (victor === player.name) {
                player.hp += player.stats.lifesteal
                player.hp = Math.min(player.hp, 5)
            }
            else {
                player.hp -= 1
            }
        }
    }

    return [player1, player2]

}

module.exports = {
    calc_independent_stats,
    calc_enemy_dependent_abilities,
    determine_turn_winner
}

// export default conduct_battle_phase;