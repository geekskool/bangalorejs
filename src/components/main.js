import React, {Component} from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Header from './header'
import Notification from './../shared/notification'

import config from './../config/index'
import http from './../helper/http'

const Content = Loadable({
  loader: () => import('./content'),
  loading: () => (<p> Loading ....</p>)
})


const EventDetails = Loadable({
  loader: () => import('./eventDetails'),
  loading: () => (<p> Loading ....</p>)
})


const Profile = Loadable({
  loader: () => import('./profile'),
  loading: () => (<p> Loading ....</p>)
})

const Admin = Loadable({
  loader: () => import('./admin'),
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
    console.log(link)
    let array = this.state.redirect
    array.push(link)
    this.setState({redirect: array})
  }

  handleYes (bool) {
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

          <Header isLoggedin={isLoggedin} profile={profile} first={first} 
            signinPopUp={signinPopUp} notification={notification}
            onLoginSuccess={profile => this.handleLoginSuccess(profile)}
            onLogoutSuccess={() => this.handleLogoutSuccess()}  
            handleFirst={() => this.handleFirst()}  
            handleRedirect={url => this.handleRedirect(url)}
            handleSigninPopUp={()=> this.handleSigninPopUp()} />
          <Switch>
            
            <Route exact path='/' render={props => 
              <Content {...props} first={first} 
              handleRedirect={url => this.handleRedirect(url)} 
              onEventClick={this.handleEventClick.bind(null, props.history)} />} />
              
            <Route exact path='/profile' render={props => 
              <Profile {...props} profile={profile} first={first} 
              isLoggedin={isLoggedin} redirect={redirect}
              handleFirst={() => this.handleFirst()}  
              handleRedirect={url => this.handleRedirect(url)} />} />
              
            <Route path='/admin' render={props =>
              <Admin {...props} isLoggedin={isLoggedin} />} />
            
            <Route exact path='/:id' render={props => 
              <EventDetails {...props} isLoggedin={isLoggedin} profile={profile} 
              first={first} yes={yes} isAdmin={isAdmin}
              onLoginSuccess={profile => this.handleLoginSuccess(profile)} 
              handleFirst={bool => this.handleFirst(bool)} 
              handleRedirect={url => this.handleRedirect(url)} 
              handleYes={(bool) => this.handleYes(bool)} signinPopUp={signinPopUp} 
              handleSigninPopUp={() => this.handleSigninPopUp()} />} />
            
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default Main
