import React from 'react'

const Description = (props) => {
  return (
    <section className='section' 
      style={{'padding': '0rem 0.5rem 2rem 0rem'}}>
      <h2 className='title is-size-4'>Details</h2>
      <div>
        <p className='subtitle'>{props.description}</p>
      </div>
    </section>
  )
}

export default Description
