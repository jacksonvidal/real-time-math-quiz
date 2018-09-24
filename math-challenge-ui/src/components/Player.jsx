import React, { Component } from 'react';

import IO from 'socket.io-client';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';

let socket = IO.connect("http://localhost:8080");

class Player extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        let playerName = document.getElementById("playerName").value;

        let previous = localStorage.playerID;

        socket.emit('add-player', { previous: previous, name: playerName });

        localStorage.setItem("playerID", socket.id);
        localStorage.setItem("playerName", playerName);

        socket.emit('start-round');

        socket.once('question-view', function (questions) {
            if (localStorage.getItem("question") !== undefined) {
                localStorage.setItem("questions", JSON.stringify(questions));
            }
        });

        window.location.href = "/quiz";
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

                <form id="frmPlayer" onSubmit={this.handleSubmit}>
                    <div className="just_start">
                        <div className="text-center">
                            <h2>Play a Real Time Math Quiz</h2>
                            <input type="text" id="playerName" placeholder="Enter your name..." required />
                            <div className="form-controls">
                                <button className="btn btn-lg btn-start" type="submit">Start the Game!</button>
                            </div>
                        </div>
                    </div>
                </form>

            </ReactCSSTransitionGroup>

        )
    }

}

export default Player;