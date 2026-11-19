import React, { useContext } from "react";
import { Link } from "react-router";
import Hero from './Hero';
import { loginData } from "../App";


function Navbar() {
  const [login, setLogin]= useContext(loginData);
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            GlobeTrail
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarNav">

            {/* Nav Links */}
            <ul className="navbar-nav mx-auto gap-3">
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/destinations">
                  Destinations
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/hotels">
                  Hotels
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Right Actions */}
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-transparent rounded-pill border px-3" title="Wishlist" aria-label="Wishlist">
                <i className="bi bi-heart fs-5"></i>
              </button>

              <Link to="/cart">
                <button className="btn btn-transparent rounded-pill border px-3" title="Cart" aria-label="Cart">
                  <i className="bi bi-cart fs-5"></i>
                </button>
              </Link>

              {login.status ? (
                <>
                  <span className="fw-semibold">Hi, {login.user?.name}</span>

                  {login.user?.type === "admin" && (
                    <Link to="/dashboard">
                      <button className=" btn text-bg-primary  rounded-pill px-4">
                        Dashboard
                      </button>
                    </Link>
                  )}

                  <button className="btn btn-danger" onClick={()=> setLogin({status:false, user:null})}>Logout</button>
                </>
              ) : (
                <>
                  <Link to={"/userlogin"}>
                    <button className=" btn btn-outline-primary  rounded-pill px-4">
                      Login
                    </button>
                  </Link>

                  <Link to={"/signup"}>
                    <button className=" btn text-bg-primary  rounded-pill px-4">
                      Sign Up
                    </button>
                  </Link>

                  <Link to={"/login"}>
                    <button className=" btn text-bg-primary  rounded-pill px-4">
                    <i>Admin</i>
                    </button>
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </nav>

      
    </section>
  );
}

export default Navbar;