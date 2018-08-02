const util = require('../model/utils')
const uuid = require('uuid/v1')

const comment = {
  saveComment: (req, res) => {
    if (req.session.admin || req.session.user) {
      let email = req.session.admin || req.session.user,
      event, index
      return util.getEvent(req.body.eventId)
      .then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return util.getUserProfile(email)})
      .then((userInfo) => {
        userInfo = JSON.parse(userInfo)
        const obj = {
          message: req.body.message,
          dateTime: Date.now(),
          commentId: uuid(),
          name: userInfo.name,
          image: userInfo.image,
          aboutme: userInfo.aboutme
        }
        event.comments.unshift(obj)
        return util.addEventToIndex(index, event)})
      .then(() => {
        res.status(201).send()})
      .catch(() => {
        res.status(500).send()})
    }
    return res.status(401).send()
  },
  deleteComment: async (req, res) => {
    if(req.session.admin || req.session.user) {
      let user = req.session.admin || req.session.user
      let response = await util.getUserProfile(user)
      let profile = await JSON.parse(response)
      console.log(profile, 'getting correct profile')
      if (req.body.name === profile.name) {
        return util.getEvent(req.body.eventId)
        .then(({selectedEvent, selectedIndex}) => {
          selectedEvent.comments = selectedEvent.comments
          .filter((comment) => comment.commentId !== req.body.commentId)
          return util.addEventToIndex(selectedIndex, selectedEvent)})
        .then(() => {
          res.status(200).send()})
        .catch(() => {
          res.status(500).send()})
      }
    }
    res.status(401).send()
  }
}

module.exports = comment
