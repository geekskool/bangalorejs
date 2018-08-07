const express = require('express')
const bodyParser = require('body-parser')

const client = require('./model/redis').client

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const compression = require('compression')

const userRoutes = require('./routes/userRoutes')
const eventRoutes = require('./routes/eventRoutes')
const attendeeRoutes = require('./routes/attendeeRoutes')
const commentRoutes = require('./routes/commentRoutes')
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

app.use('/api/event/comment', commentRoutes)

app.use('/api/event/attendee', attendeeRoutes)

app.use('/api/event', eventRoutes)

app.use('/api/user', userRoutes)

app.listen(PORT, function () {
  console.log('Example app listening on port ', PORT)
})

process.on('SIGINT', () => { console.log('Bye bye!'); process.exit() })
