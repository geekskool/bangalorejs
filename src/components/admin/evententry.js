import React from 'react'

const Evententry = (onEventClick) => {
return (<div className="panel-block">
              <div className='control'>
                <span className="tag is-small is-pulled-left">
                5 Aug 2018
                </span>
                <p className='is-wrapped is-inline-block' style={{'width': '84%'}}>
                bulma is the best framework for creating beautiful websites so that I can fill the element with garbage text like this
                </p>
                <span className="panel-icon is-pulled-right">
                  <a><i className="far fa-edit" aria-hidden="true"></i></a>
                </span>
              </div>
            </div>)
            }

export default Evententry