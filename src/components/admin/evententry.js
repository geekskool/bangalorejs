import React from 'react'
import moment from 'moment'

const Evententry = ({event, handleEventClick}) => {
  console.log(handleEventClick, 'evententry')
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
          <a onClick={() => handleEventClick(event)}><i className="far fa-edit" aria-hidden="true"></i></a>
        </p>
        <p className="panel-icon is-pulled-right">
          {event.attendees.length}
        </p>
        <p className="panel-icon is-pulled-right">
          <i className="fa fa-user" aria-hidden="true"></i>
        </p>
      </div>
    </div>)
  }

export default Evententry