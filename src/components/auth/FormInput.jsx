import React from 'react'

const FormInput = ( props ) => {
  const { handleChange, ...inputProps} = props
  return (
    <div className="form-group">
      <input
        {...inputProps}
        onChange={handleChange}
        className="form-control mb-3"
      />
    </div>
  )
}

export default FormInput