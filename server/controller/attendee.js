const util = require('../model/utils')

const attendee = {
  saveAttendee: (req, res) => {
    if (req.session.admin || req.session.user) {
      let event, index
      return util.getEvent(req.body.eventId)
      .then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return req.body.profile})
      .then(userInfo => {
        const attendee = event.attendees
          .filter(attendee => attendee.name === userInfo.name)[0]
        if (attendee) {
          return
        }
        event.attendees.push({
          name : userInfo.name,
          image: userInfo.image,
          aboutme: userInfo.aboutme
        })
        return util.addEventToIndex(index, event)})
      .then(() => res.status(201).send())
      .catch(() => res.status(500).send())
    }
    return res.status(401).send()
  },

  deleteAttendee: (req, res) => {
    let email = req.session.admin || req.session.user
    if (email) {
      return util.getEvent(req.body.eventId)
        .then(({selectedEvent, selectedIndex}) => {
          selectedEvent.attendees = selectedEvent.attendees
          .filter(attendee => { 
            util.getUserProfile(email)
              .then(userInfo => attendee.name !== userInfo.name)})
        return util.addEventToIndex(selectedIndex, selectedEvent)})
      .then(() => res.status(201).end())
      .catch(() => res.status(500).send())
      }
    return req.status.send(401)
  }
}

module.exports = attendee
