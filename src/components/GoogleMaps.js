import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

       export class MapContainer extends Component {
            state = {
              showingInfoWindow: false,
              activeMarker: {lat: 0, lng :0},
              infoPosition: {lat: 0, lng: 0},
              selectedPlace: {},
              initialCenter: {lat: `${this.props.places[0].position.lat}`,lng: `${this.props.places[0].position.lng}`},
              zoom: 12,
              center: {},
              wikipedia: [],
              sentence: "",
              animateMarker: false,
              locations: []
            };

            componentDidMount() {
                  // Remove infowindow when menu choice made
              const menu = document.querySelector('#menu');
              // const menuContainer = document.querySelector('.menu-container');
              // console.log(menuContainer)
              // menuContainer.addEventListener('click', () => {
              //   //if(this.state.zoom === 12) {return} else {this.onMapClicked()}
              //   this.onMapClicked();
              // });
              menu.addEventListener('change', () => {
                const menu=document.querySelector('#menu').value;
                if(menu === "all") {this.onMapClicked(); return}
                this.onMapClicked()
                setTimeout(() => { 
                  const imgs = document.querySelectorAll('.gmnoprint > img');
                  console.log(imgs);
                  const selected = this.state.locations.filter((loc) => loc.name === menu )
                  let i = [];
                  this.state.locations.forEach((loc, index) => {if(loc.name === menu) {i.push(index)}});
                  console.log("index", i)
                  console.log("SEL",selected[0])
                  imgs[i[0]].click();
                 //this.onMarkerClick(selected[0])
                }, 1000)
               
                
              })

              // Close infowindow with esc key
              window.addEventListener("keyup", (e) =>{
                if (e.keyCode === 27){this.onMapClicked()}
              } )
              this.setState({locations: this.props.places})
              console.log(this.props.google.maps)
              // this.props.google.maps.event.addListener("click",() => {
              //   console.log("Zoom changed")
              // })
    
            }

            fetchWikipedia =(choice) => {
              fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${choice}&limit=3`)
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
            }

            // Make only chosen marker visiible

            showTheMarker = (choice) => {
              const update = this.state.locations.map((marker) => {
                if (choice === marker.name ) {
                  marker.visible = true; 
                 // marker.animate =true;
                  return marker;
                }
                  marker.visible = false;
                  return marker
              })
              
              this.setState({locations: update});
            }

            showAllMarkers = () => {
              const update = this.state.locations.map((marker) => {
               
                  marker.visible = true; 
                
                  return marker;
                
              })
              this.setState({locations: update});
            }
          
            onMarkerClick = (props, marker, e) =>{
                // this.setState({animateMarker: true})
               // console.log("Marker Clicked:", marker, "props POSITION: ", props.position, "e:", e);
                this.showTheMarker(props.name)
              
            //  const infoPosition = {lat: (props.position.lat) + 0.003, lng: props.position.lng}
              this.fetchWikipedia(props.name);
              this.setState({
                animateMarker: true,
                selectedPlace: props,
                activeMarker: marker,
               // infoPosition: infoPosition,
                showingInfoWindow: true,
                zoom: 13,
                initialCenter: props.position,
                center: props.position
              })

              // Focus info window
              setTimeout(() => {
                if(document.querySelector('.marker-info'))
                document.querySelector('.marker-info').focus()}, 1000)

            ;}
          
            onMapClicked = (props) => {
              // this.setState({animateMarker: false})
             // document.querySelector('#menu').value==="all" && this.showAllMarkers();
              this.showAllMarkers();
              if (this.state.showingInfoWindow) {
                this.setState({
                  animateMarker: false,
                  showingInfoWindow: false,
                  activeMarker: null               
                })            
              }
              if(this.state.zoom !==12 && this.state.center !== {lat: `${this.props.places[0].position.lat}`,lng: `${this.props.places[0].position.lng}`})
              this.setState({ zoom: 12,
                center: {lat: `${this.props.places[0].position.lat}`,lng: `${this.props.places[0].position.lng}`}})
            };

            render() {
          
  const markers = this.state.locations.map((place) => {
      
      return (
        <Marker 
        visible={place.visible}
        onClick={this.onMarkerClick}
        name={place.name}
        key={place.name}
        animation={this.state.animateMarker && this.props.google.maps.Animation.DROP}
        position= {{lat: place.position.lat, lng: place.position.lng}} />
      )
  })

              return (
                 <Map 
                    // style={{width: '100%', height: '100%', position: 'absolute'}}
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
