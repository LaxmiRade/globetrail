import React, { Component } from 'react'

export default class StateExample extends Component {
    constructor(){
        super();

        //Initialise state
        this.state={
            count: 0
        } 
    }
    add = () =>{
        this.setState({
            count : this.state.count +1
        })
    }

  render() {
    return (
      <div className='container p-5'> 
      <h2>Counter :{this.state.count}</h2>
      <button onClick={this.add}>Add</button>
      </div>
    )
  }
}
