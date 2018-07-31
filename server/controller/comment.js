const util = require('../model/utils')
const uuid = require('uuid/v1')

const comment = {
  saveComment: (req, res) => {
    if (req.session.admin || req.session.user) {
      let event, index
      return util.getEvent(req.body.eventId)
      .then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return util.getUserProfile(req.body.email)})
      .then((userInfo) => {
        userInfo = JSON.parse(userInfo)
        const obj = {
          message: req.body.message,
          dateTime: Date.now(),
          commentId: uuid(),
          ...userInfo
        }
        event.comments.unshift(obj)
        return util.addEventToIndex(index, event)})
      .then(() => {
        res.status(201).send()})
      .catch(() => {
        res.status(500).send()})
    }
    return res.status(406).send()
  },
  deleteComment: (req, res) => {
    if(req.session.admin || req.session.user) {
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
    res.status(406).send()
  }
}

module.exports = comment
