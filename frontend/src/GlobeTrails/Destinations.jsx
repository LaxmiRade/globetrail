import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { API } from "./api";

function Destinations() {
  const [packages, setPackages]= useState([]);
  useEffect(() =>{
    axios.get(`${API}/packages/`)
    .then(res => setPackages(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <span className="badge bg-primary text-white px-3 py-2 mb-3">
            TOP DESTINATIONS
          </span>

          <h1 className="fw-bold display-5">
            Explore Popular Destinations
          </h1>

          <p className="text-secondary">
            Discover beautiful places, luxury stays, and unforgettable journeys.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          {
          packages.map((place,index)=>(
            <div className="col-lg-4 col-md-6" key={index}>

              <div className="card border-0 shadow-lg rounded-4 overflow-hidden position-relative">

                <img
                  src={place.image}
                  alt={place.name}
                  className="card-img-top"
                  style={{
                    height:"450px",
                    objectFit:"cover"
                  }}
                />

                {/* Overlay */}
                <div
                  className="position-absolute bottom-0 start-0 w-100 text-white p-4"
                  style={{
                    background:
                    "linear-gradient(transparent, rgba(0,0,0,0.85))"
                  }}
                >

                  <h3 className="fw-bold">
                    {place.name}
                  </h3>

                  <div className="d-flex justify-content-between my-3">
                    <span>⭐ 4.9 Rating</span>
                    <span>{place.duration}</span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">

                    <h4 className="fw-bold text-warning">
                      ${place.price}
                    </h4>

                    <Link to={`/packageDetails/${place.id}`}>
                     <button className="btn btn-outline-secondary text-white rounded-pill px-4">
                      View Trip
                     </button>
                    </Link>
                    
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Destinations;