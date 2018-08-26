import React, { Component } from "react";
import PropTypes from "prop-types";

class Menu extends Component {
  choiceMade = e => {
    this.props.update(e.target.value);
  };

  render() {
    const options = this.props.locations.map(loc => {
      return (
        <option value={loc.name} key={loc.name}>
          {loc.name}
        </option>
      );
    });

    return (
      <div className="menu-container">
        <select
          id="menu"
          onChange={this.choiceMade}
          value={this.props.choice}
          tabIndex="0"
        >
          <option value="all">All Places</option>
          {options}
        </select>
      </div>
    );
  }
}

Menu.propTypes = {
  locations: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  choice: PropTypes.string.isRequired
};

export default Menu;
