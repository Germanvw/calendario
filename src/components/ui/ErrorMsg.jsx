import React from 'react'

const ErrorMsg = ({errorMsg}) => {
  return (
    <p className='bg-danger py-1 p5-3 mt-4 text-center'>
      {errorMsg}
    </p>
  )
}

export default ErrorMsg