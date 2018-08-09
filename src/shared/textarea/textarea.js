import React from 'react'

const TextArea = props => {
  const {label, isHorizontal, ...attributes} = props
  return (
    <div className='field'>
      <label className='label'>{props.label}</label>
      <div className='field-body'>
        <div className='field'>
          <div className='control'>
            <textarea className='textarea' {...attributes} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextArea
