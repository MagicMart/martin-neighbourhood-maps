import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

       export class MapContainer extends Component {
            state = {
              showingInfoWindow: false,
              activeMarker: {},
              selectedPlace: {},
              initialCenter: {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`},
              zoom: 12,
              center: {}
            };
          
            onMarkerClick = (props, marker, e) =>{
            console.log("onClick",props.position)
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
              this.setState({ zoom: 12,
                center: {lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`}})
            };

            render() {
             // Remove infowindow when sidebar is clicked
            const menu = document.querySelector('#menu');
            menu.addEventListener('click', this.onMapClicked);
             
              console.log("initialCenter",this.state.initialCenter)
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

                      <Marker 
 
                      visible={this.props.places[0].visible}
                      onClick={this.onMarkerClick}
                      name={this.props.places[0].title}
                      position= {{lat: `${this.props.places[0].location.lat}`,lng: `${this.props.places[0].location.lng}`}} />
                      <Marker
                        visible={this.props.places[1].visible}
                        onClick={this.onMarkerClick}
                        name={this.props.places[1].title}
                        position={{lat: `${this.props.places[1].location.lat}`,lng: `${this.props.places[1].location.lng}`}} />
                      <Marker
                         visible={this.props.places[2].visible}
                        onClick={this.onMarkerClick}
                        name={this.props.places[2].title}
                        position={{lat: `${this.props.places[2].location.lat}`,lng: `${this.props.places[2].location.lng}`}} />
                    <Marker
                        
                          visible={this.props.places[3].visible}
                          onClick={this.onMarkerClick}
                          name={this.props.places[3].title}
                          position={{lat: `${this.props.places[3].location.lat}`,lng: `${this.props.places[3].location.lng}`}} />
                    <Marker
                     visible={this.props.places[4].visible}
                          onClick={this.onMarkerClick}
                          name={this.props.places[4].title}
                          position={{lat: `${this.props.places[4].location.lat}`,lng: `${this.props.places[4].location.lng}`}} />  
                      
                      
                  <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                      <div>
                        <h1 className='marker'>{this.state.selectedPlace.name}</h1>
                        <p className='marker'>A Museum</p>
                      </div>
                  </InfoWindow>
                </Map>
              )
            }
          }


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ')
})(MapContainer)