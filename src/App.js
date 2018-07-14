import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps.js'
import Menu from './components/Menu'
import SearchResults from './components/SearchResults'
import './App.css';

class App extends Component {

  state = {
    query: '',
    locations: [
      {title: 'Potteries Museum & Art Gallery', location: {lat: 53.0229395, lng: -2.1803406}, visible: true},
      {title: 'Gladstone Pottery Museum', location: {lat: 52.9868222, lng: -2.1336447}, visible: true},
      {title: 'Middleport Pottery', location: {lat: 53.0412292, lng: -2.2119407}, visible: true},
      {title: 'Etruria Industrial Museum', location: {lat: 53.0191846, lng: -2.1942034}, visible: true},
      {title: 'Spode Museum', location: {lat: 53.0062435, lng: -2.1861088}, visible: true}
    ]
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
    this.setState({locations: update});
    return;
    }
    const update = this.state.locations.map((marker) => {
      console.log(marker.title)
      if (choice === marker.title ) {marker.visible = true; return marker}
        marker.visible = false;
        return marker
    })
    this.setState({locations: update});
    console.log(update)
  }

  render() {
    return (
      <div className='container'>
         <div className='sidebar'>
        <h1>Potteries Museums</h1>
        <Menu 
        query={this.state.query}
        filter={this.filterPlaces}
        update={this.updateMap}
        />
        <SearchResults id='search-results'
        places={this.state.locations}
       
        />
        
        </div>
        <GoogleMaps id='map'
         places={this.state.locations}
        />
      </div>
    );
  }
}

export default App;
