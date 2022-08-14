const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-hbs')
const morgan = require('morgan')
const session = require('express-session')

const app = express()

const yourMongoDbURIGoesHere = ''
const mongoDb_URI = process.env.MONGODB_URI || yourMongoDbURIGoesHere

mongoose.connect(mongoDb_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(app.listen(5000, () => { console.log('server is running on port 5000') }))
  .catch(err => { console.log(err) })

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, 'views', 'partials'),
  defaultLayout: path.join(__dirname, 'views', 'layout', 'default')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: false }))

const sessionSecretKey = '' // You can add your secret ket here

const sessionOptions = {
  name: 'CRUD APP', // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET_KEY || sessionSecretKey, // Change it!!! The secret is used to hash the session with HMAC.
  resave: false, // Resave even if a request is not changing the session.
  saveUninitialized: false, // Don't save a created but not modified session.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}

app.use(session(sessionOptions))

app.use((req, res, next) => {
  // flash messages - survives only a round trip
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }

  next()
})

app.use('/', require('./routes/homeRouter'))
app.use('/snippets', require('./routes/snippetRouter'))
app.use('/authentication', require('./routes/authRouter'))
