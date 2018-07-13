import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps.js'
import SearchBox from './components/Sidebar'
import SearchResults from './components/SearchResults'
import './App.css';

class App extends Component {

  state = {
    query: ''
  }

  filterPlaces = (val) => {
    this.setState({query: val})
  
  }

  render() {
    return (
      <div className='container'>
         <div className='sidebar'>
        <h1>Potteries Museums</h1>
        <SearchBox 
        query={this.state.query}
        filter={this.filterPlaces}
        />
        <SearchResults id='search-results'/>
        </div>
        <GoogleMaps id='map'/>
      </div>
    );
  }
}

export default App;
