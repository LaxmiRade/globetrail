import axios from 'axios'
import React, { useState } from 'react'
import { API, authHeader, errorText } from '../api'

const AddHotel = () => {
    const [hotelData , setHotelData] = useState({name:'', location:'', rating:'', price_per_night:'', image:'', description:''});
    const changeData = (e) => {
      const {name, value}=e.target

      setHotelData({...hotelData,[name]:value})
    }
    const submitHandler = (e) => {
      e.preventDefault();
      const form = e.target

      axios.post(`${API}/hotels/`, hotelData, authHeader())
      .then(()=>{
        alert(`New Hotel Added Successfully`)
        form.reset()
        setHotelData({name:'', location:'', rating:'', price_per_night:'', image:'', description:''})
      })
      .catch(err => {
        console.log(err)
        alert(errorText(err, `Could not add hotel. Please log in again and check the fields.`))
      });
    }

  return (
    <div className='container p-5'>
        <div className='shadow p-5 text-center col-lg-6 mx-auto'>
            <h3 className='fw-bold'>Add Hotel</h3>
            <form onSubmit={submitHandler}>
              <input required type="text" name="name" onChange={changeData} placeholder='Hotel Name' className='form-control mb-3' />
              <input required type="text" name="location"  onChange={changeData}  placeholder='Add Location' className='form-control mb-3' />
              <input type="text" name="image"  onChange={changeData}  placeholder='Add Image' className='form-control mb-3' />
              <input required type="number" step="0.1" min="1" max="5" name="rating"  onChange={changeData}  placeholder='Rating (1 to 5)' className='form-control mb-3' />
              <input required type="number" min="0" name="price_per_night"  onChange={changeData}  placeholder='Price per Night' className='form-control mb-3' />
              <textarea name="description"  onChange={changeData}  placeholder='Add Description' rows={5} className='form-control mb-3'></textarea>
              <input type="submit" className='form-control mb-3 text-bg-primary'/>
            </form>
        </div>
    </div>
  )
}

export default AddHotel
