import React, { Component } from 'react';

class Menu extends Component {
    
    render() { 
        
        return (
           
       <div className="menu-container">
         <select id="menu" /*onChange={this.props.update}*/ tabIndex="0">
           <option value="all">All Museums</option>
           <option value="Potteries Museum & Art Gallery">Potteries & Art</option>
           <option value="Gladstone Pottery Museum">Gladstone Pottery</option>
           <option value="Middleport Pottery">Middleport Pottery</option>
           <option value="Etruria Industrial Museum">Etruria Industrial</option>
           <option value="Spode Museum">Spode</option>
        </select>
       </div>
        )
    }
}
export default Menu;