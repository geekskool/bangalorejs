import React, {Component} from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Header from '../header'
import Notification from '../../shared/notification'

import config from '../../config/index'
import http from '../../helper/http'



const Content = Loadable({
  loader: () => import('../content'),
  loading: () => (<p> Loading ....</p>)
})


const EventDetails = Loadable({
  loader: () => import('../eventDetails'),
  loading: () => (<p> Loading ....</p>)
})


const Profile = Loadable({
  loader: () => import('../profile'),
  loading: () => (<p> Loading ....</p>)
})

const Admin = Loadable({
  loader: () => import('../admin'),
  loading: () => (<p> Loading ....</p>)
})

class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedin: false,
      profile: {
        email: null,
        name: null,
        id: null,
        image: null,
        display: true,
        aboutme: null
      },
      first: false,
      redirect: [],
      yes: false,
      signinPopUp: false,
      notification: false,
      isAdmin: false
    }
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this)
    this.handleFirst = this.handleFirst.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
    this.handleYes = this.handleYes.bind(this)
    this.handleEventClick = this.handleEventClick.bind(this)
    this.handleSigninPopUp = this.handleSigninPopUp.bind(this)
  }

  handleLoginSuccess (profile) {
    let data = {
      email: profile.getEmail(),
      name: profile.getName(),
      id: profile.getId(),
      display: true,
      aboutme: '',
      image: profile.getImageUrl()
    }

    http.post(`${config.url}api/user/getuserinfo`, data)
      .then(res => res.json())
        .then(result=> {
          let {profile : profileinfo, admin} = result
          if (profileinfo === null) {
            this.setState({isLoggedin: true, profile: data, first: true, isAdmin:admin})
          } else {
            this.setState({isLoggedin: true, profile: profileinfo, first: false, isAdmin:admin})
          }
        })
        // Add a catch block
  }

  // Add login failure

  handleLogoutSuccess () {
    this.setState({isLoggedin: false,
      profile: {
        email: null,
        name: null,
        id: null,
        image: null,
        display: true,
        aboutme: null
      }
    })
  }

  handleFirst () {
    this.setState({first: false})
  }

  handleRedirect (link) {
    let array = this.state.redirect
    array.push(link)
    this.setState({redirect: array})
  }

  handleYes (bool) {
    console.log('Handle Yes ran!', bool)
    this.setState({yes: bool})
  }

  handleEventClick (history, event) {
    history.push(`/${event.id}`)
  }

  handleSigninPopUp () {
    return this.setState({signinPopUp: !this.state.signinPopUp})
  }

  render () {
    const {isLoggedin, profile, first, 
      redirect, yes, signinPopUp, notification, isAdmin} = this.state
    return (
      <HashRouter>
        <div>
          {notification 
          ? (<Notification message={'Logged in successfully'} 
            modifier='is-success'/>)
          : <div/>}

          <Header isLoggedin={isLoggedin} onLoginSuccess={this.handleLoginSuccess}
            onLogoutSuccess={this.handleLogoutSuccess} profile={profile} 
            handleFirst={this.handleFirst} first={first} 
            handleRedirect={this.handleRedirect} signinPopUp={signinPopUp} 
            handleSigninPopUp={this.handleSigninPopUp} notification={notification}/>
          <Switch>
            
            <Route exact path='/' render={props => 
              <Content {...props} first={first} 
              handleRedirect={this.handleRedirect} 
              onEventClick={this.handleEventClick.bind(null, props.history)} />} />
              
            <Route exact path='/profile' render={props => 
              <Profile {...props} profile={profile} first={first} 
              isLoggedin={isLoggedin} 
              handleFirst={this.handleFirst} handleRedirect={this.handleRedirect}
              redirect={redirect} />} />
              
            <Route path='/admin' render={props =>
              <Admin {...props} isLoggedin={isLoggedin} />} />
            
            <Route exact path='/:id' render={props => 
              <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} 
              first={first} yes={yes} isAdmin={isAdmin}
              onLoginSuccess={this.handleLoginSuccess} 
              handleFirst={this.handleFirst} handleRedirect={this.handleRedirect} 
              handleYes={this.handleYes} signinPopUp={signinPopUp} 
              handleSigninPopUp={this.handleSigninPopUp} />} />
            
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default Main
