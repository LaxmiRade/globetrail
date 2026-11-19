import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loginData } from "../App";
import { API } from "./api";
import BookHotel from "./BookHotel";

function Hotels() {

  const [hotels, setHotels] = useState([]);
  const [selected, setSelected] = useState({});
  const [login] = useContext(loginData);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get(`${API}/hotels/`)
    .then(res => setHotels(res.data))
    .catch(err => console.log(err))
  }, [])

  // Logged in -> open the booking popup. Not logged in -> go to login first.
  const bookProps = (hotel) => login.status
    ? { "data-bs-toggle": "modal", "data-bs-target": "#bookHotel", onClick: () => setSelected(hotel) }
    : { onClick: () => navigate("/userlogin", { state: { from: location.pathname } }) };

  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* Heading */}

        <div className="text-center mb-5">

          <span className="badge bg-primary px-3 py-2 mb-3">
            LUXURY HOTELS
          </span>

          <h1 className="display-5 fw-bold">
            Stay In Comfort & Luxury
          </h1>

          <p className="text-secondary">
            Discover premium hotels, beach resorts,
            mountain retreats, and unforgettable stays.
          </p>

        </div>

        {/* Cards */}

        <div className="row g-4">

          {hotels.map((hotel,index)=>(

            <div className="col-lg-4 col-md-6" key={index}>

              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="card-img-top"
                  style={{
                    height:"280px",
                    objectFit:"cover"
                  }}
                />

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between mb-3">

                    <span className="badge bg-secondary text-white">
                      ⭐ {hotel.rating}
                    </span>

                    <small className="text-secondary">
                      {hotel.location}
                    </small>

                  </div>

                  <h4 className="fw-bold">
                    {hotel.name}
                  </h4>

                  <div className="d-flex justify-content-between align-items-center mt-4">

                    <h5 className="text-primary fw-bold">
                      ₹{Number(hotel.price_per_night).toLocaleString()} / Night
                    </h5>

                    <button {...bookProps(hotel)} className="btn btn-outline-primary rounded-pill">
                      Book Now
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <BookHotel hotel={selected}/>

    </section>
  );
}

export default Hotels;