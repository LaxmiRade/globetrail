import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import AddReview from './AddReview';
import { API } from './api';
import BookNow from './BookNow';
import { loginData } from '../App';

const PackageDetails = () => {
    const {id} = useParams()
    const [login] = useContext(loginData)
    const navigate = useNavigate()
    const location = useLocation()

    // Logged in -> open the booking popup. Not logged in -> go to login first.
    const bookProps = login.status
      ? { 'data-bs-toggle': 'modal', 'data-bs-target': '#bookNow' }
      : { onClick: () => navigate('/userlogin', { state: { from: location.pathname } }) }
    const [packageData,setPackageData]=useState({});
    useEffect(()=> {
        axios.get(`${API}/packages/${id}/`)
        .then(res => setPackageData(res.data))
        .catch(err => console.log(err))
    }, [id])
  return (
    <section className="py-5 bg-light">

      <div className="container">

        <div className="row g-5">

          {/* Left Side */}

          <div className="col-lg-7 shadow p-5">

            <img
              src={packageData.image}
              alt={packageData.name}
              className="img-fluid w-100 rounded-4  p-5 shadow-lg w-100"
              style={{
                height:"500px",
                objectFit:"cover"
              }}
            />

            <div className="row mt-5">
                <div className="col-3">
                    <img src={packageData.image} className='w-100'  alt="" />
                </div>
                 <div className="col-3">
                    <img src={packageData.image} className='w-100'  alt="" />
                </div>
                 <div className="col-3">
                    <img src={packageData.image} className='w-100'  alt="" />
                </div>
                 <div className="col-3">
                    <img src={packageData.image} className='w-100'  alt="" />
                </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="col-lg-5">

            <span className="badge bg-primary px-3 py-2 mb-3">
              PREMIUM TOUR
            </span>

            <h1 className="fw-bold display-5">
              {packageData.name}
            </h1>

            <h5 className="text-secondary mb-3">
              📍 {packageData.location}
            </h5>

            <p className="fs-5">
              ⏳ {packageData.duration}
            </p>

            <h2 className="text-primary fw-bold my-4">
              ₹ {Number(packageData.price).toLocaleString()}
            </h2>

            <p className="text-secondary mb-4">
              {packageData.description}
            </p>

            <div className="d-flex gap-3 flex-wrap">

              <button {...bookProps} className="btn btn-primary btn-lg rounded-pill px-4">
                Book Now
              </button>

              <button className="btn btn-outline-primary btn-lg rounded-pill px-4">
                Add Wishlist
              </button>

              <AddReview/>

            </div>

          </div>

        </div>
      </div>

      <BookNow pack={packageData}/>

    </section>
  )
}

export default PackageDetails