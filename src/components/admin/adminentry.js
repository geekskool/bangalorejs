import React from 'react'

import Trash from 'react-svg-loader!../../../public/fonts/trash-solid.svg'

class Adminentry extends React.Component{
  constructor () {
    super()
    this.clickDelete=this.clickDelete.bind(this)
  }
  clickDelete () {
    this.props.toggleConfirmState(this.props.email)
  }
  
  render () {
    return (
        <div className="panel-block">
          <p className='control is-pulled-right'>
          {this.props.email}
          <span className="panel-icon is-pulled-right">
            <a onClick={this.clickDelete}><Trash /></a>
          </span>
          </p>
        </div>
    )
  }
}

export default Adminentry