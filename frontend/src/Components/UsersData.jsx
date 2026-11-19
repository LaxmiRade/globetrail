import React, { Component } from 'react'
import  axios  from 'axios'

export default class UsersData extends Component {
    constructor(){
        super()
        
        this.state = {
            users : []
        }
    }

    componentDidMount(){
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => {
            //console.log(res.data); 
            this.setState({
                users : res.data
            }) 
        })
        .catch((err) =>{
            console.log(err);
            
        })

    }
  render() {
    return (
      <div className='container p-5'>
        <h2>Users :{this.state.users.length}</h2>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {
                this.state.users.map((u, index) =>{
                   return ( <tr key={index}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>{u.address.city}</td>
                        <td>{u.company.name}</td>
                    </tr> 
                   )              
                 })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
