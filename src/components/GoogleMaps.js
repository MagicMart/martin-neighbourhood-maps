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
                console.log(marker);
                fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${props.name}&limit=3`)
                .then(function(resp) {
                return resp.json()})
                .then((array) => this.setState({wikipedia:array}) )
                .catch((error) => console.log('this error', error))
            
              this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true,
                zoom: 13,
                initialCenter: props.position,
                center: props.position
              })
              setTimeout(() => {document.querySelector('.marker-info').focus()}, 750)

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
                        <p>{ this.state.wikipedia[2] }</p>
                        <p>Source: 
                        <a href={ this.state.wikipedia[3] }>{this.state.wikipedia[3]}</a>
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
