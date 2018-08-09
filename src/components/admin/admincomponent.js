import React from 'react'

import Adminentry from './adminentry.js'
import Popup from '../../shared/popup'
import Input from '../../shared/input'
import Plus from 'react-svg-loader!../../../public/fonts/plus-solid.svg'
import Minus from 'react-svg-loader!../../../public/fonts/minus-solid.svg'

class Admincomponent extends React.Component{
  constructor(){
    super()
    this.state = {
      show: false,
      confirm: false,
      email: ''
    }
  }

  toggleShowState (value='') {
    this.setState({show: !this.state.show,
    email : value})
  }

  toggleConfirmState (value='') {
    this.setState({confirm: !this.state.confirm,
    email: value})
  }

  confirmDelete () {
    this.props.changeAdmin(this.state.email, 'delete')
    this.toggleConfirmState()
  }

  confirmAdd () {
    this.props.changeAdmin(this.state.email, 'add')
    this.toggleShowState()
  }

  addNew = (e) => {
    e.preventDefault()
    this.setState({email: e.target.value})
  }

  render () {
    const {admins} = this.props 
  return (
        <div className='column is-one-third'>
          <nav className="panel">
            <p className="panel-heading">
              Admins
              <span className="panel-icon is-pulled-right">
                <a onClick={value => this.toggleShowState(value)}>
                {!this.state.show
                  ? <Plus />
                  : <Minus />
                }
                </a>
              </span>
            </p>
            {this.state.show 
            ? <Popup onClose={value => this.toggleShowState(value)}>
                <form>
                  <div className='control'>
                    <Input placeholder='Add new admin email' 
                    onChange={this.addNew} type='email' autoFocus/>
                  </div>
                  <div className='field is-grouped' style={{'margin-top': '4%'}}>
                    <div className='control'>
                      <a className='button is-success' type= 'submit' 
                        onClick={() => this.confirmAdd()}>
                        Add
                      </a>
                    </div>
                  </div>
              </form>
            </Popup> 
            : null}
            {this.state.confirm 
            ? (<Popup onClose={value => this.toggleConfirmState(value)}>
                <div classsName='field'>
                  <span>Are you sure you want to delete 
                    <span className='has-text-danger has-text-weight-semibold'> 
                      {` ${this.state.email}`} 
                    </span> as an Admin ?
                  </span>
                </div>
                <div className='field is-grouped' style={{'margin-top': '4%'}}>
                  <div className='control'>
                    <a className='button is-danger' 
                      onClick={() => this.confirmDelete()}>
                      Yes I am Sure
                    </a>
                  </div>
                </div>
            </Popup>)
            : null}
            {admins.map((adminentry, i) => 
              <Adminentry 
                email={adminentry}
                toggleConfirmState={value => this.toggleConfirmState(value)} 
                key={i} />)}
          </nav>
        </div>
    )
  }
}

export default Admincomponent