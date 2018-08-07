import React from 'react'
import moment from 'moment'

import Edit from 'react-svg-loader!../../../public/fonts/edit-solid.svg'
import User from 'react-svg-loader!../../../public/fonts/user-solid.svg'

const Evententry = ({event, handleEventClick}) => {
  let formattedDate = moment(event.dateTime).format("DD MMM YYYY")
  return (
    <div className="panel-block">
      <div className='control'>
        <span className="tag is-small is-pulled-left">
          {formattedDate}
        </span>
        <p className='is-wrapped is-inline-block' style={{'maxWidth': '80%'}}>
          {event.title}
        </p>
        <p className="panel-icon is-pulled-right">
          <a onClick={() => handleEventClick(event)}><Edit/></a>
        </p>
        <p className="panel-icon is-pulled-right">
          {event.attendees.length}
        </p>
        <p className="panel-icon is-pulled-right">
          <User/>
        </p>
      </div>
    </div>)
  }

export default Evententry