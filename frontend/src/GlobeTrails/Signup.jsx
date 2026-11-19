import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { loginData } from '../App'
import { API, errorText } from './api'

const Signup = () => {
    const [details, setDetails] = useState({ name:'', email:'', mobile:'', password:'', confirm:'' })
    const [, setLogin] = useContext(loginData)
    const navigate = useNavigate()
    const location = useLocation()

    const changeDetails = (e) => {
        const {name, value} = e.target
        setDetails({...details, [name]:value})
    }

    const signupHandler = (e) => {
        e.preventDefault()

        if(details.password !== details.confirm){
            alert('Passwords do not match')
            return
        }

        const {name, email, mobile, password} = details

        // Saves the new user in the database, then logs them in
        axios.post(`${API}/auth/register/`, {name, email, mobile, password})
        .then((res) => {
            localStorage.setItem('access', res.data.access)
            setLogin({status:true, user:res.data.user})
            alert('Account created successfully')
            navigate(location.state?.from || '/')
        })
        .catch((err) => alert(errorText(err, 'Could not create account')))
    }

    return (
        <div className='container p-5'>
            <div className='shadow text-center p-5 col-lg-6 mx-auto'>
                <h2 className='fw-bold mb-3'>Sign Up</h2>
                <form onSubmit={signupHandler}>
                    <input required type="text" onChange={changeDetails} name='name' placeholder='Full Name' className='form-control mb-3' />
                    <input required type="email" onChange={changeDetails} name='email' placeholder='Email Address' className='form-control mb-3' />
                    <input required type="tel" onChange={changeDetails} name='mobile' placeholder='Mobile Number' className='form-control mb-3' />
                    <input required type="password" onChange={changeDetails} name='password' placeholder='Password (min 8 characters)' className='form-control mb-3' />
                    <input required type="password" onChange={changeDetails} name='confirm' placeholder='Confirm Password' className='form-control mb-3' />
                    <input type="submit" value="Create Account" className='form-control mb-3 text-bg-primary' />
                </form>
                <p className='mb-0'>Already have an account? <Link to='/userlogin' state={location.state}>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
