import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, authHeader } from '../api'

const ManageBookings = () => {
    const [bookings, setBookings] = useState([])
    const [hotelBookings, setHotelBookings] = useState([])

    const loadAll = () => {
        axios.get(`${API}/bookings/`, authHeader())
        .then((res) => setBookings(res.data))
        .catch((err) => console.log(err))

        axios.get(`${API}/hotel-bookings/`, authHeader())
        .then((res) => setHotelBookings(res.data))
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadAll()
    }, [])

    const failed = (err) => {
        console.log(err)
        alert(err.response?.status === 401 ? 'Session expired. Please log in again.' : 'Something went wrong')
    }

    // kind = 'bookings' (destinations) or 'hotel-bookings'
    const changeStatus = (kind, id, status) => {
        axios.patch(`${API}/${kind}/${id}/`, { status }, authHeader())
        .then(() => loadAll())
        .catch(failed)
    }

    const deleteBooking = (kind, id) => {
        axios.delete(`${API}/${kind}/${id}/`, authHeader())
        .then(() => loadAll())
        .catch(failed)
    }

    const actions = (kind, id) => (
        <td>
            <button onClick={() => changeStatus(kind, id, 'confirmed')} className='btn btn-success btn-sm me-2'>Confirm</button>
            <button onClick={() => changeStatus(kind, id, 'cancelled')} className='btn btn-warning btn-sm me-2'>Cancel</button>
            <button onClick={() => deleteBooking(kind, id)} className='btn btn-danger btn-sm'><i className='bi bi-trash'></i></button>
        </td>
    )

    return (
        <div className='container p-5'>
            <h2>Destination Bookings : {bookings.length}</h2>
            <div className="table-responsive mb-5">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Package</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Travel Date</th>
                            <th>Travelers</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((b) => (
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>{b.package_name}</td>
                                    <td>{b.name}</td>
                                    <td>{b.email}</td>
                                    <td>{b.mobile}</td>
                                    <td>{b.travel_date}</td>
                                    <td>{b.travelers}</td>
                                    <td>₹ {Number(b.total_price).toLocaleString()}</td>
                                    <td className='text-capitalize'>{b.status}</td>
                                    {actions('bookings', b.id)}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <h2>Hotel Bookings : {hotelBookings.length}</h2>
            <div className="table-responsive">
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hotel</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th>Rooms</th>
                            <th>Guests</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hotelBookings.map((h) => (
                                <tr key={h.id}>
                                    <td>{h.id}</td>
                                    <td>{h.hotel_name}</td>
                                    <td>{h.name}</td>
                                    <td>{h.email}</td>
                                    <td>{h.mobile}</td>
                                    <td>{h.check_in}</td>
                                    <td>{h.check_out}</td>
                                    <td>{h.rooms}</td>
                                    <td>{h.guests}</td>
                                    <td>₹ {Number(h.total_price).toLocaleString()}</td>
                                    <td className='text-capitalize'>{h.status}</td>
                                    {actions('hotel-bookings', h.id)}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageBookings
