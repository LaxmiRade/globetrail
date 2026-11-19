import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { loginData } from '../App'
import { API, errorText } from './api'

const UserLogin = () => {
    const [details, setDetails] = useState({ email:'', password:'' })
    const [, setLogin] = useContext(loginData)
    const navigate = useNavigate()
    const location = useLocation()

    const changeDetails = (e) => {
        const {name, value} = e.target
        setDetails({...details, [name]:value})
    }

    const loginHandler = (e) => {
        e.preventDefault()

        axios.post(`${API}/auth/login/`, details)
        .then((res) => {
            localStorage.setItem('access', res.data.access)
            setLogin({status:true, user:res.data.user})
            // go back to the page the user came from (e.g. the package they wanted to book)
            navigate(location.state?.from || '/')
        })
        .catch((err) => alert(errorText(err, 'Invalid email or password')))
    }

    return (
        <div className='container p-5'>
            <div className='shadow text-center p-5 col-lg-6 mx-auto'>
                <h2 className='fw-bold mb-3'>Login</h2>
                <form onSubmit={loginHandler}>
                    <input required type="email" onChange={changeDetails} name='email' placeholder='Email Address' className='form-control mb-3' />
                    <input required type="password" onChange={changeDetails} name='password' placeholder='Password' className='form-control mb-3' />
                    <input type="submit" value="Login" className='form-control mb-3 text-bg-primary' />
                </form>
                <p className='mb-0'>New to GlobeTrail? <Link to='/signup' state={location.state}>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default UserLogin
