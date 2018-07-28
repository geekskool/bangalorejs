import React from 'react'

class Adminentry extends React.Component{
  constructor () {
    super()
    this.clickDelete=this.clickDelete.bind(this)
  }
  clickDelete () {
    this.props.changeAdmin(this.props.email, 'delete')
  }
  
  render () {
    return (
        <div className="panel-block">
          <p className='control is-pulled-right'>
          {this.props.email}
          <span className="panel-icon is-pulled-right">
            <a onClick={this.clickDelete}><i className="fa fa-trash" aria-hidden="true"></i></a>
          </span>
          </p>
        </div>
    )
  }
}

export default Adminentry