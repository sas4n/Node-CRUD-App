const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-hbs')
const morgan = require('morgan')

const app = express()

const yourMongoDbURIGoesHere = ''
const mongoDb_URI = process.env.MONGODB_URI || yourMongoDbURIGoesHere

mongoose.connect(mongoDb_URI, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(app.listen(5000, () => {console.log('server is running on port 5000')}))
    .catch(err => {console.log(err)})

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
    partialsDir: path.join(__dirname , 'views' , 'partials'),
    defaultLayout: path.join(__dirname , 'views', 'layout', 'default')
  }));
  app.set('view engine', 'hbs');
  app.set('views',path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended : false}))

app.use('/', require('./routes/snippetRouter'))


