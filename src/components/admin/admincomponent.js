import React from 'react'

import Adminentry from './adminentry.js'
import Popup from '../../shared/popup'

class Admincomponent extends React.Component{
  constructor(){
    super()
    this.state = {
      show: false
    }
    this.toggleState = this.toggleState.bind(this)
  }

  toggleState () {
    this.setState({show: !this.state.show})
  }

  render () {
    const {admins, changeAdmin} = this.props  
  return (
        <div className='column is-one-third'>
          <nav className="panel">
            <p className="panel-heading">
              Admins
              <span className="panel-icon is-pulled-right">
                <a onClick={this.toggleState}>
                {!this.state.show
                  ? <i className="fa fa-plus" aria-hidden="true" />
                  : <i className="fas fa-minus" aria-hidden="true" />
                }
                </a>
              </span>
            </p>
            {this.state.show ? <Popup onClose={this.toggleState}/> : null}
            {admins.map((adminentry, i) => 
              <Adminentry 
                email={adminentry}
                changeAdmin={changeAdmin} 
                key={i} />)}
          </nav>
        </div>
    )
  }
}

export default Admincomponent