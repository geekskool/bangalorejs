const express = require('express')
const bodyParser = require('body-parser')

const client = require('./model/redis').client

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const compression = require('compression')

const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const attendee = require('./controller/attendee')
const comment = require('./controller/comment')
const adminRoutes = require('./routes/adminRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(session({
  secret: 'ssshhhhh',
  store: new RedisStore({client:client , ttl: 260}),
  saveUninitialized: false,
  resave: false
}))


if (process.env.NODE_ENV === 'development') {
  morgan = require('morgan')
  app.use(morgan('dev'))
}

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(express.static('public/js'))


app.use('/api/admin', adminRoutes)

app.use('/api/event', eventRoutes)  //check event edit

//  API call to save an attendee for a particular event
app.post('/api/event/attendee', attendee.saveAttendee)

//  API call to remove an attendee for a particular event
app.post('/api/event/attendee/cancel', attendee.deleteAttendee)

//  API call to save a comment for a particular event
app.post('/api/event/comment', comment.saveComment)

//  API call to delete a comment for a particular event
app.delete('/api/event/comment', comment.deleteComment)

app.use('/api/user', userRoutes)

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
