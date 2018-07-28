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
    
    this.getEvents = this.getEvents.bind(this)
    this.getAdmins = this.getAdmins.bind(this)
    this.changeAdmin = this.changeAdmin.bind(this)
  }

  getEvents () {
    http.get('/api/admin/events')
    .then(res => res.json())
    .then(result => this.setState({events: [...this.state.events, ...result]}))
  }

  getAdmins () {
    http.get('/api/admin/adminslist')
    .then(res => res.json())
    .then(result => {
      console.log('setting state')
      this.setState({admins: [ ...result]})})
  }

  changeAdmin (value, operation) {
    if (operation === 'delete') {
      http.post('/api/admin/rem', {email: value})
      .then(res => {
        if (res.status === 406) {
          return Promise.reject(res.status)
        }
        if (res.status === 401) {
          return Promise.reject(res.status)
        }
        return res.json()
      })
      .then(result => {
        console.log(typeof result, result)
        if (result) {
          console.log('this happened', this)
          this.getAdmins()
        }
      })
      .catch(err => {
        if (err === 401){
          return this.props.history.push('/')
        }
        return console.log(err, 'Nothing happend')
      })

      // API call for deleting an admin
    }
    // if (operation === 'add') {
    //   // add api 2 means success and 'Admin already in db' means
    //   http.post('/api/admin/add', {email: value})
    //   .then(response =>)
    // }
  }

  componentWillMount () {
    this.getEvents()
    this.getAdmins()
  }

  // componentWillUpdate () {
  //   this.getEvents()
  //   this.getAdmins()
  // }

  render () {
  console.log(this.props, 'Dashboard props')
  console.log(this.state, 'Dashboard state')

  const {events, admins} = this.state
    return (
        <div className='section'>
          <div className='container'>
            <div className='columns'>
              
              <Eventcomponent events={events} 
                handleEventClick={this.props.handleEventClick} 
                getEvents={this.getEvents} />

              <Admincomponent admins={admins} changeAdmin={this.changeAdmin} />
            
            </div>
          </div>
        </div>
      )
  }
}

export default DashBoard
