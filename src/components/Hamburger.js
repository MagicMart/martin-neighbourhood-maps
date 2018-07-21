import React, { Component } from 'react';

class Hamburger extends Component {
    render () {
        return (

            <div id="hamburger-bar" onClick={this.props.hamburgerClick}>
                <div className="bap">
                  <div className="hamburger"></div>
                  <div className="hamburger"></div>
                  <div className="hamburger"></div>
                </div>
            </div>
        )
    }

}

export default Hamburger