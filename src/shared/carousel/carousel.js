import React, {Component} from 'react'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      width: 0
    }
  }

  componentDidMount () {
    this.setState({width: this.carouselContainer.children[0].offsetWidth})
  }

  handleLeftButtonClick () {
    let {selectedIndex} = this.state
    if (selectedIndex > 0) {
      selectedIndex--
    }
    this.setState({
      selectedIndex: selectedIndex
    })
  }

  handleRightButtonClick () {
    let {selectedIndex, width} = this.state

    if ((selectedIndex * width) + 
      this.carouselContainer.offsetWidth < this.props.children.length * width) {
      selectedIndex++
    }
    this.setState({
      selectedIndex: selectedIndex
    })
  }

  render () {
    const {selectedIndex, width} = this.state
    let translatex = (selectedIndex * width)
    let eventCount = this.props.children.length

    if (this.carouselContainer) {
      switch (eventCount) {
        case 1:
          translatex = (width - this.carouselContainer.offsetWidth)/2
          break
        case 2:
          translatex = (2 * width 
          - this.carouselContainer.offsetWidth)/2
          break
        case 3:
          translatex = 0
          break
      }
    }

    translatex = -translatex
    return (
      <div className='column is-12 is-paddingless container'>
        <div className='is-overlay' 
          style={{'top': '50%', 'zIndex': '1', 'right': 'initial'}}>
          <a className="carousel-nav-right" 
            onClick={() => this.handleLeftButtonClick()}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </a>
        </div>
        <div className='is-clipped'>
          <div ref={input => { this.carouselContainer = input }} 
          className='is-flex' 
            style={{transform: `translateX(${translatex}px)`, 
              'transition': 'transform 0.25s cubic-bezier(.4, 0,.2, 1)'}}>
            {this.props.children.map((item, index) =>
              <div key={index}>{item}</div>)}
          </div>
        </div>
        <div className='is-overlay' 
          style={{'height': '100%','zIndex': '1', 'left': 'initial'}} >
          <div className='is-overlay' style={{'top': '50%'}}>
            {
            <a className="carousel-nav-left" 
              onClick={() => this.handleRightButtonClick()}>
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </a>}
          </div>
        </div>
      </div>
    )
  }
}

export default Carousel
