const router = require('express').Router()

const commentController = require('../controller/commentController')

//  API call to save a comment for a particular event
router.post('/savecomment', commentController.saveComment)

//  API call to delete a comment for a particular event
router.delete('/deletecomment', commentController.deleteComment)

module.exports = router