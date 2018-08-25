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
        position: { lat: 53.0412825, lng: -2.2096095 },
        visible: true,
        animate: false
      },
      {
        name: "Etruria Industrial Museum",
        position: { lat: 53.0191733, lng: -2.1921499 },
        visible: true,
        animate: false
      },
      {
        name: "Chatterley Whitfield",
        position: { lat: 53.0764, lng: -2.1752 }
        // visible: true,
        // animate: false
      }
    ],
    choice: "all",
    sidebar: "sidebar"
  };

  componentDidMount() {
    // const deviceWidth = window.screen.width;
    // this.setState({ deviceWidth });
    window.gm_authFailure = function() {
      alert("There was a problem loading Google Maps.");
    };
  }

  // Call when the menu has changed
  updateMap = choice => {
    // Slide away sidebar when choice made
    this.setState({ choice });
    if (window.screen.width <= 500) {
      this.hamburgerClick();
    }
  };

  hamburgerClick = () => {
    this.setState(prevState => ({
      sidebar: prevState.sidebar === "sidebar" ? "sidebar-in" : "sidebar"
    }));
  };

  render() {
    const { locations } = this.state;
    return (
      <div className="container">
        <Hamburger hamburgerClick={this.hamburgerClick} />
        <div className={this.state.sidebar}>
          <h1>Potteries Places</h1>
          <Menu
            update={this.updateMap}
            locations={locations}
            choice={this.state.choice}
          />
        </div>
        <div id="map" role="application" aria-label="Google Maps">
          <GoogleMaps
            places={locations}
            //menu={locations.choice}
            choice={this.state.choice}
          />
        </div>
      </div>
    );
  }
}

export default App;
