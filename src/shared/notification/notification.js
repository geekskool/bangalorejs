import React from 'react'

const Notification = (props) => {
    return (
      <article className={`message ${props.modifier}`} style={style1}>
        <span class="message-header" style={style2}>
        <p>{props.message}</p>
        </span>
      </article>
    )
}

export default Notification

const style1 = {
  'margin-bottom': '0%'
}

const style2 = {
  'border-radius': '0px',
  'font-weight': '600',
  'font-size': '0.9em',
  'line-height': '1%',
  'position': 'fixed',
  'z-index': '2',
  'width': '100%'
}