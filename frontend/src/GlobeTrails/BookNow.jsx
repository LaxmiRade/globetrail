import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { loginData } from '../App'
import { API, authHeader, errorText } from './api'

// Date input minimum = tomorrow (local time)
const tomorrow = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${mm}-${dd}`
}

const BookNow = ({ pack }) => {
    const [login, setLogin] = useContext(loginData)
    const navigate = useNavigate()
    const closeRef = useRef(null)
    const modalRef = useRef(null)
    const [saving, setSaving] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', mobile: '', travel_date: '', travelers: 1 })

    // Pre-fill the form with the logged-in user's details
    useEffect(() => {
        if (login.user) {
            setForm((f) => ({ ...f, name: login.user.name || '', email: login.user.email || '', mobile: login.user.mobile || '' }))
        }
    }, [login.user])

    const changeData = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const total = Number(pack.price || 0) * Number(form.travelers || 0)

    const submitHandler = (e) => {
        e.preventDefault()
        setSaving(true)
        axios.post(`${API}/bookings/`, {
            package: pack.id,
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            travel_date: form.travel_date,
            travelers: Number(form.travelers),
        }, authHeader())
        .then(() => {
            setForm({ ...form, travel_date: '', travelers: 1 })
            // close the popup, then show the booking details on the Cart page
            modalRef.current.addEventListener('hidden.bs.modal', () => navigate('/cart'), { once: true })
            closeRef.current.click()
        })
        .catch((err) => {
            console.log(err)
            if (err.response?.status === 401) {
                // token expired -> log in again
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
        <div className="modal fade" id="bookNow" tabIndex="-1" ref={modalRef}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={submitHandler}>
                        <div className="modal-header">
                            <h5 className="modal-title">Book : {pack.name}</h5>
                            <button type="button" ref={closeRef} className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <input required name="name" value={form.name} onChange={changeData}
                                type="text" className="form-control mb-3" placeholder="Full Name" />

                            <input required name="email" value={form.email} onChange={changeData}
                                type="email" className="form-control mb-3" placeholder="Email Address" />

                            <input required name="mobile" value={form.mobile} onChange={changeData}
                                type="tel" className="form-control mb-3" placeholder="Mobile Number" />

                            <label className="form-label">Travel Date</label>
                            <input required name="travel_date" value={form.travel_date} onChange={changeData}
                                type="date" min={tomorrow()} className="form-control mb-3" />

                            <label className="form-label">Number of Travelers</label>
                            <input required name="travelers" value={form.travelers} onChange={changeData}
                                type="number" min="1" className="form-control mb-3" />

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

export default BookNow
