import React, { Component } from 'react'
import Welcome from './Welcome';

export default class LifeCycleMethods extends Component {
    constructor(){
        super();
        console.log("constructor");

        //initialize state
        this.state={
            count : 0,
            login : true,
        }
    }
    componentDidMount(){
        console.log("componentDidMount");
        
    }
    increment = () =>{
        console.log("Updated Phase Started Here");
        
        this.setState({
            count: this.state.count + 1
        })
        
    }

    componentDidUpdate(){
        console.log("componentDidUpdate");
        
    }

    logout = () =>{
        this.setState({
            login : false,
        })
    }


  render() {
    console.log("render")
    let msg="";
    if (this.state.login){
        msg = <Welcome/>
    }
    else{
        msg = "Please Login Again"
    }
    return (
      <div className='container p-5'>
        <h2>{msg}</h2>
        <button onClick={this.logout}>Logout</button>
        <h2>Counter : {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}
