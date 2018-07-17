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
              wikipedia: []
            };
          
            onMarkerClick = (props, marker, e) =>{
            
                fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${props.name}&limit=3`)
                .then(function(resp) {
                return resp.json()
        
                 // this.setState({wikipedia:resp.json()})
               }).then((array) => this.setState({wikipedia:array}) )
              .catch((error) => console.log('this error', error))
            
              this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                zoom: 14,
                initialCenter: props.position,
                center: props.position
              });}
          
            onMapClicked = (props) => {
              if (this.state.showingInfoWindow) {
                this.setState({
                  showingInfoWindow: false,
                  activeMarker: null,
                 
                })
                
              }
              this.setState({ zoom: 11,
                center: {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`}})
            };

            render() {
             // Remove infowindow when sidebar is clicked
            const menu = document.querySelector('#menu');
            menu.addEventListener('click', this.onMapClicked);
             
  const markers = this.props.places.map((place) => {
      return (
        <Marker 
        
        visible={place.visible}
        onClick={this.onMarkerClick}
        name={place.title}
        key={place.title}
        animation={this.props.google.maps.Animation.DROP}
        position= {{lat: `${place.location.lat}`,lng: `${place.location.lng}`}} />)
  })
              return (
                <Map 
                    style={{width: '100%', height: '100%'}}
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
                    visible={this.state.showingInfoWindow}>
                      <div className="marker">
                        <h1>{this.state.selectedPlace.name}</h1>
                        <p>{ this.state.wikipedia[2] }</p>
                        <div>
                        <a href={ this.state.wikipedia[3] }>wikipedia</a>
                        </div>
                      </div>
                  </InfoWindow>
                </Map>
              )
            }
          }


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ')
})(MapContainer)