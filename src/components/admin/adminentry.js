import React from 'react'

const Adminentry = ({email}) => {
  return (
      <div className="panel-block">
        <p className='control is-pulled-right'>
        {email}
        <span className="panel-icon is-pulled-right">
          <a><i className="fa fa-trash" aria-hidden="true"></i></a>
        </span>
        </p>
      </div>
  )
}

export default Adminentry