import React from 'react'
import {Link} from 'react-router-dom'

import Evententry from './evententry.js'

const Eventcomponent = ({events}) => {
  console.log(events, 'printing events passed')
  return (
    <div className='column is-two-thirds'>
      <nav className="panel">
        <p className="panel-heading">
          Events
          <span className="panel-icon is-pulled-right">
            <Link to='/admin/create'>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
          </span>
        </p>
        <Evententry />
      </nav>
    </div>
  )}

export default Eventcomponent