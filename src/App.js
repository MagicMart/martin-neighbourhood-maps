import React, { Component } from "react";
import GoogleMaps from "./components/GoogleMaps.js";
import Menu from "./components/Menu";
import Hamburger from "./components/Hamburger";
import "./App.css";

class App extends Component {
  state = {
    locations: [
      {
        name: "Potteries Museum & Art Gallery",
        position: { lat: 53.0229395, lng: -2.1803406 },
        visible: true,
        animate: false
      },
      {
        name: "Gladstone Pottery Museum",
        position: { lat: 52.9868222, lng: -2.1336447 },
        visible: true,
        animate: false
      },
      {
        name: "Middleport Pottery",
        position: { lat: 53.0412292, lng: -2.2119407 },
        visible: true,
        animate: false
      },
      {
        name: "Etruria Industrial Museum",
        position: { lat: 53.0191846, lng: -2.1942034 },
        visible: true,
        animate: false
      },
      {
        name: "Spode Museum",
        position: { lat: 53.0062435, lng: -2.1861088 },
        visible: true,
        animate: false
      },
      {
        name: "World of Wedgwood",
        position: { lat: 52.9519207, lng: -2.1707704 },
        visible: true,
        animate: false
      }
    ],
    deviceWidth: 0,
    choice: "all"
  };

  componentDidMount() {
    const deviceWidth = window.screen.width;
    this.setState({ deviceWidth });
    window.gm_authFailure = function() {
      alert("There was a problem loading Google Maps.");
    };
  }

  // Call when the menu has changed
  updateMap = choice => {
    // Slide away sidebar when choice made
    this.setState({ choice });
    if (this.state.deviceWidth <= 500) {
      this.hamburgerClick();
    }
    console.log("Inside app", choice);
    // this.state.choice !== choice && this.setState({choice})
  };

  hamburgerClick = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar-in");
  };

  render() {
    const { locations } = this.state;
    return (
      <React.Fragment>
        <Hamburger hamburgerClick={this.hamburgerClick} />
        <div className="sidebar">
          <h1>Potteries Museums</h1>
          <Menu update={this.updateMap} locations={locations} />
        </div>
        <div id="map" role="application" aria-label="Google Maps">
          <GoogleMaps places={locations} menu={locations.choice} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
