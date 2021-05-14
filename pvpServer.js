var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http, 
    { cors: { origin: "*", methods: ["GET", "POST"] } }
);

var bestiary = require('./SpyCards_Bestiary');
var {
  calc_independent_stats,
  calc_enemy_dependent_abilities,
  determine_turn_winner
} = require('./EvaluateCombat');

const PORT = process.env.PORT || 4000

const new_blank_stats = () => ({
    "heal": 0, "lifesteal": 0, "numb": 0, "atk": 0, "def": 0, "numb_def": 0, "atk_or_def": []
})

let rooms = {"example": {players: {}, turn: 1, phase: "Main Phase", resultPending: true, rematchAccepted: []}}

const jsonstring_to_deck = (jsonstring) => {
    let deck_list = JSON.parse(jsonstring)
    let result = Object.keys(deck_list).map( e => [...Array(deck_list[e])].map(x => bestiary[e])).flat()
    return result;
}

const draw_phase = (room, player1, player2) => {
    draw_n_cards(room, player1)
    draw_n_cards(room, player2)
    rooms[room].phase = "Main Phase"
}

const shuffle_deck = (deck) => {
    let array = deck 
    let curId = array.length;
    while (0 !== curId) {
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array
}

const draw_n_cards = (room, p) =>  { 
    let player = rooms[room].players[p]
    let n = player.hand.length > 0 ? Math.min(Math.max(5 - player.hand.length, 0), 2) : 3
    let drawn_cards = player.deck.slice(0,n)
    rooms[room].players[p] = {
        ...player,
        hand: [...player.hand, ...drawn_cards],
        selected: [...[...new Array(player.hand.length+n)].map(e => false)],
        selected_tp: 0,
        deck: [ ...shuffle_deck(player.deck.slice(n)) ]
    }
}

const play_selected = (room, p1, p2) => {
    for (p of [p1, p2]) {
        let player = rooms[room].players[p]
        let played_cards = [ ...player.hand.filter((e,i) => player.selected[i]) ]
        rooms[room].players[p] = {
            ...player,
            hand: [ ...player.hand.filter((e,i) => player.selected[i] === false) ],
            field: [...played_cards],
            selected: [ ...player.hand.filter((e,i) => player.selected[i] === false) ].map(e => false),
            deck: [...shuffle_deck([...player.deck, ...played_cards])],
        }
    }
    rooms[room].phase = "Battle Phase"
}

const start_battle_phase = (room, p1, p2) => {
    let [player1, player2] = [p1,p2].map(p => rooms[room].players[p])
    player1 = calc_independent_stats(player1)
    player2 = calc_independent_stats(player2)
    player1 = calc_enemy_dependent_abilities(player1, player2)
    player2 = calc_enemy_dependent_abilities(player2, player1)

    console.log("start_battle", player1.stats, player2.stats)

    rooms[room].players[p1] = { ...rooms[room].players[p1], ...player1 }
    rooms[room].players[p2] = { ...rooms[room].players[p2], ...player2 }
    rooms[room].phase = "Calculation Phase"
}

const finish_battle_phase = (room, p1, p2) => {
    let [player1, player2] = [p1,p2].map(p => rooms[room].players[p])
    let [player_1, player_2] = determine_turn_winner(player1, player2)
    rooms[room].players[p1] = { ...player_1, field: [], summons: [], stats: new_blank_stats() }
    rooms[room].players[p2] = { ...player_2, field: [], summons: [], stats: new_blank_stats() }

    rooms[room].phase = "End Phase"
    rooms[room].turn += 1
    rooms[room].readyPlayers = []
    rooms[room].resultPending = player_1.hp > 0 && player_2.hp > 0
}

const valid_move = (room, player, selected) => {
    let p = rooms[room].players[player]
    let tp_usage = selected.map((e, i) => e ? p.hand[i].cost : 0).reduce((sum, e) => (sum += e))
    let curr_tp = Math.min(rooms[room].turn+1, 10)
    return tp_usage <= curr_tp 
}

// rooms.js 
const initNewPlayer = (player_name) => ({
    name: player_name,
    hp: 5, field: [], summons: [], deck: [], hand: [],
    stats: new_blank_stats(), setup:[],
    selected: [],
})

const initRoom = (roomId, userId) => {
    rooms = {
        ...rooms,
        [roomId]: { 
            players: { [userId]: initNewPlayer(userId) }, 
            turn: 1,
            phase: "Main Phase",
            resultPending: true,
            readyPlayers: [],
            rematchAccepted: [],
        }
    }
}

const joinRoom   = (roomId, player2Id) => { rooms[roomId]["players"][player2Id] = initNewPlayer(player2Id) }

const get_open_rooms = () => {
    let roomIds = Object.keys(rooms)
    console.log("open_rooms", rooms)
    return roomIds ? roomIds.filter( room => Object.keys(rooms[room].players).length < 2) : []
}

// server.js
app.get('/', function(req, res) { res.send("<h1>Hello World</h1>"); });

io.on("connection", (socket) => {
    console.log(`Connection detected, User: ${socket.client.id}`)

    socket.on("create-room", (data) => {
        if (data.room in rooms) { 
            socket.emit("display-error", "That room is already taken.");
        } else {
            initRoom(data.room, data.user)
            console.log("create-room\n", rooms)
            io.to("room-lobby").emit("room-created", get_open_rooms())
            socket.join(data.room)
        }
    })

    socket.on("view-rooms", () => {
        socket.emit("room-list-sent", get_open_rooms())
        socket.join("room-lobby")
    })

    socket.on("join-room", data => {
        if (data.room in rooms) {
            joinRoom(data.room, data.user)
            io.to("room-lobby").emit("room-joined", get_open_rooms())
            socket.join(data.room)
        } else { socket.emit("display-error", "That room doesn't exist.") }
    })

    socket.on("player-join", data => {
        let [player, room, deck] = [data.player, data.room, data.deck]
        rooms[room].players[player] = {
            ...rooms[room].players[player],
            deck: shuffle_deck(jsonstring_to_deck(deck))
        }
        if (Object.keys(rooms[room].players).length === 2) {
            let [p1, p2] = Object.keys(rooms[room].players)
            draw_phase(room, p1, p2)
            io.to(room).emit("match-start", {
                players: rooms[room].players, phase: "Main Phase", turn: rooms[room].turn
            })
        }
    })

    socket.on("move-submitted", data => {
        let [room, player, selected] = [data.room, data.player, data.selected]
        console.log("move-submitted", room, player, selected)

        if (valid_move(room, player, selected)) {
            rooms[room].players[player] = {
                ...rooms[room].players[player],
                selected: selected,
                hand: rooms[room].players[player].hand.filter(e => e !== selected),
            }
            rooms[room].readyPlayers = [...rooms[room].readyPlayers, player]
        } else { socket.emit("display-error", "TP Exceeded: Please don't cheat."); } 

        if (rooms[room].readyPlayers.length === 2) {
            let [p1, p2] = Object.keys(rooms[room].players)
            setTimeout( () => {
                play_selected(room, p1, p2);
                io.to(data.room).emit("all-moves-submitted", {
                    players: rooms[data.room].players,
                    phase: rooms[room].phase
                })
            }, 0)
            setTimeout(() => {
                start_battle_phase(room, p1, p2);
                io.to(data.room).emit("battle-phase-result", {
                    players: rooms[data.room].players, 
                    phase: rooms[room].phase
                })
                console.log("post:battle-phase-result", rooms[data.room].players)
            }, 1000)
            setTimeout(() => {
                finish_battle_phase(room, p1, p2)
                io.to(data.room).emit("end-of-turn", {
                    players: rooms[data.room].players, 
                    phase: rooms[room].phase,
                    turn: rooms[room].turn,
                })
            }, 2000)
            setTimeout(() => {
            if (rooms[room].resultPending) {
                draw_phase(room, p1, p2)
                io.to(data.room).emit("start-next-turn", {
                    players: rooms[data.room].players,
                    phase: rooms[room].phase,
                    submitted: false
                })
                } else {
                    let winner = Object.keys(rooms[room].players).filter(p => rooms[room].players[p].hp > 0)[0]
                    io.to(data.room).emit("game-over", winner)
                    console.log("winner", winner)
                }
            }, 3000)
        }
    })

    socket.on("rematch-request", data => {
        let [player, room, deck] = [data.player, data.room, data.deck]
        rooms[room].players[player] = {
            ...initNewPlayer(player),
            deck: shuffle_deck(jsonstring_to_deck(deck))
        }
        rooms[room].rematchAccepted = [...rooms[room].rematchAccepted, player]
        if (rooms[room].rematchAccepted.length === 2) {
            rooms[room] = {
                ...rooms[room],
                players: { ...rooms[room].players },
                turn: 1,
                phase: "Main Phase",
                resultPending: true,
                readyPlayers: [],
                rematchAccepted: [],
            }
            let [p1, p2] = Object.keys(rooms[room].players)
            draw_phase(room, p1, p2)
            io.to(room).emit("match-start", {
                players: rooms[room].players, phase: "Main Phase", turn: rooms[room].turn
            })
        }
    })
})


http.listen(PORT, () => { console.log(`Listening on *: ${PORT}`) })