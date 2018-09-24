import React from 'react';
import ReactDOM from 'react-dom';
import Player from './components/Player';
import Quiz from './components/Quiz';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Player} />
            <Route path="/quiz" component={Quiz} />
        </div>
    </Router>,
    document.getElementById('root'));

registerServiceWorker();
