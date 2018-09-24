import React, { Component } from 'react';
import IO from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

let socket = IO.connect("http://localhost:8080");

class Question extends Component {

    render() {
        return (
            <div className="started" id="realtime">
                <div className="question">
                    <div className="row text-center">
                        <div className="col-md-12" key={this.props.id}>
                            <h2>
                                <p>{this.props.title}</p>
                            </h2>
                            <div className="choices col-md-12">
                                <button onClick={this.props.onHandleAsnwer}>yes</button>
                                <button onClick={this.props.onHandleAsnwer}>no</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Question;