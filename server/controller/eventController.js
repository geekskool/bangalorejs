const uuid = require('uuid/v1')
const eventModel = require('../model/eventModel')

const event = {
  create: (req, res) => {
    if (req.session.admin) {
      const data = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
      const obj = Object.assign({}, req.body, {id: uuid(), image: data, attendees: [], comments: []})
      return eventModel.createEvent(obj)
      .then(() => res.json(obj))
    }
    return res.status(401).send()
  },

  edit: (req, res) => {
    if (req.session.admin) {
      return eventModel.getEvent(req.body.id)
      .then(({selectedEvent, selectedIndex}) => {
        let image = selectedEvent.image
        if (req.file) {
          image = Object.assign(req.file, {
            destination: '/images/', 
            name: req.file.filename
          })
        }
        const event = Object.assign(selectedEvent, req.body, {image})
        return eventModel.addEventToIndex(selectedIndex, event)})
      .then(() => res.json({id: req.body.id}))
    }
    return res.status(401).send()
  },

  eventList: (req, res) => {
    return eventModel.getAllEvents()
    .then(eventsArray => {
      return res.json(eventsArray.map(e => JSON.parse(e)))})
    },

  eventDetails: (req, res) => {
    const email = req.session.user || req.session.admin
    let attending = false
    return eventModel.getAllEvents()
    .then(events => {
      let obj = events
      .filter(event => JSON.parse(event).id === req.params.id)
      .map(value => JSON.parse(value))[0]
      if (email) {
        if (obj.attendees.filter(user => user.email === email)[0]) {
          attending = true
        }
      }
      obj.attendees = obj.attendees.map(userInfo => {
        return {
          name: userInfo.name, image: userInfo.image, 
          aboutme:userInfo.aboutme
        }
      })
      res.json({event: obj, attending})})
  }
}

module.exports = event
