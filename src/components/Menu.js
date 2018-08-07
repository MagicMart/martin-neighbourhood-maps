import React, { Component } from 'react';

class Menu extends Component {

    state = {
        choice: "all"
    }

    choiceMade = (e) => {
        const choice = e.target.value;
        this.setState({choice});
    }

    componentDidUpdate() {
        this.props.update(this.state.choice);
    }
    
    render() { 
        const options = this.props.locations.map((loc) => {
            return (
                <option value={loc.name} key={loc.name}>{loc.name}</option>
            )
        })

        return (
           
       <div className="menu-container">
         <select id="menu" onChange={(e) => this.choiceMade(e)} tabIndex="0">
           <option value="all">All Museums</option>
           {options}
           {/* <option value="Potteries Museum & Art Gallery">Potteries & Art</option>
           <option value="Gladstone Pottery Museum">Gladstone Pottery</option>
           <option value="Middleport Pottery">Middleport Pottery</option>
           <option value="Etruria Industrial Museum">Etruria Industrial</option>
           <option value="Spode Museum">Spode</option> */}
        </select>
       </div>
        )
    }
}
export default Menu;