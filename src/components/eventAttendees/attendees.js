import React from 'react'

const Attendees = ({attendees}) => {
  return (
    <section className='section' 
      style={{'padding': '0rem 0.5rem 2rem 0rem'}}>
      <h2 className='title is-size-4'>Attendees</h2>
      {attendees && attendees.length
        ? [...Array(Math.ceil(attendees.length/10))]
          .map((_, i)=> i+1)
            .map(k =>
              <div key= {k}>
                <ul className='media'>
                  {attendees.slice(k-1, k*10)
                    .map((value, index) => {
                      return (
                        <li key={(k-1)*10 + index}>
                          <figure 
                            className='image is-64x64 tooltip is-tooltip-bottom' 
                            data-tooltip={value.name}>
                            <img className='is-rounded'
                              src={value.image} />
                          </figure>
                        </li>
                      )
                  })}
                </ul>
              </div>)
        : <article className='message is-dark has-background-white'>
          <div className='message-body'>No Attendees</div>
        </article>
      }
    </section>
  )
}

export default Attendees
