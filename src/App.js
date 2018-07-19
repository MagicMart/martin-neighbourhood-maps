import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps.js'
import Menu from './components/Menu'
import SidebarInfo from './components/SidebarInfo'
import './App.css';

class App extends Component {

  state = {
    locations: [
      {title: 'Potteries Museum & Art Gallery', location: {lat: 53.0229395, lng: -2.1803406}, visible: true},
      {title: 'Gladstone Pottery Museum', location: {lat: 52.9868222, lng: -2.1336447}, visible: true},
      {title: 'Middleport Pottery', location: {lat: 53.0412292, lng: -2.2119407}, visible: true},
      {title: 'Etruria Industrial Museum', location: {lat: 53.0191846, lng: -2.1942034}, visible: true},
      {title: 'Spode Museum', location: {lat: 53.0062435, lng: -2.1861088}, visible: true}
    ],
    sidebarInfo: false,
    wikipedia: [],
    deviceWidth: 0
  }

  componentDidMount() {
    const deviceWidth = window.screen.width;
    this.setState({deviceWidth});
  }
  
  updateMap =() => {
    
    const choice = document.getElementById('menu').value;
    console.log(choice);
    if (choice === "all") {
      const update=this.state.locations.map((marker) => {
        marker.visible = true;
        console.log(marker.visible)
        return marker;
      })
    this.setState({locations: update, sidebarInfo: false});
    return;
    }
    const update = this.state.locations.map((marker) => {
      console.log(marker.title)
      if (choice === marker.title ) {marker.visible = true; return marker}
        marker.visible = false;
        return marker
    })
    this.setState({locations: update});

    fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${choice}&limit=3`)
    .then(function(resp) {
    return resp.json()})
    .then((array) => this.setState({wikipedia:array}) )
    .catch((error) => console.log('this error', error))
    this.setState({sidebarInfo: true})
  }

  hamburgerClick = () => {
    const sidebar = document.querySelector('.sidebar');
   sidebar.classList.toggle('sidebar-in');

  } 

  render() {

  let hamburger = null;
  
  hamburger  = 
   <div id="hamburger-bar" onClick={this.hamburgerClick}>
      <div className="hamburger"></div>
      <div className="hamburger"></div>
      <div className="hamburger"></div>
   </div>;
    

    return (
      <div className='container'>
         {hamburger}
         <div className='sidebar'>
                  
            <h1>Potteries Museums</h1>
            <Menu
            query={this.state.query}
            filter={this.filterPlaces}
            update={this.updateMap}
            
            />
            <SidebarInfo id='sidebar-info'
            sidebarInfo={this.state.sidebarInfo}
            wikipedia={this.state.wikipedia}
           
            /> 
        </div>
        <div id="map">
            <GoogleMaps 
            places={this.state.locations}
            />
        </div>
        
      </div>
    );
  }
}

export default App;
