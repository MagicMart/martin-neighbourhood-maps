import React, { Component } from "react";

class Hamburger extends Component {
  render() {
    return (
      <div id="hamburger-bar">
        <div
          className="bap"
          onClick={this.props.hamburgerClick}
          role="navigation"
        >
          <div className="hamburger" />
          <div className="hamburger" />
          <div className="hamburger" />
        </div>
      </div>
    );
  }
}

export default Hamburger;
