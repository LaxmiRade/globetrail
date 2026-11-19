import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyshirt } from './ActionCreator'

const ShirtsContainer = () => {
    const shirts =useSelector(state => state.shirts)
    const dispatch = useDispatch()
  return (
    <div className='container p-5'>
        <h2>No Of Shirts : {shirts}</h2>
        <p>{shirts >= 5 ? "Available" : shirts === 0 ? "Out of Stock" : "Limited Stock"}</p>
        <button disabled={shirts === 0 ? true : false} onClick={() => dispatch(buyshirt())} className='btn btn-primary'>Buy Shirt</button>
    </div>
  )
}

export default ShirtsContainer