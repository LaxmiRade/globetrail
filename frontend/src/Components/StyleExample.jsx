import React from 'react'
import "./style.css"

const StyleExample = () => {
    const myStyles ={
        color:"green",
    }

  return (
    <div>
        <h2 style={{color:"red"}}>Inline Style</h2>
        <h2 style={myStyles}>Internal Style</h2>
        <h2 className='danger'>External Style</h2>
    </div>

)
}

export default StyleExample