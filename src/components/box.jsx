import React from 'react'

const Box = ({props}) => {
  return (
    <div className=' w-full max-w-7xl mx-auto px-4'>
        {props.children}
    </div>
  )
}

export default Box
