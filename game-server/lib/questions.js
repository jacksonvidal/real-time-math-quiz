'use_strict'

function createBasicMathQuestion() {

    let operations = Array("sum", "subtract", "multiply", "divide");
    let operands = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    return {
        operand_a: operands[Math.floor(Math.random() * operands.length)],
        operand_b: operands[Math.floor(Math.random() * operands.length)],
        operation: operations[Math.floor(Math.random() * operations.length)]
    }
}

function createQuestions(question_count) {
    let questions = [];

    for (let i = 0; i < question_count; ++i) {
        let question = createBasicMathQuestion();

        if (isUniqueRoundQuestion(question, questions)) {

            let id = (i + 1);
            let formattedQuestion = {};

            switch (question.operation) {
                case "sum":
                    {
                        formattedQuestion.id = id;
                        formattedQuestion.title = question.operand_a + " + " + question.operand_b;
                        formattedQuestion.correctAnswer = parseInt(question.operand_a) + parseInt(question.operand_b);
                    }
                    break;
                case "subtract":
                    {
                        formattedQuestion.id = id;
                        formattedQuestion.title = question.operand_a + " - " + question.operand_b;
                        formattedQuestion.correctAnswer = parseInt(question.operand_a) - parseInt(question.operand_b);
                    }
                    break;
                case "multiply":
                    {
                        formattedQuestion.id = id;
                        formattedQuestion.title = question.operand_a + " * " + question.operand_b;
                        formattedQuestion.correctAnswer = parseInt(question.operand_a) * parseInt(question.operand_b);
                    }
                    break;
                case "divide":
                    {
                        formattedQuestion.id = id;
                        formattedQuestion.title = question.operand_a + " / " + question.operand_b;
                        formattedQuestion.correctAnswer = parseInt(question.operand_a) / parseInt(question.operand_b);
                    }
                    break;
                default:
                    break;
            }

            questions.push(formattedQuestion);
        }
        else
            --i;
    }

    return questions;
}

//melhorar o codigo
function isUniqueRoundQuestion(question, questions) {

    for (let i = 0; i < questions.length; i++) {
        if (questions.indexOf(question) > -1)
            return false;
    }

    return true;
}

module.exports = function Questions(questions_count) {
    let freshQuestions = createQuestions(questions_count);
    let usedQuestions = {};

    function getNewSet() {
        return freshQuestions;
    }

    return {
        get: getNewSet,
    }
};