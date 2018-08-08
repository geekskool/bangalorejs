const eventModel = require('../model/eventModel')

const attendee = {
  saveAttendee: (req, res) => {
    let email = req.session.admin || req.session.user
    if (req.session.admin || req.session.user) {
      let event, index
      return eventModel.getEvent(req.body.eventId)
      .then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return req.body.profile})
      .then(userInfo => {
        const attendee = event.attendees
          .filter(attendee => attendee.email === email)[0]
        if (attendee) {
          return
        }
        event.attendees.push({
          name : userInfo.name,
          image: userInfo.image,
          aboutme: userInfo.aboutme,
          email
        })
        return eventModel.addEventToIndex(index, event)})
      .then(() => res.status(201).send())
      .catch(() => res.status(500).send())
    }
    return res.status(401).send()
  },

  deleteAttendee: (req, res) => {
    let email = req.session.admin || req.session.user
    if (email) {
      return eventModel.getEvent(req.body.eventId)
        .then(({selectedEvent, selectedIndex}) => {
          selectedEvent.attendees = selectedEvent.attendees
          .filter(attendee =>  attendee.email !== email)
        return eventModel.addEventToIndex(selectedIndex, selectedEvent)})
      .then(() => res.status(201).end())
      .catch(() => res.status(500).send())
      }
    return req.status.send(401)
  }
}

module.exports = attendee
