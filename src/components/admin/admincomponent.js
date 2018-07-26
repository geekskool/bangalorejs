import React from 'react'

import Adminentry from './adminentry.js'

const Admincomponent = ({admins}) => {
  return (
      <div className='column is-one-third'>
        <nav className="panel">
          <p className="panel-heading">
            Admins
            <span className="panel-icon is-pulled-right">
              <a><i className="fa fa-plus" aria-hidden="true"></i></a>
            </span>
          </p>
          {admins.map((adminentry, i) => <Adminentry email={adminentry} key={i}/>)}
        </nav>
      </div>
  )
}

export default Admincomponent