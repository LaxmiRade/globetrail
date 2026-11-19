import React, { useContext, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router'
import { loginData } from '../../App'

const Dashboard = () => {
    const [login, setLogin]= useContext(loginData)
    const navigate = useNavigate()
    useEffect(() => {
        if(!login.status || login.user?.type !== 'admin'){
            navigate(`/login`)
        }

        else{
            console.log(login);        
        }
    },[login])
  return (
    <div className='container-fluid'>
        <div className="row">
            <aside className="col-lg-3">
               <Link to={''}>
                <h2 className='btn fw-bold'>Admin Dashboard</h2>
                </Link>
                <Link to={'addpackage'} >
                 <button>Add Package</button>
                </Link>
               <Link to={'managepackages'}>
                 <button>Manage Packages</button>
               </Link>
                <Link to={'addhotel'} >
                 <button>Add Hotel</button>
                </Link>
                <Link to={'managehotels'}>
                 <button>Manage Hotels</button>
                </Link>
                <Link to={'manageenquires'}>
                    <button>Manage Enquires</button>
                </Link>
                <Link to={'managereviews'}>
                    <button>Manage Reviews</button>
                </Link>
                <Link to={'managebookings'}>
                    <button>manage Bookings</button>
                </Link>
            </aside>
            <div className="col-lg-9">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard