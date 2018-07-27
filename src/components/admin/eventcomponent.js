import React from 'react'
import {Link} from 'react-router-dom'

import Evententry from './evententry.js'

const Eventcomponent = ({events, handleEventClick}) => {
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
        {
          events
          .map(((event, i) => <Evententry event={event} 
            handleEventClick={handleEventClick} key={i} />))
        }
      </nav>
    </div>
  )}

export default Eventcomponent