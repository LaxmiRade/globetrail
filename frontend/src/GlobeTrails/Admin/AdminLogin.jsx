import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { loginData } from '../../App';
import { API } from '../api';

const AdminLogin = () => {
    const [details, setDetails] = useState ({ email:'', password:''});
    const [login, setLogin]= useContext(loginData)
    const navigate = useNavigate();

    const changeDetails = (e) => {
        const {name, value}= e.target

        setDetails({...details, [name]:value})
    }

    const loginValidation = (e) =>{
        e.preventDefault();

        axios.post(`${API}/auth/login/`, details)
        .then((res) => {
            if(res.data.user.type !== 'admin'){
                alert("This is not an admin account. Please use the normal Login.")
                return
            }
            localStorage.setItem('access', res.data.access)
            setLogin({status:true , user:res.data.user})
            navigate('/dashboard')
        })
        .catch(() => alert("Invalid"))

        
    }
  return (
    <div className='container p-5'>
        <div className='shadow text-center p-5 col-lg-6 mx-auto'>
            <h2 className='fw-bold mb-3'>Admin Login</h2>
            <form onSubmit={loginValidation}>
                <input type="email" onChange={changeDetails} name='email' placeholder='Email Address' className='form-control mb-3' />
                <input type="password" onChange={changeDetails} name='password' placeholder='Password' className='form-control mb-3' />
                <input type="submit" className='form-control mb-3 text-bg-primary' />
            </form>
        </div>
    </div>
  )
}

export default AdminLogin