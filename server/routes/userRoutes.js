const router = require('express').Router()
const userController = require('../controller/userController')

// API call for getting user details
router.post('/getuserinfo', userController.getUserInfo)

router.post('/auth', userController.auth)

// API call for saving user details
router.post('/save', userController.save)

// API call for user logout
router.delete('/logout', userController.logout)

module.exports = router