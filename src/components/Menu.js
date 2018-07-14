import React, { Component } from 'react';

class Menu extends Component {
    
    render() { 
        
        return (
           
       <div>
         <select id="menu" onChange={this.props.update}>
           <option value="all">All Museums</option>
           <option value="Potteries Museum & Art Gallery">Potteries Museum & Art Gallery</option>
           <option value="Gladstone Pottery Museum">Gladstone Pottery Museum</option>
           <option value="Middleport Pottery">Middleport Pottery</option>
           <option value="Etruria Industrial Museum">Etruria Industrial Museum</option>
           <option value="Spode Museum"></option>
        </select>
       </div>
        )
    }
}
export default Menu;