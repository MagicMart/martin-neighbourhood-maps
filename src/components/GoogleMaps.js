import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: { lat: 0, lng: 0 },
    selectedPlace: {},
    initialCenter: {
      lat: this.props.places[0].position.lat,
      lng: this.props.places[0].position.lng
    },
    zoom: 12,
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
    this.state.zoom !== 12 && this.onMapClicked();
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

  showTheMarker = choice => {
    const update = this.props.places.map(marker => {
      if (choice === marker.name) {
        marker.visible = true;
        return marker;
      }
      marker.visible = false;
      return marker;
    });

    this.setState({ locations: update });
  };

  showAllMarkers = () => {
    const update = this.props.places.map(marker => {
      marker.visible = true;

      return marker;
    });
    this.setState({ locations: update });
  };

  onMarkerClick = (props, marker, e) => {
    this.showTheMarker(props.name);

    this.fetchWikipedia(props.name);
    this.setState({
      animateMarker: true,
      selectedPlace: props,
      activeMarker: props.position,
      showingInfoWindow: true,
      zoom: 13,
      initialCenter: props.position,
      center: props.position
    });
  };

  onMapClicked = props => {
    this.showAllMarkers();
    if (this.state.showingInfoWindow) {
      this.setState({
        animateMarker: false,
        showingInfoWindow: false,
        activeMarker: null
      });
    }
    if (
      this.state.zoom !== 12 &&
      this.state.center !==
        {
          lat: `${this.props.places[0].position.lat}`,
          lng: `${this.props.places[0].position.lng}`
        }
    )
      this.setState({
        zoom: 12,
        center: {
          lat: `${this.props.places[0].position.lat}`,
          lng: `${this.props.places[0].position.lng}`
        }
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
          visible={place.visible}
          onClick={this.onMarkerClick}
          name={place.name}
          key={place.name}
          animation={
            this.state.animateMarker && this.props.google.maps.Animation.DROP
          }
          position={{ lat: place.position.lat, lng: place.position.lng }}
          icon={{
            // url: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
            //  anchor: new google.maps.Point(32,16),
            //  scaledSize: new google.maps.Size(64,64)
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            strokeColor: "red",
            strokeOpacity: 0.6
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
        initialCenter={this.state.initialCenter}
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ"
})(MapContainer);
