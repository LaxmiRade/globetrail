import React from "react";
import SendEnquiry from "./SendEnquiry";

function Contact() {
  return (
    <section className="py-5 bg-light">

      <div className="container">

        {/* Heading */}

        <div className="text-center mb-5">

          <span className="badge bg-primary px-3 py-2 mb-3">
            CONTACT GLOBETRAIL
          </span>

          <h1 className="display-5 fw-bold">
            Plan Your Next Journey With Us
          </h1>

          <p className="text-secondary">
            Questions, bookings, or custom travel plans?
            Our team is ready to help.
          </p>

        </div>

        <div className="row g-5 align-items-center">

          {/* Left Side */}

          <div className="col-lg-5">

            <div className="bg-Light grey  p-5 rounded-4 shadow-lg h-100">

              <h2 className="fw-bold mb-4">
                Get In Touch
              </h2>

              <p className="mb-4">
                Reach out for bookings, destination advice,
                luxury stays, or personalized travel experiences.
              </p>

              <div className="mb-4">
                <h5>📍 Office Address</h5>
                <p>Hyderabad, India</p>
              </div>

              <div className="mb-4">
                <h5>📞 Phone</h5>
                <p>+91 98765 43210</p>
              </div>

              <div className="mb-4">
                <h5>📧 Email</h5>
                <p>hello@globetrail.com</p>
              </div>

              <div>
                <h5>🕒 Working Hours</h5>
                <p>Mon - Sat : 9:00 AM — 7:00 PM</p>
              </div>

            </div>

          </div>

          {/* Right Side Form */}

          <div className="col-lg-7">

            <div className="bg-white p-5 rounded-4 shadow-lg">
              <SendEnquiry/>

            </div>

          </div>

        </div>
        <div className="container mt-5">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.635407682249!2d78.48477093577529!3d17.442488740246077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a0e118c4bb1%3A0x8c336787a1e42b9c!2sOsmania%20University%20PG%20College!5e0!3m2!1sen!2sin!4v1783502633621!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>

      </div>

    </section>
  );
}

export default Contact;