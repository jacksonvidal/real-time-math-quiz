import React, { Component } from 'react';

class Wait extends Component {

    render() {
        return (<div className="intermediate">
            <div id="conversation">{this.props.message}</div>
        </div>)
    }
}

export default Wait;