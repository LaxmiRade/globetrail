import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, authHeader } from '../api'

const ManageEnquires = () => {
    const [enquires, setEnquires] = useState([])

    const loadEnquires = () => {
        axios.get(`${API}/enquires/`, authHeader())
        .then((res) => setEnquires(res.data))
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadEnquires()
    }, [])

    const deleteEnquiry = (id) => {
        axios.delete(`${API}/enquires/${id}/`, authHeader())
        .then(() => loadEnquires())
        .catch((err) => {
            console.log(err)
            alert(err.response?.status === 401 ? 'Session expired. Please log in again.' : 'Something went wrong')
        })
    }

    return (
        <div className='container p-5'>
            <h2>Enquires : {enquires.length}</h2>
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Destination</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            enquires.map((q) => (
                                <tr key={q.id}>
                                    <td>{q.id}</td>
                                    <td>{q.name}</td>
                                    <td>{q.email}</td>
                                    <td>{q.mobile}</td>
                                    <td>{q.destination}</td>
                                    <td>{q.message}</td>
                                    <td>{new Date(q.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => deleteEnquiry(q.id)} className='btn btn-danger btn-sm'><i className='bi bi-trash'></i></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageEnquires
