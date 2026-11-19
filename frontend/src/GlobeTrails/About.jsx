import React from "react";

function About() {
  return (
    <section className="py-5 overflow-hidden">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Left Images */}
          <div className="col-lg-6 position-relative">

            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt="Travel"
              className="img-fluid rounded-4 shadow-lg"
            />

            <div
              className="bg-secondary text-white p-4 rounded-4 shadow position-absolute"
              style={{
                bottom: "-30px",
                right: "-20px",
                width: "230px"
              }}
            >
              <h2 className="fw-bold mb-1">8+ Years</h2>
              <p className="mb-0">
                Crafting unforgettable travel stories worldwide.
              </p>
            </div>

          </div>

          {/* Right Content */}
          <div className="col-lg-6">

            <span className="badge text-bg-primary  px-3 py-2 mb-3">
              ABOUT GLOBETRAIL
            </span>

            <h1 className="fw-bold display-5 mb-4">
              Discover The World Like Never Before
            </h1>

            <p className="text-secondary fs-5 mb-4">
              GlobeTrail transforms ordinary vacations into extraordinary adventures.
              Explore iconic destinations, luxury stays, hidden gems,
              and personalized experiences crafted just for you.
            </p>

            {/* Features */}

            <div className="row g-4 mb-4">

              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <div className="fs-2">✈️</div>
                  <div>
                    <h5 className="fw-bold">Smart Planning</h5>
                    <p className="text-secondary">
                      Personalized trips tailored to your style.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <div className="fs-2">🏨</div>
                  <div>
                    <h5 className="fw-bold">Luxury Stays</h5>
                    <p className="text-secondary">
                      Premium hotels & exclusive experiences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <div className="fs-2">🌍</div>
                  <div>
                    <h5 className="fw-bold">Global Destinations</h5>
                    <p className="text-secondary">
                      Explore amazing places across continents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="d-flex gap-3">
                  <div className="fs-2">⭐</div>
                  <div>
                    <h5 className="fw-bold">Top Rated Service</h5>
                    <p className="text-secondary">
                      Thousands of happy travelers trust us.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <button className="btn danger btn-lg rounded-pill px-4">
              Start Your Journey
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;