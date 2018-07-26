import React from 'react'

import http from '../../helper/http.js'

import Eventcomponent from './eventcomponent'
import Admincomponent from './admincomponent'

class DashBoard extends React.Component{
  constructor () {
    super()
    this.state={
      events:[],
      admins: []
    }
    super()
  }
  componentWillMount () {
    http.get('/api/admin/events')
    .then(res => res.json())
    .then(result => this.setState({events: result}))
    http.get('/api/admin/adminslist')
    .then(res => res.json())
    .then(result => this.setState({admins: result}))
  }
  render () {
  console.log(this.props, 'Dashboard props')
  const {events, admins} = this.state
    return (
      <div className='section'>
        <div className='container'>
          <div className='columns'>
            <Eventcomponent events={events} />
            <Admincomponent admins={admins} />
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoard
