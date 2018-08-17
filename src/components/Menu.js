import React, { Component } from "react";

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
          <option value="all">All Museums</option>
          {options}
        </select>
      </div>
    );
  }
}
export default Menu;
