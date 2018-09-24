import React, { Component } from 'react';
import Question from './Question';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Quiz extends Component {

    constructor() {
        super();

        let questions = JSON.parse(localStorage.getItem("questions"));

        this.state = {
            questions: questions,
            question: '',
            counter: 0,
            questionId: 1,
            answers: []
        };

        this.handleAnswer = this.handleAnswer.bind(this);
    }

    nextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;

        
        return (<Question id={questionId} title={this.state.questions[counter].title} onHandleAsnwer={this.handleAnswer} />);
    }

    handleAnswer(event) {

        console.log(event);

        socket.emit('submit-answer', { questionId: questionId, answer: answer });
        this.nextQuestion();
    }


    render() {
        return (
            <ReactCSSTransitionGroup
                className="container"
                component="div"
                transitionName="fade"
                transitionEnterTimeout={800}
                transitionLeaveTimeout={500}
                transitionAppear
                transitionAppearTimeout={500}>

                {this.nextQuestion()}

            </ReactCSSTransitionGroup>
        )
    }
}

export default Quiz;