import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import DashBoard from './dashboard'
import EventForm from '../eventForm'
import config from '../../config/index'
import http from '../../helper/http'

class Admin extends Component {
  constructor () {
    super()
    this.state = {
      event: false,
      isAuthenticated: false
    }
  }

  componentWillMount () {
    console.log('Will Mount Admin')
    http.get(`${config.url}api/admin/validate`)
      .then(response => {
        if (response.status === 200) {
          this.setState({isAuthenticated: true})
          this.props.history.push('/admin/dashboard')
        }
        else {
          if (response.status === 403) {
            if (this.state.isAuthenticated) {
              this.setState({isAuthenticated: false})
            }
            if (this.props.location.pathname !== '/admin') {
              this.props.history.push('/admin')
            }
          }
        }
      })
  }

  componentWillUpdate () {
    console.log('Did Mount Admin')
    http.get(`${config.url}api/admin/validate`)
      .then(response => {
        if (response.status === 200) {
          if (!this.state.isAuthenticated) {
            this.setState({isAuthenticated: true})
          }
          if (this.props.location.pathname === '/admin') {
            this.props.history.push('/admin/dashboard')
          }
        }
        else {
          this.props.history.push('/')
        }
      })
  }

  handleEventClick (event) {
    this.setState({event})
    this.props.history.push('/admin/eventedit')
  }

  render () {
    const {event, isAuthenticated} = this.state
    const {isLoggedin} = this.props
    return (
      <div>
        {isAuthenticated
          ? <div>
              <Route exact path='/admin/dashboard' 
                render={props => 
                <DashBoard {... props} 
                handleEventClick={event => this.handleEventClick(event)} 
                isLoggedin={isLoggedin} />} />

              <Route exact path='/admin/eventcreate' component={EventForm} />
              
              <Route exact path='/admin/eventedit' 
                render={props => <EventForm {...event} {...props} isEditMode />} />
            </div>
          : <h2> Please login as admin</h2>
        }
      </div>
    )
  }
}

export default Admin
