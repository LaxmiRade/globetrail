import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { loginData } from '../App'
import { API, authHeader, errorText } from './api'

const money = (n) => `₹ ${Number(n || 0).toLocaleString()}`

const statusBadge = (status) => (
    <span className={`badge ${status === 'confirmed' ? 'bg-success' : 'bg-warning text-dark'} text-capitalize`}>
        {status}
    </span>
)

const Cart = () => {
    const [login, setLogin] = useContext(loginData)
    const navigate = useNavigate()
    const [cart, setCart] = useState(null)
    const [confirming, setConfirming] = useState(false)

    const loadCart = () => {
        axios.get(`${API}/cart/`, authHeader())
        .then((res) => setCart(res.data))
        .catch((err) => {
            console.log(err)
            if (err.response?.status === 401) {
                // token expired -> show the login / sign up prompt
                setLogin({ status: false, user: null })
            }
        })
    }

    useEffect(() => {
        if (login.status) {
            loadCart()
        } else {
            setCart(null)
        }
    }, [login.status])

    // ---- not logged in: ask the user to login or sign up ----
    if (!login.status) {
        return (
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="bg-white p-5 rounded-4 shadow text-center col-lg-6 mx-auto">
                        <i className="bi bi-cart fs-1 text-primary"></i>
                        <h3 className="fw-bold my-3">Login to view your cart</h3>
                        <p className="text-secondary mb-4">
                            Please login or sign up to see your bookings and book tours and hotels.
                        </p>
                        <Link to="/userlogin" state={{ from: '/cart' }}>
                            <button className="btn btn-primary rounded-pill px-4 me-3">Login</button>
                        </Link>
                        <Link to="/signup" state={{ from: '/cart' }}>
                            <button className="btn btn-outline-primary rounded-pill px-4">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </section>
        )
    }

    if (!cart) {
        return <h1 className='text-center p-5'><span className='spinner-border'></span></h1>
    }

    const cartEmpty = cart.package_bookings.length === 0 && cart.hotel_bookings.length === 0
    const hasPlaced = cart.placed_package_bookings.length > 0 || cart.placed_hotel_bookings.length > 0

    const goBack = () => {
        if (window.history.length > 1) navigate(-1)
        else navigate('/destinations')
    }

    // Confirm Booking: sends everything in the cart to the admin
    const confirmBooking = () => {
        setConfirming(true)
        axios.post(`${API}/cart/confirm/`, {}, authHeader())
        .then(() => {
            alert('Booking confirmed! Our team will review it and contact you shortly.')
            loadCart()
        })
        .catch((err) => alert(errorText(err)))
        .finally(() => setConfirming(false))
    }

    // Remove / Cancel
    const removePackage = (id) => {
        axios.post(`${API}/bookings/${id}/cancel/`, {}, authHeader())
        .then(() => loadCart())
        .catch((err) => alert(errorText(err)))
    }

    const removeHotel = (id) => {
        axios.post(`${API}/hotel-bookings/${id}/cancel/`, {}, authHeader())
        .then(() => loadCart())
        .catch((err) => alert(errorText(err)))
    }

    return (
        <section className="py-5 bg-light">
            <div className="container">

                <div className="text-center mb-5">
                    <span className="badge bg-primary px-3 py-2 mb-3">YOUR CART</span>
                    <h1 className="display-5 fw-bold">Booking Details</h1>
                    <p className="text-secondary">Check your bookings and prices, then confirm.</p>
                </div>

                {cartEmpty && (
                    <div className="bg-white p-5 rounded-4 shadow text-center mb-5">
                        <h4 className="mb-3">Your cart is empty</h4>
                        <Link to="/destinations"><button className="btn btn-primary rounded-pill px-4 me-3">Browse Destinations</button></Link>
                        <Link to="/hotels"><button className="btn btn-outline-primary rounded-pill px-4">Browse Hotels</button></Link>
                    </div>
                )}

                {/* ---------- items waiting for confirmation ---------- */}
                {cart.package_bookings.length > 0 && (
                    <div className="bg-white p-4 rounded-4 shadow mb-5">
                        <h3 className="fw-bold mb-4">Destination Bookings</h3>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Package</th>
                                        <th>Name</th>
                                        <th>Travel Date</th>
                                        <th>Travelers</th>
                                        <th>Price / Person</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.package_bookings.map((b) => (
                                        <tr key={b.id}>
                                            <td><img src={b.package_image} alt="" width="80" height="60" style={{objectFit:'cover'}} className="rounded" /></td>
                                            <td>
                                                <div className="fw-bold">{b.package_name}</div>
                                                <small className="text-secondary">📍 {b.package_location} · {b.package_duration}</small>
                                            </td>
                                            <td>{b.name}<br /><small className="text-secondary">{b.mobile}</small></td>
                                            <td>{b.travel_date}</td>
                                            <td>{b.travelers}</td>
                                            <td>{money(b.package_price)}</td>
                                            <td className="fw-bold">{money(b.total_price)}</td>
                                            <td><button onClick={() => removePackage(b.id)} className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i> Remove</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h5 className="text-end">Destinations Total : <span className="text-primary fw-bold">{money(cart.package_total)}</span></h5>
                    </div>
                )}

                {cart.hotel_bookings.length > 0 && (
                    <div className="bg-white p-4 rounded-4 shadow mb-5">
                        <h3 className="fw-bold mb-4">Hotel Bookings</h3>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Hotel</th>
                                        <th>Name</th>
                                        <th>Check-in</th>
                                        <th>Check-out</th>
                                        <th>Nights</th>
                                        <th>Rooms</th>
                                        <th>Guests</th>
                                        <th>Price / Night</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.hotel_bookings.map((h) => (
                                        <tr key={h.id}>
                                            <td><img src={h.hotel_image} alt="" width="80" height="60" style={{objectFit:'cover'}} className="rounded" /></td>
                                            <td>
                                                <div className="fw-bold">{h.hotel_name}</div>
                                                <small className="text-secondary">📍 {h.hotel_location}</small>
                                            </td>
                                            <td>{h.name}<br /><small className="text-secondary">{h.mobile}</small></td>
                                            <td>{h.check_in}</td>
                                            <td>{h.check_out}</td>
                                            <td>{h.nights}</td>
                                            <td>{h.rooms}</td>
                                            <td>{h.guests}</td>
                                            <td>{money(h.price_per_night)}</td>
                                            <td className="fw-bold">{money(h.total_price)}</td>
                                            <td><button onClick={() => removeHotel(h.id)} className="btn btn-outline-danger btn-sm"><i className="bi bi-trash"></i> Remove</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h5 className="text-end">Hotels Total : <span className="text-primary fw-bold">{money(cart.hotel_total)}</span></h5>
                    </div>
                )}

                {/* ---------- price summary + Back / Confirm Booking ---------- */}
                {!cartEmpty && (
                    <div className="bg-white p-4 rounded-4 shadow col-lg-5 ms-auto mb-5">
                        <h4 className="fw-bold mb-3">Price Summary</h4>
                        <div className="d-flex justify-content-between mb-2"><span>Destinations</span><span>{money(cart.package_total)}</span></div>
                        <div className="d-flex justify-content-between mb-2"><span>Hotels</span><span>{money(cart.hotel_total)}</span></div>
                        <hr />
                        <div className="d-flex justify-content-between fs-4 fw-bold text-primary mb-4"><span>Grand Total</span><span>{money(cart.grand_total)}</span></div>

                        <div className="d-flex gap-3">
                            <button onClick={goBack} className="btn btn-outline-secondary rounded-pill px-4 flex-fill">
                                <i className="bi bi-arrow-left"></i> Back
                            </button>
                            <button onClick={confirmBooking} disabled={confirming} className="btn btn-primary rounded-pill px-4 flex-fill">
                                {confirming ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ---------- bookings already confirmed by the customer (admin can see these) ---------- */}
                {hasPlaced && (
                    <div className="bg-white p-4 rounded-4 shadow">
                        <h3 className="fw-bold mb-4">My Confirmed Bookings</h3>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Booking</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.placed_package_bookings.map((b) => (
                                        <tr key={`p${b.id}`}>
                                            <td>Destination</td>
                                            <td className="fw-bold">{b.package_name}<br /><small className="text-secondary fw-normal">{b.travelers} traveler(s)</small></td>
                                            <td>{b.travel_date}</td>
                                            <td>{money(b.total_price)}</td>
                                            <td>{statusBadge(b.status)}</td>
                                            <td>{b.status === 'pending' && <button onClick={() => removePackage(b.id)} className="btn btn-outline-danger btn-sm">Cancel</button>}</td>
                                        </tr>
                                    ))}
                                    {cart.placed_hotel_bookings.map((h) => (
                                        <tr key={`h${h.id}`}>
                                            <td>Hotel</td>
                                            <td className="fw-bold">{h.hotel_name}<br /><small className="text-secondary fw-normal">{h.nights} night(s), {h.rooms} room(s)</small></td>
                                            <td>{h.check_in} to {h.check_out}</td>
                                            <td>{money(h.total_price)}</td>
                                            <td>{statusBadge(h.status)}</td>
                                            <td>{h.status === 'pending' && <button onClick={() => removeHotel(h.id)} className="btn btn-outline-danger btn-sm">Cancel</button>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default Cart
