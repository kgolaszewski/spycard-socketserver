let leafbug  = ["leafbug", "bug"]
let mothbug  = ["mothfly", "bug"]
let waspbug  = ["wasp", "bug"]
let bugthug  = ["bug", "thug"]
let bug      = ["bug"]
let chomper  = ["chomper", "plant"]
let fungus   = ["fungus"]
let spider   = ["spider"]
let bot      = ["bot"]
let seedling = ["seedling", "plant"]
let weevil   = ["weevil", "bug"]

let bestiary = {
    "Spider": {
        "name": "Spider", "cost": 3, "atk": 2, "type": "boss", "tribe": spider, 
        "abilities": {
            "summon": ["Inichas", "Jellyshroom"]
        }
    },

    "Venus' Guardian": {
        "name": "Venus' Guardian", "cost": 4, "atk": 2, "type": "boss", "tribe": ["plant"],
        "abilities": {
            "empower": {"gain": 3, "ally": "venus"},
        },
    },    

    "Heavy Drone B-33": {
        "name": "Heavy Drone B-33", "cost": 5, "atk": 0, "def": 2, "type": "boss", "tribe": bot,
        "abilities": {
            "empower": {"gain": 2, "ally": "bot"},
        },
    },

    "The Watcher": {
        "name": "The Watcher", "cost": 5, "atk": 1, "type": "boss", "tribe": [], 
        "abilities": {
            "summon": ["Krawler", "Warden"]
        }
    },

    "The Beast": {
        "name": "The Beast", "cost": 5, "atk": 3, "type": "boss", "tribe": [],
        "abilities": {
            "combo": {"card": "Kabbu", "effect": {"stat": "atk", "amount": 4}}
        },
    },    


    "Ultimax Tank": {
        "name": "Ultimax Tank", "cost": 7, "atk": 8, "type": "boss", "tribe": [],
    },

    // Empower Bosses
    "Mother Chomper": {
        "name": "Mother Chomper", "cost": 4, "atk": 0, "type": "boss", "tribe": chomper,
        "abilities": {
            "empower": {"gain": 2, "ally": "chomper"},
            "lifesteal": 2,
        },
    },

    "Broodmother": {
        "name": "Broodmother", "cost": 4, "atk": 2, "type": "boss", "tribe": bug,
        "abilities": {
            "empower": {"gain": 2, "ally": "midge"},
        },
    },

    "Zommoth": {
        "name": "Zommoth", "cost": 4, "atk": 0, "type": "boss", "tribe": fungus,
        "abilities": {
            "empower": {"gain": 2, "ally": "fungus"},
        },
    },

    "Seedling King": {
        "name": "Seedling King", "cost": 4, "atk": 0, "type": "boss", "tribe": seedling,
        "abilities": {
            "empower": {"gain": 2, "ally": "seedling"},
        },
    },

    "Tidal Wyrm": {
        "name": "Tidal Wyrm", "cost": 5, "atk": 2, "type": "boss", "tribe": [],
        "abilities": { "numb": Infinity },
    },

    "Peacock Spider": {
        "name": "Peacock Spider", "cost": 5, "atk": 0, "type": "boss", "tribe": spider,
        "abilities": {
            "empower": {"gain": 3, "ally": "spider"},
        },
    },

    "Devourer": {
        "name": "Devourer", "cost": 4, "atk": 3, "type": "boss", "tribe": ["plant"],
        "abilities": { 
            "vs":  {"target": "bug", "gain": 3}
        },
    },

    "False Monarch": {
        "name": "False Monarch", "cost": 5, "atk": 0, "type": "boss", "tribe": mothbug,
        "abilities": {
            "empower": {"gain": 3, "ally": "mothfly"},
        },
    },

    "Maki": {
        "name": "Maki", "cost": 6, "atk": 6, "type": "boss", "tribe": bug,
    },

    "Wasp King": {
        "name": "Wasp King", "cost": 7, "atk": 0, "type": "boss", "tribe": ["bug"], 
        "abilities": {
            "randomsummon": [
                ["Wasp Scout", "Wasp Trooper", "Wasp Bomber", "Wasp Driller"],
                ["Wasp Scout", "Wasp Trooper", "Wasp Bomber", "Wasp Driller"]
            ]
        }
    },

    "The Everlasting King": {
        "name": "The Everlasting King", "cost": 9, "atk": Infinity, "type": "boss", "tribe": [],
    },


    // Minibosses
    "Ahoneynation": {
        "name": "Ahoneynation", "cost": 5, "atk": 0, "type": "miniboss", "tribe": [],
        "abilities": {
            "coinsummon": ["Abomihoney", "Abomihoney"]
        },
    },

    "Acolyte Aria": {
        "name": "Acolyte Aria", "cost": 3, "atk": 1, "type": "miniboss", "tribe": bug,
        "abilities": {
            "coinsummon": ["Venus' Bud", "Venus' Bud", "Venus' Bud"]
        },
    },

    "Mothiva": {
        "name": "Mothiva", "cost": 2, "atk": 2, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Zasp", "effect": {"stat": "heal", "amount": 1}}
        },
    },
    
    "Zasp": {
        "name": "Zasp", "cost": 3, "atk": 3, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Mothiva", "effect": {"stat": "atk", "amount": 2}}
        },
    },

    "Astotheles": {
        "name": "Astotheles", "cost": 5, "atk": 0, "type": "miniboss", "tribe": bugthug,
        "abilities": { "empower": { "gain": 3, "ally": "thug" } },
    },

    "Dune Scorpion": {
        "name": "Dune Scorpion", "cost": 7, "atk": 7, "type": "miniboss", "tribe": [],
    },

    "Primal Weevil": {
        "name": "Primal Weevil", "cost": 6, "atk": 3, "type": "miniboss", "tribe": weevil,
        "abilities": { "empower": { "gain": 2, "ally": "weevil" } },
    },

    "Cross": {
        "name": "Cross", "cost": 3, "atk": 2, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Poi", "effect": {"stat": "atk", "amount": 2}}
        },
    },

    "Poi": {
        "name": "Poi", "cost": 3, "def": 1, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Cross", "effect": {"stat": "def", "amount": 3}}
        },
    },

    "General Ultimax": {
        "name": "General Ultimax", "cost": 3, "atk": 1, "type": "miniboss", "tribe": waspbug,
        "abilities": {
            "empower": {"gain": 1, "ally": "wasp"},
        },
    },

    "Cenn": {
        "name": "Cenn", "cost": 3, "atk": 2, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Pisci", "effect": {"stat": "numb", "amount": 1}}
        },
    },

    "Pisci": {
        "name": "Pisci", "cost": 3, "def": 2, "type": "miniboss", "tribe": bug,
        "abilities": {
            "combo": {"card": "Cenn", "effect": {"stat": "def", "amount": 4}}
        },
    },

    "Scarlet": {
        "name": "Scarlet", "cost": 3, "atk": 3, "type": "miniboss", "tribe": bug,
        "abilities": {
            "if_atk_x": { "threshold": 7, "effect": {"stat": "heal", "amount": 1} } 
        },
    },

    "Kabbu": {
        "name": "Kabbu", "cost": 2, "atk": 1, "type": "miniboss", "tribe": bug,
        "abilities": { "pierce": 3 },
    },

    "Kali": {
        "name": "Kali", "cost": 4, "atk": 0, "def": 2, "type": "miniboss", "tribe": bug,
        "abilities": { 
            "combo": {"card": "Kabbu", "effect": {"stat": "heal", "amount": 3}}
        },
    },

    "Carmina": {
        "name": "Carmina", "cost": 4, "atk": 0, "type": "miniboss", "tribe": [], 
        "abilities": {
            "randomsummon": [
                [
                    "Dune Scorpion", "Acolyte Aria", "Cenn", "Pisci", "Cross", "Poi", 
                    "Dead Lander Alpha", "Dead Lander Beta", "Dead Lander Gamma", 
                    "Primal Weevil", "Scarlet", "Astotheles", "Riz", "Zasp", "Mothiva", "Kabbu", 
                    "Kali", "Kina", "Yin", "Stratos", "Delilah", "Ahoneynation", "Carmina",
                    "General Ultimax"
                ]
            ]
        }
    },

    "Riz": {
        "name": "Riz", "cost": 3, "atk": 1, "type": "miniboss", "tribe": bug,
        "abilities": {
            "setup": {"stat": "atk", "amount": 2}
        },
    },

    

    "Kina": {
        "name": "Kina", "cost": 4, "atk": 2, "type": "miniboss", "tribe": bug,
        "abilities": { 
            "combo": {"card": "Maki", "effect": {"stat": "atk", "amount": 3}}
        },
    },

    "Yin": {
        "name": "Yin", "cost": 3, "atk": 0, "def": 1, "type": "miniboss", "tribe": bug,
        "abilities": { 
            "combo": {"card": "Maki", "effect": {"stat": "heal", "amount": 2}}
        },
    },

    "Stratos": {
        "name": "Stratos", "cost": 6, "atk": 4, "type": "miniboss", "tribe": bug,
        "abilities": { 
            "pierce": 3,
            "combo": {"card": "Delilah", "effect": {"stat": "atk", "amount": 1}}
        },
    },

    "Delilah": {
        "name": "Delilah", "cost": 3, "atk": 2, "type": "miniboss", "tribe": bug,
        "abilities": { 
            "lifesteal": 2,
            "combo": {"card": "Stratos", "effect": {"stat": "def", "amount": 1}}
        },
    },

    "Dead Lander Alpha": {
        "name": "Dead Lander Alpha", "cost": 4, "atk": 3, "def": 1, "type": "miniboss", "tribe": [],
    },

    "Dead Lander Beta": {
        "name": "Dead Lander Beta", "cost": 4, "atk": 2, "type": "miniboss", "tribe": [],
        "abilities": {
            "coin": [{"stat": "atk_or_def", "amount": [2]}]
        },
    },

    "Dead Lander Gamma": {
        "name": "Dead Lander Gamma", "cost": 6, "atk": 3, "def": 3, "type": "miniboss", "tribe": [],
    },

    // Attacker Cards
    "Seedling": {"name": "Seedling", "cost": 1,"atk": 1, "type": "attacker", "tribe": seedling},
    "Underling": {"name": "Underling", "cost": 3,"atk": 3, "type": "attacker", "tribe": seedling},
    "Zombiant": {"name": "Zombiant", "cost": 1,"atk": 1, "type": "attacker", "tribe": fungus},
    "Jellyshroom": {"name": "Jellyshroom", "cost": 1,"atk": 1, "type": "attacker", "tribe": fungus},
    "Zombee": {"name": "Zombee", "cost": 3,"atk": 3, "type": "attacker", "tribe": fungus},
    "Bloatshroom": {"name": "Bloatshroom", "cost": 4,"atk": 4, "type": "attacker", "tribe": fungus},
    "Zombeetle": {"name": "Zombeetle", "cost": 5,"atk": 5, "type": "attacker", "tribe": fungus},
    "Chomper": {"name": "Chomper", "cost": 2,"atk": 2, "type": "attacker", "tribe": chomper},
    "Chomper Brute": {"name": "Chomper Brute", "cost": 4,"atk": 4, "type": "attacker", "tribe": chomper},
    "Psicorp": {"name": "Psicorp", "cost": 2,"atk": 2, "type": "attacker", "tribe": bug},
    "Arrow Worm": {"name": "Arrow Worm", "cost": 3,"atk": 3, "type": "attacker", "tribe": bug},
    "Thief": {"name": "Thief", "cost": 2,"atk": 2, "type": "attacker", "tribe": bugthug},
    "Bandit": {"name": "Bandit", "cost": 3,"atk": 3, "type": "attacker", "tribe": bugthug},
    "Burglar": {"name": "Burglar", "cost": 4,"atk": 4, "type": "attacker", "tribe": bugthug},
    "Ruffian": {"name": "Ruffian", "cost": 6,"atk": 6, "type": "attacker", "tribe": bugthug},
    "Security Turret": {"name": "Security Turret", "cost": 2,"atk": 2, "type": "attacker", "tribe": bot},
    "Krawler": {"name": "Krawler", "cost": 2,"atk": 2, "type": "attacker", "tribe": bot},
    "Warden": {"name": "Warden", "cost": 3,"atk": 3, "type": "attacker", "tribe": bot},
    "Mantidfly": {"name": "Mantidfly", "cost": 4,"atk": 4, "type": "attacker", "tribe": bug},
    "Belostoss": {"name": "Belostoss", "cost": 6,"atk": 6, "type": "attacker", "tribe": bug},
    "Water Strider": {"name": "Water Strider", "cost": 3,"atk": 3, "type": "attacker", "tribe": bug},
    "Jumping Spider": {"name": "Jumping Spider", "cost": 3,"atk": 3, "type": "attacker", "tribe": spider},
    "Mimic Spider": {"name": "Mimic Spider", "cost": 5,"atk": 5, "type": "attacker", "tribe": spider},
    "Diving Spider": {"name": "Diving Spider", "cost": 3,"atk": 3, "type": "attacker", "tribe": spider},
    "Mothfly": {"name": "Mothfly", "cost": 1,"atk": 1, "type": "attacker", "tribe": mothbug},
    "Mothfly Cluster": {"name": "Mothfly Cluster", "cost": 3,"atk": 3, "type": "attacker", "tribe": mothbug},
    "Wasp Scout": {"name": "Wasp Scout", "cost": 2,"atk": 2, "type": "attacker", "tribe": waspbug},
    "Wasp Trooper": {"name": "Wasp Trooper", "cost": 4,"atk": 4, "type": "attacker", "tribe": waspbug},
    "Haunted Cloth": {"name": "Haunted Cloth", "cost": 4,"atk": 4, "type": "attacker", "tribe": []},
    "Abomihoney": {"name": "Abomihoney", "cost": 4,"atk": 4, "type": "attacker", "tribe": []},
    "Midge": {"name": "Midge", "cost": 1, "atk": 1, "type": "attacker", "tribe": ["midge", "bug"],},
    "Golden Seedling": {"name": "Golden Seedling", "cost": 9,"atk": 9, "type": "attacker", "tribe": seedling},




    // Effect Cards
    "Acornling": {
        "name": "Acornling", "cost": 2, "atk": 0, "type": "effect", "tribe": seedling,
        "abilities": {
            "coin": [{"stat": "def", "amount": 3}]
        }
    },

    "Cactiling": {
        "name": "Cactiling", "cost": 3, "atk": 0, "type": "effect", "tribe": seedling,
        "abilities": {
            "coin": [{"stat": "def", "amount": 4}]
        }
    },

    "Flowerling": {
        "name": "Flowerling", "cost": 1, "atk": 0, "type": "effect", "tribe": seedling,
        "abilities": { "lifesteal": 1 },
    },

    "Plumpling": {
        "name": "Plumpling", "cost": 6, "atk": 0, "type": "effect", "tribe": seedling,
        "abilities": {
            "coin": [{"stat": "def", "amount": 6}]
        },
    },

    "Inichas": {
        "name": "Inichas", "cost": 1, "atk": 0, "type": "effect", "tribe": bug,
        "abilities": {
            "coin": [{"stat": "def", "amount": 2}]
        }
    },

    "Denmuki": {
        "name": "Denmuki", "cost": 3, "atk": 1, "type": "effect", "tribe": bug,
        "abilities": {
            "coin": [{"stat": "numb", "amount": 1}]
        },
    },

    "Madesphy": {
        "name": "Madesphy", "cost": 5, "atk": 0, "type": "effect", "tribe": bug,
        "abilities": {
            "coin": [{"stat": "def", "amount": 3}]*2
        }
    },

    "Numbnail": {
        "name": "Numbnail", "cost": 2, "atk": 0, "type": "effect", "tribe": bug,
        "abilities": { "numb": 1 },
    },

    "Ironnail": {
        "name": "Ironnail", "cost": 3, "atk": 0, "def": 1, "type": "effect", "tribe": bug,
        "abilities": { "numb": 1 },
    },

    "Wild Chomper": {
        "name": "Wild Chomper", "cost": 3, "atk": 1, "type": "effect", "tribe": chomper,
        "abilities": {
            "coinsummon": ["Chomper"]
        },
    },

    "Weevil": {
        "name": "Weevil", "cost": 2, "atk": 1, "type": "effect", "tribe": weevil,
        "abilities": { 
            "vs":  {"target": "plant", "gain": 2}
        },
    },

    "Bee-Boop": {
        "name": "Bee-Boop", "cost": 1, "atk": 0, "type": "effect", "tribe": bot,
        "abilities": {
            "coin": [{"stat": "atk_or_def", "amount": [1]}]
        },
    },

    "Mender": {
        "name": "Mender", "cost": 1, "atk": 0, "type": "effect", "tribe": bot,
        "abilities": {
            "tribe_x": {
                "ally": "bot", 
                "threshold": 5, 
                "effect": { "stat": "heal", "amount": 1 }
            },
        },
    },

    "Leafbug Archer": {
        "name": "Leafbug Archer", "cost": 2, "atk": 0, "type": "effect", "tribe": leafbug,
        "abilities": {
            "unity": {"gain": 1, "ally": "leafbug", "initiator": "Leafbug Archer"},
        },
    },


    "Leafbug Ninja": {
        "name": "Leafbug Ninja", "cost": 3, "atk": 0, "type": "effect", "tribe": leafbug,
        "abilities": {
            "unity": {"gain": 2, "ally": "leafbug", "initiator": "Leafbug Ninja"},
        },
    },

    "Leafbug Clubber": {
        "name": "Leafbug Clubber", "cost": 4, "atk": 2, "type": "effect", "tribe": leafbug,
        "abilities": {
            "tribe_x": {
                "ally": "leafbug", 
                "threshold": 3, 
                "effect": { "stat": "numb", "amount": 1 }
            },
        },
    },

    "Wasp Bomber": {
        "name": "Wasp Bomber", "cost": 5, "atk": 2, "type": "effect", "tribe": waspbug,
        "abilities": {
            "coin": [
                {"stat": "numb", "amount": 1},
                {"stat": "atk", "amount": 1},
            ]
        },
    },

    "Wasp Driller": {
        "name": "Wasp Driller", "cost": 6, "atk": 4, "type": "effect", "tribe": waspbug,
        "abilities": { "pierce": 2 },
    },

    "Venus' Bud": {
        "name": "Venus' Bud", "cost": 1, "atk": 0, "type": "effect", "tribe": ["plant", "venus"],
        "abilities": { "lifesteal": 1 },
    },
}

module.exports = bestiary;