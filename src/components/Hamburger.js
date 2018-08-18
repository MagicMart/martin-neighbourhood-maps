import React, { Component } from "react";
import hamburger from "../hamburger.svg";

function Hamburger(props) {
  const style = {
    maxHeight: "48px",
    padding: "5px"
    // margin: "6px 0"
  };

  return (
    <div id="hamburger-bar">
      <div className="bap" onClick={props.hamburgerClick} role="navigation">
        {/* <div className="hamburger" />
        <div className="hamburger" />
        <div className="hamburger" /> */}
        <img src={hamburger} style={style} />
      </div>
    </div>
  );
}

export default Hamburger;
