import React from 'react'
const Input = props => {
  const {label, isHorizontal, ...attributes} = props
  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <input className='input' {...attributes} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Input
