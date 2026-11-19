import axios from 'axios'
import React, { useState } from 'react'
import { API, authHeader } from '../api'

const AddPackage = () => {
    const [packageData , setPackageData] = useState({name:'', location:'', duration:'', price:'', image:'', description:''});
    const changeData = (e) => {
      const {name, value}=e.target
      console.log(name,value);
      
      setPackageData({...packageData,[name]:value})
    }
    const submitHandler = (e) => {
      e.preventDefault();

      axios.post(`${API}/packages/`,packageData, authHeader())
      .then(()=>{
        alert(`New Package Added Successfully`)
      })
      .catch(err => {
        console.log(err)
        alert(`Could not add package. Please log in again and check the fields.`)
      });
    }

  return (
    <div className='container p-5'>
        <div className='shadow p-5 text-center col-lg-6 mx-auto'>
            <h3 className='fw-bold'>Add Package</h3>
            <form onSubmit={submitHandler}>
              <input type="text" name="name" onChange={changeData} placeholder='Add Package' className='form-control mb-3' />
              <input type="text" name="location"  onChange={changeData}  placeholder='Add Location' className='form-control mb-3' />
              <input type="text" name="image"  onChange={changeData}  placeholder='Add Image' className='form-control mb-3' />
              <input type="text" name="duration"  onChange={changeData}  placeholder=' Duration' className='form-control mb-3' />
              <input type="number" name="price"  onChange={changeData}  placeholder='Price' className='form-control mb-3' />
              <textarea name="description"  onChange={changeData}  placeholder='Add Description' rows={5} className='form-control mb-3'></textarea>
              <input type="submit" className='form-control mb-3 text-bg-primary'/>
            </form>
        </div>
    </div>
  )
}

export default AddPackage