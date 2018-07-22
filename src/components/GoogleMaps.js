import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

       export class MapContainer extends Component {
            state = {
              showingInfoWindow: false,
              activeMarker: {},
              selectedPlace: {},
              initialCenter: {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`},
              zoom: 12,
              center: {},
              wikipedia: [],
              sentence: ""
            };

          
            onMarkerClick = (props, marker, e) =>{
                console.log(marker);
                fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${props.name}&limit=3`)
                .then(function(resp) {
                return resp.json()})
                .then((array) => {
                    //Reduce Info text to first sentence
                const text = array[2][0];
                const point = text.indexOf('.')
                const sentence =  text.slice(0, point + 1);
                  this.setState({wikipedia:array, sentence: sentence})
                } )
                .catch((error) => {
                  let wikipedia = [];
                  wikipedia[1] = "Something went wrong... ";
                  wikipedia[2] = "can't find the page.";
                  wikipedia[3] = "is not available";
                  this.setState({wikipedia: wikipedia, sidebarInfo: true})})
            
              this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                zoom: 13,
                initialCenter: props.position,
                center: props.position
              })

              // Focus info window
              setTimeout(() => {document.querySelector('.marker-info').focus()}, 1000)

            ;}
          
            onMapClicked = (props) => {
              if (this.state.showingInfoWindow) {
                this.setState({
                  showingInfoWindow: false,
                  activeMarker: null               
                })            
              }
              if(this.state.zoom !==12 && this.state.center !== {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`})
              this.setState({ zoom: 12,
                center: {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`}})
            };

            render() {
             // Remove infowindow when menu choice made
            const menu = document.querySelector('#menu');
            menu.addEventListener('click', this.onMapClicked);

            // Close infowindow with esc key
            window.addEventListener("keyup", (e) =>{
              if (e.keyCode === 27){this.onMapClicked()}
            } )

  const markers = this.props.places.map((place) => {
      
      return (
        <Marker 
        visible={place.visible}
        onClick={this.onMarkerClick}
        name={place.title}
        key={place.title}
        animation={this.props.google.maps.Animation.DROP}
        position= {{lat: `${place.location.lat}`,lng: `${place.location.lng}`}} />
      )
  })

              return (
                 <Map 
                    style={{width: '100%', height: '100%', position: 'relative'}}
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    initialCenter={
                      this.state.initialCenter
                      }
                    center={this.state.center}
                    zoom={this.state.zoom}
                    > 
                  {markers}
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    >
                      <div className="marker-info" tabIndex="0">
                        <h2>{this.state.selectedPlace.name}</h2>
                        <p>{ this.state.sentence }</p>
                        <p>Source: 
                        <a href={ this.state.wikipedia[3] }>Wikipedia</a>
                        </p>
                      </div>
                    
                  </InfoWindow>
                  
                </Map>
              )
            }
          }


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ')
})(MapContainer)
