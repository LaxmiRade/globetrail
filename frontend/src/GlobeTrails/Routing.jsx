import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const Hero = lazy(() => import(`./Hero`))
const About = lazy(()=> import(`./About`))
const Destinations = lazy(() => import(`./Destinations`));
const PackageDetails = lazy(() => import(`./PackageDetails`));
const Contact = lazy(() => import(`./Contact`));
const Hotels = lazy(() => import(`./Hotels`));
const AdminLogin = lazy(() => import(`./Admin/AdminLogin`));
const Dashboard = lazy(() => import(`./Admin/Dashboard`));
const Welcome = lazy(() => import(`./Admin/Welcome`));
const AddPackage = lazy(() => import(`./Admin/AddPackage`));
const ManagePackages = lazy(() => import(`./Admin/ManagePackages`));
const AddHotel = lazy(() => import(`./Admin/AddHotel`));
const ManageHotels = lazy(() => import(`./Admin/ManageHotels`));
const ManageReviews = lazy(() => import(`./Admin/ManageReviews`));
const ManageEnquires = lazy(() => import(`./Admin/ManageEnquires`));
const ManageBookings = lazy(() => import(`./Admin/ManageBookings`));
const UserLogin = lazy(() => import(`./UserLogin`));
const Signup = lazy(() => import(`./Signup`));
const Cart = lazy(() => import(`./Cart`));
const NoPage = lazy(() => import(`./NoPage`));


const Routing = () => {
  return (
    <Suspense fallback={<h1 className='text-center p-5'><span className='spinner-border'></span></h1>}>
   <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/destinations' element={<Destinations/>}/>
    <Route path='/packageDetails/:id' element={<PackageDetails/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/hotels' element={<Hotels/>}/>
    <Route path='/login' element={<AdminLogin/>}/>
    <Route path='/userlogin' element={<UserLogin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Welcome/>}/>
        <Route path='addpackage' element={<AddPackage/>}/>
        <Route path='managepackages' element={<ManagePackages/>}/>
        <Route path='addhotel' element={<AddHotel/>}/>
        <Route path='managehotels' element={<ManageHotels/>}/>
        <Route path='managereviews' element={<ManageReviews/>}/>
        <Route path='manageenquires' element={<ManageEnquires/>}/>
        <Route path='managebookings' element={<ManageBookings/>}/>
    </Route>
    <Route path='*' element={<NoPage/>}/>

   </Routes>
   </Suspense>
  )
}

export default Routing