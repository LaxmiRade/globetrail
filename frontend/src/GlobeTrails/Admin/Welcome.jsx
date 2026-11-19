import React from 'react'
import useCallApi from './CallApi'

const Welcome = () => {
  const Packages = useCallApi(`packages`)
  const users = useCallApi(`users`)
  const enquires = useCallApi(`enquires`)
  const reviews = useCallApi(`reviews`)
  return (
    <div className='container p-5 text-center'>
      <h2>Welcome to Admin Dashboard</h2>
      <div className="row mt-5">
        <div className="col-lg-3">
          <div className="card shadow">
            <div className="card-body">
              <h1>{Packages.length}+</h1>
              <p>Packages</p>
            </div>
          </div>
        </div>
         <div className="col-lg-3">
          <div className="card shadow">
            <div className="card-body">
              <h1>{users.length}+</h1>
              <p>Users</p>
            </div>
          </div>
        </div>
         <div className="col-lg-3">
          <div className="card shadow">
            <div className="card-body">
              <h1>{enquires.length}+</h1>
              <p>Enquires</p>
            </div>
          </div>
        </div>
         <div className="col-lg-3">
          <div className="card shadow">
            <div className="card-body">
              <h1>{reviews.length}+</h1>
              <p>Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome