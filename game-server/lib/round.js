'use_strict'

const NO_QUESTIONS = 5;

module.exports = function Round() {
    let questions_counter = 0;
    let answers = [];

    function getPlayers() {
        return answers.map((answer) => {
            return answer.player.name;
        });
    }

    function nextQuestion() {
        answers = [];
        questions_counter++;
    }

    function retrivePlayersAnswers(player, answer) {
        answers.push({ player: player, answer: answer });
    }

    function hasAllPlayersSubmitted (players_count) {
        players_count === answers.length; 
    }


    return  {
        nextQuestion: nextQuestion,
        answer: retrivePlayersAnswers,
        hasAllPlayersSubmitted: hasAllPlayersSubmitted,
        get players() { return getPlayers(); },
        get finish() { return questions_counter > NO_QUESTIONS },
        get answers() { return answers; }
    }
}