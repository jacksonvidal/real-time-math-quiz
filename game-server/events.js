'use strict';

exports.err = function err(socket, message) {
    socket.emit('err', message);
}

exports.disconetClient = function disconetClient(socket, name) {
    socket.broadcast.emit('client-disconet', name);
}

exports.failStart = function failStart(socket, reason) {
    socket.emit('fail-start', reason);
}

exports.acceptedPlayer = function acceptedPlayer(socket, players, previous) {
    socket.emit('client-accepted', previous);
    socket.broadcast.emit('new-player', players);
}

exports.viewScore = function viewScore(socket, scores) {
    socket.emit('scores-view', scores);
}

exports.viewQuestion = function viewQuestion(socket, question) {
    socket.emit('question-view', question);
}

exports.answerSubmitted = function answerSubmitted(socket, name, players) {
    socket.broadcast.emit('answer-submitted', players);
}

exports.viewAnswers = function answersView(socket, answers) {
    socket.emit('answers-view', answers);
}

exports.winners = function winners(socket, players) {
    socket.emit('winners', users);
}