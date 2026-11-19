import React, { createContext, useState } from 'react'
import Component1 from './Component1'


  //Creating Context
 export const counterData = createContext()

const MainComp = () => {
  const [count , setCount]=useState(0)
  return (
    <div className='container p-5'>
      {/* Providing Context */}
      <counterData.Provider value={[count, setCount]}>
         <h2>Counter :{count}</h2>
         <button onClick={()=> setCount(count +1)}>Add</button>
        <p>Main Component</p>
        <Component1/>
      </counterData.Provider>
     
    </div>
  )
}

export default MainComp