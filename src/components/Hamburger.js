import React, { Component } from "react";

function Hamburger(props) {
  return (
    <div id="hamburger-bar">
      <div className="bap" onClick={props.hamburgerClick} role="navigation">
        <div className="hamburger" />
        <div className="hamburger" />
        <div className="hamburger" />
      </div>
    </div>
  );
}

export default Hamburger;
