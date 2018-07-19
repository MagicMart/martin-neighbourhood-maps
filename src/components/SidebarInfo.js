import React, { Component } from 'react';

class SidebarInfo extends Component {

  render() {


     if (this.props.sidebarInfo) {
      return (
        <div id="sidebar-info" tabIndex="0">
          <h2>{this.props.wikipedia[1]}</h2>
          <p>{ this.props.wikipedia[2] }</p>
          <p>Source: 
          <a href={ this.props.wikipedia[3] }>wikipedia</a>
          </p>
        </div>    
        )  
    } else {return null}

  }

}

export default SidebarInfo