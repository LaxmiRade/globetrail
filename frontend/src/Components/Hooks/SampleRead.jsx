import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SampleRead = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    })
  return (
    <div className='container p-5'>
        <h2>Users :{users.length}</h2>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((u,i) => {
                        return(
                            <tr key = {i}>
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

export default SampleRead