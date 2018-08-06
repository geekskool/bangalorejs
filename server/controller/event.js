const uuid = require('uuid/v1')
const util = require('../model/utils')

const event = {
  create: (req, res) => {
    console.log(req.session.admin, 'is Admin')
    if (req.session.admin) {
      const data = Object.assign(req.file, {destination: '/images/', name: req.file.filename})
      const obj = Object.assign({}, req.body, {id: uuid(), image: data, attendees: [], comments: []})
      return util.createEvent(obj)
      .then(() => res.json(obj))
    }
    return res.status(401).send()
  },

  edit: (req, res) => {
    if (req.session.admin) {
      return util.getEvent(req.body.id)
      .then(({selectedEvent, selectedIndex}) => {
        let image = selectedEvent.image
        if (req.file) {
          image = Object.assign(req.file, {
            destination: '/images/', 
            name: req.file.filename
          })
        }
        const event = Object.assign(selectedEvent, req.body, {image})
        return util.addEventToIndex(selectedIndex, event)})
      .then(() => res.json({id: req.body.id}))
    }
    return res.status(401).send()
  },

  eventList: (req, res) => {
    return util.getAllEvent()
    .then(eventsArray => {
      return res.json(eventsArray.map(e => JSON.parse(e)))})
    },

  eventDetails: (req, res) => {
    return util.getAllEvent()
    .then((events) => {
      const obj = events
      .filter((event) => {
        const eventObj = JSON.parse(event)
        return eventObj.id === req.params.id})
      .map((value) => JSON.parse(value))
      res.json(obj)})
  }
}

module.exports = event
