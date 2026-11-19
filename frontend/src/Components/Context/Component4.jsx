import React, { useContext } from 'react'
import { counterData } from './MainComp'

const Component4 = () => {
    const [count, setCount] = useContext(counterData);
  return (
    <div>
        <h2>Counter : {count}</h2>
        <button onClick={()=> setCount(count + 1)}>Add</button>
        <p>Component4</p>
    </div>
  )
}

export default Component4