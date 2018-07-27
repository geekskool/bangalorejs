import React from 'react'

import http from '../../helper/http.js'

import Eventcomponent from './eventcomponent'
import Admincomponent from './admincomponent'

class DashBoard extends React.Component{
  constructor () {
    super()
    this.state={
      events:[],
      admins: [],
      failed: '',
      loading: true
    }
    super()
  }
  componentWillMount () {
    console.log('dashboard componentWillMount')
    http.get('/api/admin/events')
    .then(res => res.json())
    .then(result => this.setState({
      events: result,
      loading: false
    }))
    .catch(err => {
      this.setState({
        failed: toString(err)
      })
      setTimeout(() => {
        this.props.history.push('/')
      }, 3000)
    })

    http.get('/api/admin/adminslist')
    .then(res => res.json())
    .then(result => this.setState({
      admins: result,
      loading: false
    }))
    .catch(err => {
      if (!this.state.failed) {
        this.setState({
          failed: toString(err)
        })
        setTimeout(() => {
          this.props.history.push('/')
        }, 3000)
      }
    })
  }

  // componentDidUpdate () {
  //   console.log('dashboard componentDidUpdate')
  //   http.get('/api/admin/validate')
  //   .then(respose => {
  //     if (Response.status === 403) {
  //       console.log('dashboard update ran')
  //       this.props.history.push('/admin')
  //     }
  //   })
  // }

  render () {
  console.log(this.props, 'Dashboard props')
  const {events, admins, failed, loading} = this.state
    if (failed || loading){ 
      return (<h1>{failed || loading}</h1>)
    }
    return (
        <div className='section'>
          <div className='container'>
            <div className='columns'>
              <Eventcomponent events={events} handleEventClick={this.props.handleEventClick} />
              <Admincomponent admins={admins} />
            </div>
          </div>
        </div>
      )
  }
}

export default DashBoard
