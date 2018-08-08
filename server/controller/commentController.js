const eventModel = require('../model/eventModel')
const userModel = require('../model/userModel')
const uuid = require('uuid/v1')

const comment = {
  saveComment: (req, res) => {
    if (req.session.admin || req.session.user) {
      let email = req.session.admin || req.session.user,
      event, index
      return eventModel.getEvent(req.body.eventId)
      .then(({selectedEvent, selectedIndex}) => {
        event = selectedEvent
        index = selectedIndex
        return userModel.getUserProfile(email)})
      .then(userInfo => {
        userInfo = JSON.parse(userInfo)
        const obj = {
          message: req.body.message,
          dateTime: Date.now(),
          commentId: uuid(),
          name: userInfo.name,
          image: userInfo.image,
          aboutme: userInfo.aboutme,
          id : userInfo.id
        }
        event.comments.unshift(obj)
        return eventModel.addEventToIndex(index, event)})
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
      let response = await userModel.getUserProfile(user)
      let profile = await JSON.parse(response)
      if (req.body.id === profile.id || req.session.admin) {
        return eventModel.getEvent(req.body.eventId)
        .then(({selectedEvent, selectedIndex}) => {
          selectedEvent.comments = selectedEvent.comments
          .filter(comment => comment.commentId !== req.body.commentId)
          return eventModel.addEventToIndex(selectedIndex, selectedEvent)})
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
