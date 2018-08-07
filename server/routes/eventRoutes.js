const router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const eventController = require('../controller/eventController')

const UPLOAD_DIR = path.join(__dirname, '../../public/images')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, UPLOAD_DIR)
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + '_' + file.originalname)
    }
  })
  
  const checkUploadPath = () => {
    fs.stat(UPLOAD_DIR, (err) => {
      if (err) {
        fs.mkdir(UPLOAD_DIR, () => {})
      }
    })
  }
  
checkUploadPath()
  
const upload = multer({ storage })

// API call to get list of events
router.get('/getevents', eventController.eventList)

// API call to create an event
router.post('/eventcreate', upload.single('file'), eventController.create)

// API call to edit an event
router.put('/eventedit', upload.single('file'), eventController.edit)

//  API call to get details of a particular event
router.get('/:id', eventController.eventDetails)

module.exports = router