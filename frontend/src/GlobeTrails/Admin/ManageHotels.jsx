import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, authHeader, errorText } from '../api'

const ManageHotels = () => {
    const [hotelData , setHotelData] = useState({name:'', location:'', rating:'', price_per_night:'', image:'', description:'', is_active:true})
    const [hotels, setHotels]= useState([]);

    const loadHotels = () => {
        // token is sent so the admin also sees hidden (inactive) hotels
        axios.get(`${API}/hotels/`, authHeader())
        .then((res)=>setHotels(res.data))
        .catch(err => {
            console.log(err)
            if (err.response?.status === 401) alert('Session expired. Please log in again.')
        })
    }

    useEffect(()=>{
        loadHotels()
    },[])

    const deleteHotel = (hid) =>{
        axios.delete(`${API}/hotels/${hid}/`, authHeader())
        .then(() => {
            alert("Hotel Deleted Successfully")
            loadHotels()
        })
        .catch((err) => {
            console.log(err)
            alert(err.response?.data?.detail || "Could not delete hotel")
        })
    }

    const changeHotelData = (e) => {
        const {name, value, type, checked} = e.target

        setHotelData({...hotelData, [name]: type === 'checkbox' ? checked : value})
    }

    const updateHandler = (e) => {
        e.preventDefault();

        axios.put(`${API}/hotels/${hotelData.id}/`, hotelData, authHeader())
        .then( () => {
            alert('Hotel Updated Successfully')
            loadHotels()
        })
        .catch((err) => {
            console.log(err)
            alert(errorText(err, 'Could not update hotel'))
        })
    }

  return (
    <div className='container p-5'>
        <h2>Hotels : {hotels.length}</h2>
        <div className="row">
            {
                hotels.map((h) => {
                    return(
                        <div key={h.id} className='col-lg-3 mb-3'>
                            <div className="card  h-100">
                                <img className='w-100' src={h.image} alt="" />
                                <div className="card-body">
                                    <h5>{h.name}</h5>
                                    <p>{h.location} · ⭐ {h.rating}</p>
                                    <p className='fw-bold'>₹{Number(h.price_per_night).toLocaleString()} / Night</p>
                                    {!h.is_active && <span className='badge bg-secondary'>Hidden</span>}
                                </div>
                                <div className="card-footer">
                                    <button onClick={() => setHotelData(h)} data-bs-target='#updateHotel' data-bs-toggle='modal' className='btn btn-primary me-5'><i className='bi bi-pencil '></i></button>
                                    <button onClick={() => deleteHotel(h.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {/* modal Starts here */}
        <div className="modal" id='updateHotel'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Update hotel</h4>
                    </div>
                    <div className="modal-body">
                         <form onSubmit={updateHandler}>
                            <input type="text" onChange={changeHotelData} value={hotelData.name} name="name" placeholder='Hotel Name' className='form-control mb-3' />
                            <input type="text" onChange={changeHotelData} value={hotelData.location} name="location"    placeholder='Add Location' className='form-control mb-3' />
                            <input type="text" onChange={changeHotelData} value={hotelData.image} name="image"    placeholder='Add Image' className='form-control mb-3' />
                            <input type="number" step="0.1" min="1" max="5" onChange={changeHotelData} value={hotelData.rating} name="rating"  placeholder='Rating (1 to 5)' className='form-control mb-3' />
                            <input type="number" min="0" onChange={changeHotelData} value={hotelData.price_per_night} name="price_per_night"  placeholder='Price per Night' className='form-control mb-3' />
                            <textarea name="description" onChange={changeHotelData} value={hotelData.description} placeholder='Add Description' rows={5} className='form-control mb-3'></textarea>
                            <div className="form-check mb-3 text-start">
                                <input type="checkbox" name="is_active" id="hotelActive" checked={!!hotelData.is_active} onChange={changeHotelData} className='form-check-input' />
                                <label htmlFor="hotelActive" className='form-check-label'>Show on website</label>
                            </div>
                            <input type="submit" data-bs-dismiss='modal' className='form-control mb-3 text-bg-primary'/>
                         </form>     
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
        {/* modal ends here */}

    </div>
  )
}

export default ManageHotels
