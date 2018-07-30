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
    this.toggleShowState = this.toggleShowState.bind(this)
    this.toggleConfirmState = this.toggleConfirmState.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)
    this.confirmAdd = this.confirmAdd.bind(this)
    this.addNew = this.addNew.bind(this)

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

  addNew(e) {
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
                <a onClick={this.toggleShowState}>
                {!this.state.show
                  ? <Plus />
                  : <Minus />
                }
                </a>
              </span>
            </p>
            {this.state.show 
            ? <Popup onClose={this.toggleShowState}>
              <form>
                <Input placeholder='Add new admin email' onChange={this.addNew}
                  type='email'/>
                <a className='button is-success' type= 'submit' 
                  onClick={this.confirmAdd}>
                  Add
                </a>
              </form>
            </Popup> 
            : null}
            {this.state.confirm 
            ? <Popup onClose={this.toggleConfirmState}>
                <span>Are you sure you want to delete 
                  <span className='has-text-danger has-text-weight-semibold'> 
                    {` ${this.state.email}`} 
                  </span> as an Admin ?
                </span>
              <div>
                <a className='button is-danger' 
                  onClick={this.confirmDelete}>
                  Yes I am Sure
                </a>
              </div>
            </Popup> 
            : null}
            {admins.map((adminentry, i) => 
              <Adminentry 
                email={adminentry}
                toggleConfirmState={this.toggleConfirmState} 
                key={i} />)}
          </nav>
        </div>
    )
  }
}

export default Admincomponent