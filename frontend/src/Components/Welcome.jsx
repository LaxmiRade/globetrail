import React, { Component } from 'react'

export default class Welcome extends Component {
    componentWillUnmount(){
        alert("You are Logged Out")
    }
  render() {
    return (
      <div>
        <h2>Welcome to Admin Dashboard</h2>
      </div>
    )
  }
}
