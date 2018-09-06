import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import PropTypes from "prop-types";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: {},
    // initialCenter: {
    //   lat: this.props.places[0].position.lat,
    //   lng: this.props.places[0].position.lng
    // },
    zoom: 11,
    center: {},
    wikipedia: [],
    sentence: "",
    animateMarker: false
    //locations: []
  };

  componentDidMount() {
    // const menu = document.querySelector("#menu");

    // menu.addEventListener("change", () => {
    //   const menu = document.querySelector("#menu").value;
    // });

    // Close infowindow with esc key
    window.addEventListener("keyup", e => {
      if (e.keyCode === 27) {
        this.onMapClicked();
      }
    });
    //this.setState({ locations: this.props.places });
  }

  componentDidUpdate(prevProps) {
    const { choice } = this.props;
    if (choice === prevProps.choice) {
      return;
    }
    console.log("ComponentDidUpdate: ", choice);
    if (choice === "all") {
      this.onMapClicked();
      return;
    }
    this.state.activeMarker && this.onMapClicked();
    setTimeout(() => {
      const selected = this.props.places.filter(loc => loc.name === choice);
      this.onMarkerClick(selected[0]);
    }, 1000);
  }

  fetchWikipedia = choice => {
    fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${choice}&limit=3`
    )
      .then(function(resp) {
        if (!resp.ok) {
          return Promise.reject({
            status: resp.status,
            statusText: resp.statusTest
          });
        }
        return resp.json();
      })
      .then(array => {
        //Reduce Info text to first sentence
        if (array[1].length === 0) {
          return Promise.reject("Couldn't find a page for this on Wikipedia");
        }
        const sentence = array[2][0].slice(0, array[2][0].indexOf(".") + 1);
        this.setState({ wikipedia: array, sentence: sentence });
      })
      .catch(error => {
        let wikipedia = [];
        wikipedia[1] = "Sorry... ";
        wikipedia[2] = error;
        wikipedia[3] = "";
        this.setState({ wikipedia: wikipedia, sentence: error });
      });
  };

  // Make only chosen marker visiible

  // showTheMarker = choice => {
  //   const places = this.props.places.map(place => Object.assign({}, place));
  //   places
  //     .filter(marker => choice !== marker.name)
  //     .map(marker => (marker.visible = false));
  // };

  // showAllMarkers = () => {
  //   this.props.places.map(marker => (marker.visible = true));
  // };

  onMarkerClick = (props, marker, e) => {
    console.log("Before", props);
    const { name, position } = props;
    // this.showTheMarker(name);

    this.fetchWikipedia(name);
    this.setState({
      animateMarker: true,
      selectedPlace: props,
      activeMarker: position,
      showingInfoWindow: true,
      zoom: 13,
      initialCenter: position,
      center: position
    });
  };

  onMapClicked = props => {
    // this.showAllMarkers();
    if (this.state.showingInfoWindow) {
      this.setState({
        animateMarker: false,
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    if (
      this.state.zoom !== 11 &&
      this.state.center !==
        {
          lat: `${this.props.places[0].position.lat}`,
          lng: `${this.props.places[0].position.lng}`
        }
    )
      this.setState(() => {
        return {
          zoom: 11,
          center: {
            lat: `${this.props.places[0].position.lat}`,
            lng: `${this.props.places[0].position.lng}`
          }
        };
      });
  };

  infoWindowOpen = () => {
    const markerInfo = document.querySelector(".marker-info");
    markerInfo && markerInfo.focus();
  };

  render() {
    const { google } = this.props;
    const markers = this.props.places.map(place => {
      return (
        <Marker
          visible={
            !this.state.activeMarker ||
            place.name === this.state.selectedPlace.name
          }
          onClick={this.onMarkerClick}
          name={place.name}
          key={place.name}
          animation={
            this.state.animateMarker && this.props.google.maps.Animation.DROP
          }
          position={{ lat: place.position.lat, lng: place.position.lng }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            anchor: new google.maps.Point(24, 24),
            scaledSize: new google.maps.Size(48, 48)
            // path: google.maps.SymbolPath.CIRCLE,
            // scale: 10,
            // strokeColor: "red",
            // strokeOpacity: 0.6
            // fillColor: "rgb(26,13,171)",
            // fillOpacity: 0.6,
          }}
        />
      );
    });

    return (
      <Map
        // style={{width: '100%', height: '100%', position: 'absolute'}}
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={{
          lat: this.props.places[0].position.lat,
          lng: this.props.places[0].position.lng
        }}
        center={this.state.center}
        zoom={this.state.zoom}
      >
        {markers}
        <InfoWindow
          position={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onOpen={this.infoWindowOpen}
        >
          <div>
            <a
              href={this.state.wikipedia[3]}
              style={{
                display: "block",
                textDecoration: "none",
                color: "black"
              }}
              className="marker-info"
              tabIndex="0"
            >
              <h2>{this.state.selectedPlace.name}</h2>
              <p>{this.state.sentence}</p>
            </a>
            {this.state.wikipedia[1] !== "Sorry... " && (
              <span>
                Source: <a href={this.state.wikipedia[3]}>Wikipedia</a>{" "}
              </span>
            )}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

MapContainer.propTypes = {
  places: PropTypes.array.isRequired,
  choice: PropTypes.string.isRequired
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ"
})(MapContainer);
