const router = require('express').Router()
const adminController = require('../controller/adminController')

// API call for admin validation
router.get('/validate', adminController.validate)

// API call for populating dashboard with events
router.get('/eventslist', adminController.getEvents)

// API call for populating dashboard with admins
router.get('/adminslist', adminController.getAdmins)

// API call for adding a new admin
router.post('/add', adminController.addAdmin)

// API call for deleting an admin
router.post('/delete', adminController.removeAdmin)

module.exports = router