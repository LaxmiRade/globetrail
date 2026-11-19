import React, { useEffect, useRef } from 'react'

const RefExample = () => {
    const qtyRef = useRef()

    const increment = () =>{
        qtyRef.current.value++;
        qtyRef.current.focus();
    } 

    useEffect(() =>{
        alert('rendered')
    })
  return (
    <div className='container p-5'>
        <input type="text" ref={qtyRef} placeholder='No of Items' />
        <button onClick={increment}>+</button>
    </div>
  )
}

export default RefExample