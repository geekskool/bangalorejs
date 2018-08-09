import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import config from '../config/index'
import http from '../helper/http'

import GoogleOauth from './googleOauth'
import Logout from './logout'

class Header extends Component {

  loadScript () { // this is needed to run init() when this script has loaded
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/client:platform.js'
    script.onload = this.init
    script.id = 'google-login'
    document.head.appendChild(script)
  }

  componentWillMount () {
    this.loadScript()
  }

  init = () => {
    window.gapi.load('auth2', () => {
      const auth = window.gapi.auth2.getAuthInstance()
      auth.isSignedIn.listen(isLoggedIn => {
        const profile = auth.currentUser.get().getBasicProfile()
        if (isLoggedIn) {
          http.post(`${config.url}api/user/auth`,
            {
              access_token: auth.currentUser.get().Zi.access_token,
              email: profile.getEmail()
            })
            .then(res => res.json())
            .then(result => {
              if (result.statusCode !== 401) {
                if (this.props.signinPopUp) {
                  this.props.handleSigninPopUp()
                }
                return this.props.onLoginSuccess(profile)
              }
              return auth.disconnect()
            })
        }
      })
    })
  }

  render () {
    const {isLoggedin, onLogoutSuccess, profile, handleFirst, first, 
      handleRedirect, notification} = this.props
    return (
      <div className='navbar has-background-light' 
        style={notification ? {'padding-top': '1%'}: null} >
        <div className='container' style={{'minHeight': '4rem'}}>
          <div className='navbar-brand'>
            <Link to='/' 
              onClick={() => handleRedirect(window.location.pathname)}
              className='navbar-item'>
              <h2 className='title'>Bangalore 
                <span className='has-background-warning' 
                  style={{'padding': '0.1rem 0.3rem'}}>JS</span>
              </h2>
            </Link>
            </div>
            <div className='navbar-menu' style={{'marginLeft': '20%'}}>
              <div className='navbar-end'>
              {(!isLoggedin) 
                ? <div className='navbar-item'><GoogleOauth /></div>
                : (
                  <div className='field is-grouped'>
                    <figure className='image is-48x48 tooltip is-tooltip-bottom' 
                      data-tooltip={`Hello ${profile.name}`} 
                      style={{'margin':'auto'}}>
                      <img className='is-rounded' 
                        src={profile ? profile.image: null} />
                    </figure>
                    <div className='navbar-item has-dropdown is-hoverable'>
                      <div className='column'>
                        <i className="fas fa-caret-down"></i>
                      </div>
                      <div className="navbar-dropdown is-right">
                        <Link className="navbar-item" to="/profile" 
                          onClick={() => handleRedirect('/')}>
                          Profile
                        </Link>
                        <Logout handleFirst={handleFirst} first={first} 
                          onLogoutSuccess={onLogoutSuccess}/>
                      </div>
                    </div>
                  </div>)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
