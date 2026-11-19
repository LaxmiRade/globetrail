import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, authHeader } from '../api'

const ManageReviews = () => {
    const [reviews, setReviews] = useState([])
    const [packages, setPackages] = useState([])

    const loadReviews = () => {
        axios.get(`${API}/reviews/`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadReviews()
        axios.get(`${API}/packages/`)
        .then((res) => setPackages(res.data))
        .catch((err) => console.log(err))
    }, [])

    const packageName = (id) => packages.find((p) => p.id === id)?.name || `Package #${id}`

    const deleteReview = (id) => {
        axios.delete(`${API}/reviews/${id}/`, authHeader())
        .then(() => loadReviews())
        .catch((err) => {
            console.log(err)
            alert(err.response?.status === 401 ? 'Session expired. Please log in again.' : 'Something went wrong')
        })
    }

    return (
        <div className='container p-5'>
            <h2>Reviews : {reviews.length}</h2>
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{packageName(r.package)}</td>
                                    <td>{r.name}</td>
                                    <td>{r.rating} ⭐</td>
                                    <td>{r.giveReview}</td>
                                    <td>{new Date(r.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => deleteReview(r.id)} className='btn btn-danger btn-sm'><i className='bi bi-trash'></i></button>
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

export default ManageReviews
