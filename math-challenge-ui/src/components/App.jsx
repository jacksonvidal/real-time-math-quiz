import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Player from './Player';
import Quiz from './Quiz';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      answers: [],
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/player" Component={Player} />
        <Route exact path="/quiz" Component={Quiz} />
      </Switch>
    );
  }
}

export default App;
