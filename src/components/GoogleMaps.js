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
              return (
                <Map 
                    //style={{width: '100%', height: '100%', position: 'relative'}}
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 53.0229395,
                        lng: -2.1803406
                      }}
                    zoom={12}
                    >
                  
                   <Marker
                        onClick={this.onMarkerClick}
                        name={'Potteries Museum & Art Gallery'}
                        position={{lat: 53.0229395, lng: -2.1803406}} />
                   <Marker
                        onClick={this.onMarkerClick}
                        name={'Gladstone Pottery Museum'}
                        position={{lat: 52.9868222, lng: -2.1336447}} />
                   <Marker
                        onClick={this.onMarkerClick}
                        name={'Middleport Pottery'}
                        position={{lat: 53.0412292, lng: -2.2119407}} />
                    <Marker
                          onClick={this.onMarkerClick}
                          name={'Etruria Industrial Museum'}
                          position={{lat: 53.0191846, lng: -2.1942034}} />
                    <Marker
                          onClick={this.onMarkerClick}
                          name={'Spode Museum'}
                          position={{lat: 53.0062435, lng: -2.1861088}} />          
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