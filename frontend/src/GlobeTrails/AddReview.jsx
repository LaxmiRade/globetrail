import React, { useState } from 'react'

const AddReview = () => {
    const [review , setReview] = useState({giveReview:'', rating:''})
  return (
    <div className='container'>
        <h5>Add Review</h5>
      <textarea name="givereview" placeholder='Add Review' className='form-control'></textarea>
    </div>
  )
}

export default AddReview