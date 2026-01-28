import React from 'react'

const Box = ({children}) => {
  return (
    <div className='min-w-screen mx-auto px-4 rounded-3xl'>
        {children}
    </div>
  )
}

export default Box
