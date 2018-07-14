import React, { Component } from 'react';

class SearchResults extends Component {

  render() {
      const Museums = this.props.places.map((place) => {
        return (<div>${place.name}</div>)
      })
      return (<div>
          <div>SearchResults</div>
          <div render={Museums}></div>
          </div>
        
      )
  }

}

export default SearchResults