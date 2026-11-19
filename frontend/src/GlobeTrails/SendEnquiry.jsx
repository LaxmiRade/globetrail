import React, { Component } from 'react'
import Destinations from './Destinations';
import axios from 'axios';
import { API } from './api';

export default class SendEnquiry extends Component {
    constructor(){
        super();
        // Initialise state
        this.state ={
            name : "",
            email : "",
            destination: "",
            mobile : "",
            message : "",
        }
    }
    changeData = (e) =>{
      console.log(e.target.name,e.target.value);

      const {name , value}=e.target

      this.setState({
        [name] : value
      })
    }

    submitHandler = (e) =>{
      e.preventDefault();
      
      const nameError= document.querySelector('#nameError')
      const emailError= document.querySelector('#emailError')
      const destinationError= document.querySelector('#destinationError')
      const mobileError= document.querySelector('#mobileError')
      const messageError= document.querySelector('#messageError')

      const {name, email, destination, mobile, message} = this.state

      //Name Validation
      if(name===""){
        nameError.textContent=`Name is mandatory`;
      }
      else{
        nameError.textContent=``
      }
 
          //Email Validation
      if(email===""){
        emailError.textContent=`Email Address is mandatory`;
      }
      else{
        emailError.textContent=``
      }

       //Mobile Validation
      if(mobile===""){
        mobileError.textContent=`Mobile Number is mandatory`;
      }
      else{
        mobileError.textContent=``
      }

       //Destination Validation
      if(destination===""){
        destinationError.textContent=`Destination is mandatory`;
      }
      else{
        destinationError.textContent=``
      }

      //Message Validation
      if(message===""){
        messageError.textContent=`message is mandatory`;
      }
      else{
        messageError.textContent=``
      }

      // All fields filled -> send the enquiry to the backend
      if(name && email && destination && mobile && message){
        axios.post(`${API}/enquires/`, {name, email, destination, mobile, message})
        .then(() => alert(`Enquiry sent successfully. We will contact you soon.`))
        .catch(err => {
          console.log(err)
          alert(`Could not send enquiry. Please check your details and try again.`)
        })
      }
      
    } 

  render() {
    return (
         <form onSubmit={this.submitHandler}>

                <div className="row g-4">

                  <div className="col-md-6">
                    <input
                      name='name'
                      onChange={this.changeData}
                      type="text"
                      className="form-control p-3"
                      placeholder="Enter Full Name"
                    />
                    <p id='nameError'></p>
                  </div>
                  
                  <div className="col-md-6">
                    <input                     
                      type="email"
                      name='email'
                      onChange={this.changeData}
                      className="form-control p-3"
                      placeholder="Email Address"
                    />
                    <p id='emailError'></p>
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name='destination'
                      onChange={this.changeData}
                      className="form-control p-3"
                      placeholder="Destination"
                    />
                    <p id='destinationError'></p>
                  </div>

                  <div className="col-md-6">
                    <input
                      type="tel"
                      name='mobile'
                      onChange={this.changeData}
                      className="form-control p-3"
                      placeholder="Mobile Number"
                    />
                    <p id='mobileError'></p>
                  </div>

                  <div className="col-12">
                    <textarea
                      rows="6"
                      name='message'
                      onChange={this.changeData}
                      className="form-control p-3"
                      placeholder="Tell us about your dream vacation..."
                    ></textarea>
                    <p id='messageError'></p>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary btn-lg rounded-pill px-5">
                      Submit
                    </button>
                  </div>

                </div>

              </form>

    )
  }
}
