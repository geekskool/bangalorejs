const express = require('express')
const bodyParser = require('body-parser')

// const redis = require('redis')
const client = require('./model/redis').client

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const fs = require('fs')
const multer = require('multer')

const user = require('./controller/user')
const event = require('./controller/event')
const attendee = require('./controller/attendee')
const comment = require('./controller/comment')
const admin = require('./controller/admin')

const app = express()
const PORT = process.env.PORT || 3000
const UPLOAD_DIR = './public/images'

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

app.use(session({
  secret: 'ssshhhhh',
  store: new RedisStore({client:client , ttl: 260}),
  saveUninitialized: false,
  resave: false
}))

let morgan
if (process.env.NODE_ENV === 'development') {
  morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

// API call for admin validation
app.get('/api/admin/validate', admin.validate)

// API call for populating dashboard with events
app.get('/api/admin/events', admin.getEvents)

// API call for populating dashboard with Admins
app.get('/api/admin/adminslist', admin.getAdmins)

// API call for adding an admin
app.post('/api/admin/add', admin.addAdmin)

// API call for deleting an admin
app.post('/api/admin/rem', admin.removeAdmin)

// API call to get list of events
app.get('/api/event', event.eventList)

// API call to create an event
app.post('/api/event', upload.single('file'), event.create)

// API call to edit an event
app.put('/api/event', upload.single('file'), event.edit)

//  API call to get details of a particular event
app.get('/api/event/:id', event.eventDetails)

//  API call to save an attendee for a particular event
app.post('/api/event/attendee', attendee.saveAttendee)

//  API call to remove an attendee for a particular event
app.post('/api/event/attendee/cancel', attendee.deleteAttendee)

//  API call to save a comment for a particular event
app.post('/api/event/comment', comment.saveComment)

//  API call to delete a comment for a particular event
app.delete('/api/event/comment', comment.deleteComment)

// API call for getting user details
app.post('/api/user/get', user.getUserInfo)

app.post('/api/user/auth', user.auth)

// API call for saving user details
app.post('/api/user/save', user.save)

// API call for user logout
app.delete('/api/user/logout', user.logout)

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
