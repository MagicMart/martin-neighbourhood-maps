import React, { Component } from 'react';

class SearchBox extends Component {
    
    render() { 
        
        return (
        <div>
            <input id="filter" type="text" value={this.props.query} 
                onChange={() => this.props.filter(document.getElementById('filter').value)} />
        </div>)
   
    }
}
export default SearchBox;