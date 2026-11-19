import React, { useCallback, useMemo, useState } from 'react'

const MemoExample = () => {
    const [count , setCount] = useState(0);
    const [number , setNumber] = useState(5);

    const result = useMemo(() =>{
        return mul(number)
    },[number])

    const increment= useCallback(()=>{
        setCount(count +1)
    },[count])

  return (
    <div className='container p-5'>
        <h2>Counter : {count}</h2>
        <button onClick={increment}>Increment</button>
        <h2>Result :{result}</h2>
        <button onClick={()=> setNumber(number +1)}>Increase</button>
    </div>
  )
}

const mul = (num)=>{
    console.log("Function Executed");
    
    return num * num
}

export default MemoExample