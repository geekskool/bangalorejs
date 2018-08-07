const router = require('express').Router()

const attendeeController = require('../controller/attendeeController')

//  API call to save an attendee for a particular event
router.post('/saveattendee', attendeeController.saveAttendee)

//  API call to remove an attendee for a particular event
router.post('/cancelattendee', attendeeController.deleteAttendee)

module.exports = router