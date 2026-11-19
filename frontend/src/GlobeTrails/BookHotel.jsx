import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { loginData } from '../App'
import { API, authHeader, errorText } from './api'

const dateString = (daysFromToday) => {
    const d = new Date()
    d.setDate(d.getDate() + daysFromToday)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${mm}-${dd}`
}

const BookHotel = ({ hotel }) => {
    const [login, setLogin] = useContext(loginData)
    const navigate = useNavigate()
    const closeRef = useRef(null)
    const modalRef = useRef(null)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', mobile: '', check_in: '', check_out: '', guests: 1, rooms: 1 })

    useEffect(() => {
        if (login.user) {
            setForm((f) => ({ ...f, name: login.user.name || '', email: login.user.email || '', mobile: login.user.mobile || '' }))
        }
    }, [login.user])

    const changeData = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const nights = form.check_in && form.check_out
        ? Math.max(0, Math.round((new Date(form.check_out) - new Date(form.check_in)) / 86400000))
        : 0
    const total = Number(hotel.price_per_night || 0) * nights * Number(form.rooms || 0)

    const submitHandler = (e) => {
        e.preventDefault()
        setSaving(true)
        axios.post(`${API}/hotel-bookings/`, {
            hotel: hotel.id,
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            check_in: form.check_in,
            check_out: form.check_out,
            guests: Number(form.guests),
            rooms: Number(form.rooms),
        }, authHeader())
        .then(() => {
            setForm({ ...form, check_in: '', check_out: '', guests: 1, rooms: 1 })
            // close the popup, then show the booking details on the Cart page
            modalRef.current.addEventListener('hidden.bs.modal', () => navigate('/cart'), { once: true })
            closeRef.current.click()
        })
        .catch((err) => {
            console.log(err)
            if (err.response?.status === 401) {
                closeRef.current.click()
                setLogin({ status: false, user: null })
                alert('Your session expired. Please log in again.')
                navigate('/userlogin')
                return
            }
            alert(errorText(err, 'Could not complete the booking. Please try again.'))
        })
        .finally(() => setSaving(false))
    }

    return (
        <div className="modal fade" id="bookHotel" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={submitHandler}>
                        <div className="modal-header">
                            <h5 className="modal-title">Book : {hotel.name}</h5>
                            <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input required name="name" value={form.name} onChange={changeData}
                                type="text" className="form-control mb-3" placeholder="Full Name" />

                            <input required name="email" value={form.email} onChange={changeData}
                                type="email" className="form-control mb-3" placeholder="Email Address" />

                            <input required name="mobile" value={form.mobile} onChange={changeData}
                                type="tel" className="form-control mb-3" placeholder="Mobile Number" />

                            <div className="row">
                                <div className="col-6">
                                    <label className="form-label">Check-in</label>
                                    <input required name="check_in" value={form.check_in} onChange={changeData}
                                        type="date" min={dateString(1)} className="form-control mb-3" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Check-out</label>
                                    <input required name="check_out" value={form.check_out} onChange={changeData}
                                        type="date" min={form.check_in || dateString(2)} className="form-control mb-3" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Guests</label>
                                    <input required name="guests" value={form.guests} onChange={changeData}
                                        type="number" min="1" className="form-control mb-3" />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Rooms</label>
                                    <input required name="rooms" value={form.rooms} onChange={changeData}
                                        type="number" min="1" className="form-control mb-3" />
                                </div>
                            </div>

                            <p className="mb-1 text-secondary">
                                ₹ {Number(hotel.price_per_night || 0).toLocaleString()} x {nights} night(s) x {form.rooms || 0} room(s)
                            </p>
                            <h5 className="text-primary fw-bold">
                                Total : ₹ {total.toLocaleString()}
                            </h5>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" disabled={saving} className="btn btn-primary rounded-pill px-4">
                                {saving ? 'Adding...' : 'Add to Cart'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookHotel
