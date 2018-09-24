'use strict';

let express = require('express');
let http = require('http');
let socket_io = require('socket.io');

let Players = require('./lib/player');
let Questions = require('./lib/questions');
let Round = require('./lib/round');
let events = require('./events');

module.exports = function start(port) {

    let app = express();
    let server = http.Server(app);
    let io = socket_io(server);

    let players = Players();
    let questions = Questions(5);
    let round = Round();

    function run(socket) {
        players.correct(socket)
    };

    function handleDisconection(socket) {
        let player = players.get(socket);

        if (player) {
            players.remove(socket);
            events.disconetClient(socket, player.name);
        }
    };

    function newQuestion() {
        round.nextQuestion();

        if (round.finish) {
            round = Round();
            events.viewScore(io, players.scores);
        } else {

            let question = questions.get();

            events.viewQuestion(io, question);
        }
    };

    function recordAnswers(socket, answer) {
        let player = players.get(socket);

        round.answer(player, answer);
        events.answerSubmitted(socket, player.name, round.players);

        if (round.hasAllPlayersSubmitted(players.meta_data.players_count)) {
            events.viewAnswers(io, round.answerSubmitted);
        }
    };

    function recordScores(scores) {
        for (let player in scores) {
            player.updateScore(player, scores[player]);
        }

        nextQuestion();
    };

    function calculateWinners() {
        let scores = players.scores;

        var top_score = Math.max.apply(Math, scores.map((player) => {
            return player.score;
        }));

        var winners = scores.filter((player) => {
            return player.score === top_score;
        });

        events.winners(io, winners);
    }

    io.on('connection', (socket) => {

        socket.on('start-round', newQuestion);

        socket.on('disconnect', () => {
            handleDisconection(socket);
        });

        socket.on('add-player', (player) => {
            console.log("a new player has arrived! ", player.name);
            players.add(socket, player.previous, player.name);
        });

        socket.on('begin', () => {
            run(socket);
        });

        socket.on('submit-answer', (answer) => {
            recordAnswers(socket, answer);
        });

        socket.on('scored', recordScores);
        socket.on('finish', calculateWinners);

    });

    return server.listen(port, () => {
        console.log(`App listening on ${port}.`);
    });
}
