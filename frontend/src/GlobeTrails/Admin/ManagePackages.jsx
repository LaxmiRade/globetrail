import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API, authHeader } from '../api'

const ManagePackages = () => {
    const [packageData , setPackageData] = useState({name:'', location:'', image:'', duration:'', price:'', description:'',})
    const [packages, setPackages]= useState([]);
    const loadPackages = () => {
        axios.get(`${API}/packages/`)
        .then((res)=>setPackages(res.data))
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        loadPackages()
    },[])

    const deletePackage=(pid) =>{
        //alert(pid)
        axios.delete(`${API}/packages/${pid}/`, authHeader())
        .then(() => {
            alert("Product Deleted Successfully")
            loadPackages()
        })
        .catch((err) => {
            console.log(err)
            alert(err.response?.data?.detail || "Could not delete package")
        })
    }

    const getOnePackage = (pid) => {
        axios.get(`${API}/packages/${pid}/`)
        .then((res) => setPackageData(res.data))
        .catch((err) => console.log(err))
    }

    const changePackageData = (e) => {
        const {name, value} = e.target
        
        setPackageData ({...packageData, [name]: value})
    }

    const updateHandler = (e) => {
        e.preventDefault();

        axios.put(`${API}/packages/${packageData.id}/`, packageData, authHeader())
        .then( () => {
            alert('Package Updated Successfully')
            loadPackages()
        })
        .catch((err) => console.log(err))
    }

  return (
    <div className='container p-5'>
        <h2>Packages : {packages.length}</h2>
        <div className="row">
            {
                packages.map((p,i) => {
                    return(
                        <div key={i} className='col-lg-3 mb-3'>
                            <div className="card  h-100">
                                <img className='w-100' src={p.image} alt="" />
                                <div className="card-body">
                                    <h5>{p.name}</h5>
                                    <p>{p.duration}</p>
                                    <p className='fw-bold'>${p.price}</p>
                                </div>
                                <div className="card-footer">
                                    <button onClick={() => getOnePackage(p.id)} data-bs-target='#update' data-bs-toggle='modal' className='btn btn-primary me-5'><i className='bi bi-pencil '></i></button>
                                    <button onClick={() => deletePackage(p.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {/* modal Starts here */}
        <div className="modal" id='update'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4>Update package</h4>
                    </div>
                    <div className="modal-body">
                         <form onSubmit={updateHandler}>
                            <input type="text" onChange={changePackageData} value={packageData.name} name="name" placeholder='Add Package' className='form-control mb-3' />
                            <input type="text" onChange={changePackageData} value={packageData.location} name="location"    placeholder='Add Location' className='form-control mb-3' />
                            <input type="text" onChange={changePackageData} value={packageData.image} name="image"    placeholder='Add Image' className='form-control mb-3' />
                            <input type="text" onChange={changePackageData} value={packageData.duration} name="duration"  placeholder=' Duration' className='form-control mb-3' />
                            <input type="number" onChange={changePackageData} value={packageData.price} name="price"  placeholder='Price' className='form-control mb-3' />
                            <textarea name="description" onChange={changePackageData} value={packageData.description} placeholder='Add Description' rows={5} className='form-control mb-3'></textarea>
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

export default ManagePackages