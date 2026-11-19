import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Hero from "./Hero";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-light pt-5 pb-3">
        <div className="container">

          <div className="row g-4">

            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <h3 className="fw-bold fs-3 ">GlobeTrail</h3>
              <p className="mt-3">
                Explore breathtaking destinations, luxury stays, and unforgettable journeys with GlobeTrail.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none"> Home</a></li>
                <li><a href="#" className="text-light text-decoration-none">Destinations</a></li>
                <li><a href="#" className="text-light text-decoration-none">Packages</a></li>
                <li><a href="#" className="text-light text-decoration-none">Hotels</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Services</h5>
              <ul className="list-unstyled">
                <li> Flight Booking</li>
                <li> Hotel Reservation</li>
                <li> Visa Assistance</li>
                <li> Tour Planning</li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="col-lg-3 col-md-6">
              <h5 className="fw-bold mb-3">Follow Us</h5>

              <div className="d-flex gap-3 fs-4">
                <a href="#" className="text-light">
                  <FaFacebook />
                </a>

                <a href="#" className="text-light">
                  <FaInstagram />
                </a>

                <a href="#" className="text-light">
                  <FaTwitter />
                </a>

                <a href="#" className="text-light">
                  <FaLinkedin />
                </a>
              </div>
            </div>

          </div>

          <hr className="my-4" />

          <div className="text-center">
            <p className="mb-0">
              © 2026 GlobeTrail. All Rights Reserved for laxmirade.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;