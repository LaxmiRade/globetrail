import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { API } from "./api";

function Hero() {
  const [query, setQuery] = useState({ destination: "", budget: "" });
  const [results, setResults] = useState(null);   // null = user has not searched yet
  const [searching, setSearching] = useState(false);

  // Search tours (by destination text + budget) and hotels (by destination text)
  const searchTrips = () => {
    const text = query.destination.trim();
    const params = { search: text };
    if (query.budget) {
      const [min, max] = query.budget.split("-");
      if (min) params.price__gte = min;
      if (max) params.price__lte = max;
    }

    setSearching(true);
    Promise.all([
      axios.get(`${API}/packages/`, { params }),
      text ? axios.get(`${API}/hotels/`, { params: { search: text } }) : Promise.resolve({ data: [] }),
    ])
    .then(([p, h]) => setResults({ packages: p.data, hotels: h.data, text }))
    .catch((err) => {
      console.log(err);
      alert("Could not search right now. Please try again.");
    })
    .finally(() => setSearching(false));
  };

  return (
    <section>
    <div
      className="position-relative d-flex align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.35))",
        }}
      ></div>

      <div className="container position-relative text-white">
        <div className="row align-items-center">

          {/* Left Content */}
          <div className="col-lg-7">

            <span className="badge text-bg-light-grey  px-3 py-2 mb-4 fs-6">
               Explore The World With GlobeTrail
            </span>

            <h1 className="fw-bold mb-4">
              Your Journey <br />
              Begins Here.
            </h1>

            <p
              className="lead mb-5"
              style={{ maxWidth: "600px" }}
            >
              Discover breathtaking destinations, luxury resorts,
              unforgettable adventures, and personalized travel
              experiences across the globe.
            </p>

            <div className="d-flex flex-wrap gap-3">

              <Link to="/destinations">
                <button className="btn btn-primary btn-lg rounded-pill">
                  Explore Tours
                </button>
              </Link>

              <button className="btn btn-outline-light btn-lg rounded-pill">
                Watch Video
              </button>

            </div>

          </div>

          {/* Right Side Card */}
          <div className="col-lg-5 d-none d-lg-flex justify-content-center">

            <div
              className="bg-white text-dark rounded-4 shadow-lg p-4"
              style={{
                width: "320px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=80"
                alt="Beach"
                className="img-fluid rounded-4 mb-3"
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <h4 className="fw-bold">
                Maldives Escape
              </h4>

              <p className="text-secondary mb-3">
                5 Days • Luxury Resort • Beach View
              </p>

              <div className="d-flex justify-content-between align-items-center">

                <h4 className="text-primary fw-bold">
                  ₹95,000
                </h4>

                <span className="badge bg-warning text-dark">
                  ⭐ 4.9
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>

  
    </div>
    {/* trips */}

    <div className="container position-relative" style={{ marginTop: "-70px", zIndex: "10" }}>
  <div className="card border-0 shadow-lg rounded-4 p-4">

    <div className="row g-3 align-items-end">

      {/* Destination */}
      <div className="col-lg col-md-6">
        <label className="form-label fw-semibold">Destination</label>
        <input
          type="text"
          className="form-control"
          placeholder="Where to?"
          value={query.destination}
          onChange={(e) => setQuery({ ...query, destination: e.target.value })}
          onKeyDown={(e) => { if (e.key === "Enter") searchTrips(); }}
        />
      </div>

      {/* Check In */}
      <div className="col-lg col-md-6">
        <label className="form-label fw-semibold">Check In</label>
        <input
          type="date"
          className="form-control"
        />
      </div>

      {/* Check Out */}
      <div className="col-lg col-md-6">
        <label className="form-label fw-semibold">Check Out</label>
        <input
          type="date"
          className="form-control"
        />
      </div>

      {/* Travelers */}
      <div className="col-lg col-md-6">
        <label className="form-label fw-semibold">Travelers</label>
        <select className="form-select">
          <option>1 Person</option>
          <option>2 Persons</option>
          <option>3 Persons</option>
          <option>4 Persons</option>
          <option>5+ Persons</option>
        </select>
      </div>

      {/* Budget */}
      <div className="col-lg col-md-6">
        <label className="form-label fw-semibold">Budget</label>
        <select
          className="form-select"
          value={query.budget}
          onChange={(e) => setQuery({ ...query, budget: e.target.value })}
        >
          <option value="">Any Budget</option>
          <option value="20000-50000">₹20,000 - ₹50,000</option>
          <option value="50000-100000">₹50,000 - ₹1,00,000</option>
          <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
          <option value="200000-">₹2,00,000+</option>
        </select>
      </div>

      {/* Button */}
      <div className="col-lg-auto">
        <button onClick={searchTrips} className="btn btn-primary px-5 py-2 rounded-pill w-100">
          {searching ? "Searching..." : "Search Trip"}
        </button>
      </div>

      </div>

     </div>
      </div>
      {/* Search results (shown under the search box after searching) */}
      {results && (
        <div className="container pt-5">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">
              Search Results{results.text && <> for “{results.text}”</>}
            </h3>
            <button className="btn btn-outline-secondary btn-sm rounded-pill" onClick={() => setResults(null)}>
              Clear
            </button>
          </div>

          {results.packages.length === 0 && results.hotels.length === 0 && (
            <p className="text-secondary">
              No tours or hotels found. Try a different destination or budget.
            </p>
          )}

          {results.packages.length > 0 && (
            <>
              <h5 className="fw-semibold mb-3">Tours ({results.packages.length})</h5>
              <div className="row g-4 mb-4">
                {results.packages.map((p) => (
                  <div className="col-lg-3 col-md-6" key={p.id}>
                    <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="card-img-top"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="fw-bold">{p.name}</h5>
                        <small className="text-secondary">📍 {p.location} · {p.duration}</small>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <h5 className="text-primary fw-bold mb-0">₹{Number(p.price).toLocaleString()}</h5>
                          <Link to={`/packageDetails/${p.id}`}>
                            <button className="btn btn-outline-primary btn-sm rounded-pill">View Trip</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {results.hotels.length > 0 && (
            <>
              <h5 className="fw-semibold mb-3">Hotels ({results.hotels.length})</h5>
              <div className="row g-4 mb-4">
                {results.hotels.map((h) => (
                  <div className="col-lg-3 col-md-6" key={h.id}>
                    <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                      <img
                        src={h.image}
                        alt={h.name}
                        className="card-img-top"
                        style={{ height: "180px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="fw-bold">{h.name}</h5>
                        <small className="text-secondary">📍 {h.location} · ⭐ {h.rating}</small>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <h5 className="text-primary fw-bold mb-0">₹{Number(h.price_per_night).toLocaleString()} / Night</h5>
                          <Link to="/hotels">
                            <button className="btn btn-outline-primary btn-sm rounded-pill">View Hotels</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

      <div className="container py-5">
        <div className="row g-4">
       {/* Card 1 */}
      <div className="col-lg-3 col-md-6">
        <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
          <h1 className="fw-bold text-primary p-4">250+</h1>
          <h4 className="fw-semibold">Destinations</h4>
          <p className="text-secondary mb-0">
            Explore beautiful places across the world.
          </p>

      </div>
    </div>

    {/* Card 2 */}
    <div className="col-lg-3 col-md-6">
      <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
        <h1 className="fw-bold text-success p-4">50K+</h1>
        <h4 className="fw-semibold">Happy Travelers</h4>
        <p className="text-secondary mb-0">
          Thousands of satisfied customers worldwide.
        </p>

      </div>
    </div>

    {/* Card 3 */}
    <div className="col-lg-3 col-md-6">
      <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
        <h1 className="fw-bold text-warning p-4">15+</h1>
        <h4 className="fw-semibold">Years Experience</h4>
        <p className="text-secondary mb-0">
          Creating unforgettable travel experiences.
        </p>

      </div>
    </div>

    {/* Card 4 */}
    <div className="col-lg-3 col-md-6">
      <div className="card border-0 shadow rounded-4 text-center p-4 h-100">
        <h1 className="fw-bold text-danger p-4">4.9⭐</h1>
        <h4 className="fw-semibold">Customer Rating</h4>
        <p className="text-secondary mb-0">
          Rated excellent for service and quality.
        </p>

      </div>
    </div>

     </div>

     </div>

    </section>
  );
}

export default Hero;