import React, {Component} from 'react'
import TextArea from '../../shared/textarea'
import Button from '../../shared/button'
import http from '../../helper/http'
import moment from 'moment'
import config from '../../config/index'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  handleInputChange (e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmitClick (e) {
    e.preventDefault()
    const {eventId, eventDetails} = this.props
    const {message} = this.state

    const obj = {message, eventId}

    http.post(`${config.url}api/event/comment`, obj)
      .then(res => {
        this.handleReset()
        eventDetails()})
      .catch(reject => this.setState({showErrorMsg: true}))
  }

  handleReset () {
    this.setState({
      message: ''
    })
  }

  handleDeleteComment (comment) {
    const {eventId, eventDetails} = this.props
    const obj = {
      commentId: comment.commentId,
      name: comment.name, 
      eventId
    }

    http.delete(`${config.url}api/event/comment`, obj)
      .then(() => eventDetails())
  }

  render () {
    const {message} = this.state
    const {isLoggedin, comments, profile} = this.props
    return (
      <section className='section'>
        <h2 className='title is-size-4'>Comments</h2>
        {isLoggedin &&
          <div className='message'>
            <TextArea placeholder='Enter comment' onChange={this.handleInputChange} value={message} />
            <Button label='Add Comment' onClick={this.handleSubmitClick} className='button is-link' disabled={message.length === 0} />
          </div>
        }
        {comments.length > 0 ? <ul>
          {comments.map((comment, index) => {
            return (
              <li className='box' key={index}>
                <div className='media'>
                  <div className='media-left'>
                    <figure className='image is-64x64'>
                      <img className='is-rounded' 
                        src={comment.image} />
                    </figure>
                  </div>
                  <div className='media-content'>
                    <h6 className='title is-size-5'>{comment.name}</h6>
                    <div className='has-text-grey-dark subtitle is-size-6'>{comment.message}</div>
                    <div>{moment(comment.dateTime).fromNow()}</div>
                  </div>
                  <div className='media-right'>
                    {isLoggedin && comment.name === profile.name &&
                    <Button onClick={this.handleDeleteComment.bind(null, comment)} className='delete is-large' />
                    }
                  </div>
                </div>
              </li>
            )
          })}
        </ul> : <article className='message is-dark has-background-white'>
          <div className='message-body'>No Comments</div>
        </article>}
      </section>
    )
  }
}

export default Comments
