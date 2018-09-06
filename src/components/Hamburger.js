import React from "react";
import hamburger from "../hamburger.svg";
import PropTypes from "prop-types";

function Hamburger(props) {
  const style = {
    maxHeight: "48px",
    padding: "5px"
    // margin: "6px 0"
  };

  return (
    <div id="hamburger-bar">
      <div className="bap" onClick={props.hamburgerClick} role="navigation">
        <img src={hamburger} alt="menu" style={style} />
      </div>
    </div>
  );
}

Hamburger.propTypes = {
  hamburgerClick: PropTypes.func.isRequired
};

export default Hamburger;
