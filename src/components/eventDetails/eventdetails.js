import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {DateTimeShort, DateTimeLong} from '../dateThumbnail'
import Title from '../eventTitle/title'
import Description from '../eventDescription/description'
import Attendees from '../eventAttendees/attendees'
import Comments from '../eventComments/comments'
import http from '../../helper/http'
import config from '../../config/index'
import PopUp from '../../shared/popup'
import GoogleOauth from '../googleOauth'
import EventConfirm from './eventconfirm'
import renderMap from './map'

class EventDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      event: false,
      showErrorMsg: false,
      showPopUp: false,
      isLocationLoaded: false,
      attending: false
    }
  }

  getEventDetails () {
    http.get(`${config.url}api/event/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(result => {
        const {isLocationLoaded} = this.state
        this.setState(
          {
            event: result.event, 
            isLocationLoaded: true, 
            attending: result.attending
          })
        if (!isLocationLoaded) { this.getLatLng() }
      })
      .catch((reject) => {
        this.setState({showErrorMsg: true})
      })
  }

  getLatLng () {
    const {address1, address2, address3, pinCode} = this.state.event
    http.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=
      ${address1},${address2},${address3},${pinCode}`)
      .then(response => response.json())
      .then(response => {
        if (response.status === 'OK') {
          renderMap(response.results[0].geometry.location)
        }
      })
  }

  componentWillMount () {
    this.getEventDetails()
  }

  componentDidUpdate () {
    if (this.props.yes && this.props.profile.email) {
      this.checkAttendee()
    }
  }

  handleEventAttending () {
    let {profile} = this.props
    if (profile.email) {
      this.handleAttendee(profile, this.state.event.id, 
        `${config.url}api/event/attendee/saveattendee`)
    }
  }

  handleYesButtonClick () {
    this.props.handleYes(true)
    let {isLoggedin, signinPopUp, first} = this.props
    if (isLoggedin && !first) {
      this.handleEventAttending()
    }
    if (!signinPopUp && !isLoggedin) {
      this.props.handleSigninPopUp()
    }
  }

  handleAttendee (profile, eventId, url, cb) {
    http.post(url, {profile, eventId})
      .then(res => {
        if (res.status === 201) {
          this.getEventDetails()
          cb()
        }
      })
  }

  handleCancelButtonClick () {
    const {profile, handleYes} = this.props
    this.handleAttendee(profile, this.state.event.id, 
      `${config.url}api/event/attendee/cancelattendee`, handleYes(false))
  }

  handleCloseClick () {
    this.props.handleYes(false)
    if (this.props.signinPopUp) {
      this.props.handleSigninPopUp()
    }
  }

  checkAttendee () {
    const {event} = this.state
    const list = event.attendees
      .filter(attendee => attendee.name === this.props.profile.name)[0]
    if (!list && this.props.profile.name 
        && this.props.yes && !this.props.first) {
      this.handleAttendee(this.props.profile, event.id, 
        `${config.url}api/event/attendee/saveattendee`, 
        this.props.handleYes(false))
    }
  }

  render () {
    const {event, attending} = this.state
    const {isLoggedin, profile, first, signinPopUp, isAdmin} = this.props
    
    if (!event) {
      return null
    }

    const isUserAttending = isLoggedin && attending
    
        // profile redirect for first-time login
    if (first) {
      this.props.handleRedirect(this.props.history.location.pathname)
      return (
        <Redirect to='/profile' />
      )
    }

    return (
      <main>
        {signinPopUp && <PopUp 
          onClose={() => this.handleCloseClick()} 
          title='Sign in'><GoogleOauth /></PopUp>}
        <div className='card'>
          <section className='level container card-content'>
            <article className='level-left'>
              <DateTimeShort date={event.dateTime} />
              <Title {...event} />
            </article>
            {isUserAttending
              ? <EventConfirm title='You are attending the event' 
                label='Cancel' onClick={() => this.handleCancelButtonClick()} />
              : <EventConfirm title='Do you want to attend the event?' 
                label='Yes' onClick={() => this.handleYesButtonClick()} />
            }
          </section>
        </div>
        <section className='hero-body has-background-light'>
          <div className='container'>
            <div className='columns'>
              <article className='column is-two-thirds'>
                <Description description={event.description} />
                <Attendees attendees={event.attendees} />
                <Comments comments={event.comments} 
                  isLoggedin={isLoggedin} eventId={event.id} isAdmin={isAdmin}
                  profile={profile} eventDetails={() => this.getEventDetails()} />
              </article>
              <article className='column'>
                <div className='message is-info'>
                  <h2 className='message-header'>Location</h2>
                  <section className='message-body'>
                    <div>{event.address1}</div>
                    <div>{event.address2}</div>
                    <div>{event.address3}</div>
                    <DateTimeLong date={event.dateTime} />
                  </section>
                  <div id='map' style={{height: '500px'}} />
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default EventDetails
