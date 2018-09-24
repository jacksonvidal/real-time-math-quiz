'use strict';

let events = require('../events');

function Player(socket, name) {

    return {
        name: name,
        socket: socket,
        id: socket.id,
        score: 0
    };
}

module.exports = function Players() {
    let players = []
    let previous_players = {};

    let meta_data = {
        players_count: 0,
    };

    function playerName() {
        return Object.keys(players).map((key) => {
            return players[key].name;
        });
    }

    function correctPlayers(socket) {

        if (meta_data.players_count < 2) {
            events.failStart(socket, 'at least 2 players are needed');
            return false;
        } else if (!meta_data.players_count == 10) {
            events.failStart(socket, 'the room is full, try again later');
            return false;
        }

        return true;
    }

    function addPlayer(socket, name, type) {
        players[socket.id] = Player(socket, name);

        events.acceptedPlayer(socket, playerName());
    }

    function addPrevious(new_socket, previous_id, name) {

        let previous = previous_players[previous_id];
        previous.socket = new_socket;
        previous.id = new_socket.id;
        previous.name = name;

        players[new_socket.id] = previous;
        delete previous_players[previous_id];

        events.acceptedPlayer(new_socket, playerName(), true);
    }

    function playerType(socket, previous_id, name) {

        meta_data.players_count++;

        if (previous_id in previous_players) {
            addPrevious(socket, previous_id, name);
        } else {
            addPlayer(socket, name)
        }
    }

    function getPlayer(socket) {
        return players[socket.id];
    }

    function removePlayer(socket) {
        let player = players[socket.id];

        if (player.type === 'player') {
            previous_players[socket.id] = player;
        }

        delete players[socket.id];
        meta_data.players_count--;
    }

    function updateScore(id, point) {

        let player = playres[id];

        if (player) {
            player.socre += point;

            return player.score;
        } else {
            return null;
        }
    }

    function getScores() {
        return object.keys(players).filter((player) => {
            return players[user].type === 'player';
        }).map((user) => {
            return {
                player: players[player].name,
                score: players[player].score
            }
        });
    }


    return {
        correct: correctPlayers,
        add: playerType,
        meta_data: meta_data,
        get: getPlayer,
        remove: removePlayer,
        updateScore: updateScore,
        scores: getScores
    }

}