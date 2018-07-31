import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps.js'
import Menu from './components/Menu'
import Hamburger from './components/Hamburger'
import './App.css';

class App extends Component {

  state = {
    locations: [
      {name: 'Potteries Museum & Art Gallery', position: {lat: 53.0229395, lng: -2.1803406}, visible: true, animate: false},
      {name: 'Gladstone Pottery Museum', position: {lat: 52.9868222, lng: -2.1336447}, visible: true, animate: false},
      {name: 'Middleport Pottery', position: {lat: 53.0412292, lng: -2.2119407}, visible: true, animate: false},
      {name: 'Etruria Industrial Museum', position: {lat: 53.0191846, lng: -2.1942034}, visible: true, animate: false},
      {name: 'Spode Museum', position: {lat: 53.0062435, lng: -2.1861088}, visible: true, animate: false}
    ],
    sidebarInfo: false,
    wikipedia: [],
    deviceWidth: 0
  }

  componentDidMount() {
    const deviceWidth = window.screen.width;
    this.setState({deviceWidth});
  }

  fetchWikipedia =(choice) => {
    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${choice}&limit=3`)
    .then(function(resp) {
    return resp.json()})
    .then((array) => {this.setState({wikipedia:array, sidebarInfo: true});} )
    .catch((error) => {
    let wikipedia = [];
    wikipedia[1] = "Something went wrong... ";
    wikipedia[2] = "can't find the page.";
    wikipedia[3] = "is not available";
    this.setState({wikipedia: wikipedia, sidebarInfo: true})})
  }

  clickTheMarker = () => {
    // setTimeout(() => {document.querySelector('.gmnoprint > img').click();}, 2000 )
    setTimeout(() => {
      const img =document.querySelectorAll("img[src$='spotlight-poi2_hdpi.png']");
      img[1] && img[1].click();}, 2000 )
  }
  
  // Call when the menu has changed
  updateMap =() => {

    // Slide away sidebar when choice made
    if(this.state.deviceWidth <= 500) {
      this.hamburgerClick();
    }
    // Display all markers?
    // const choice = document.getElementById('menu').value;
    // if (choice === "all") {
    //   const update=this.state.locations.map((marker) => {
    //     marker.visible = true;
    //     return marker;
    //   })
    // this.setState({locations: update, sidebarInfo: false});
    // return;
    // }
    // this.fetchWikipedia(choice);
    // // Marker selected from the list
    // const update = this.state.locations.map((marker) => {
    //   if (choice === marker.name ) {
    //     marker.visible = true; 
    //    // marker.animate =true;
    //     return marker;
    //   }
    //     marker.visible = false;
    //     return marker
    // })
    
    // this.setState({locations: update});
   
    // this.clickTheMarker();
   
  }

  hamburgerClick = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('sidebar-in');
  } 

  render() {

    return (
    
      <div>
         <Hamburger 
         hamburgerClick={this.hamburgerClick}
         />
         <div className='sidebar'> 
            <h1>Potteries Museums</h1>
            <Menu
            query={this.state.query}
            filter={this.filterPlaces}
            update={this.updateMap}          
            />
        </div>
        <div id="map" role="application" aria-label="Google Maps">
            <GoogleMaps 
            places={this.state.locations}
            />
        </div>
        
      </div>
      
    );
  }
}

export default App;
