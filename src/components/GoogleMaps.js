import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

       export class MapContainer extends Component {
            state = {
              showingInfoWindow: false,
              activeMarker: {},
              selectedPlace: {},
            };
          
            onMarkerClick = (props, marker, e) =>
              this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
              });
          
            onMapClicked = (props) => {
              if (this.state.showingInfoWindow) {
                this.setState({
                  showingInfoWindow: false,
                  activeMarker: null
                })
              }
            };

            render() {
             
              console.log("loc",this.props.places[0].location)
              return (
                <Map id='my-map'
                    //style={{width: '100%', height: '100%', position: 'relative'}}
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 53.0241658,
                        lng: -2.1915053
                      }}
                    zoom={13}
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
                        <h1>{this.state.selectedPlace.name}</h1>
                      </div>
                  </InfoWindow>
                </Map>
              )
            }
          }


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDBE2r_7RpfEqvgqfHt-qTWMpZ94i3huGQ')
})(MapContainer)