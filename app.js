const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-hbs')
const morgan = require('morgan')
const { appendFile } = require('fs')

const app = express()

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

app.listen(5000 , () => {console.log('server running on port 5000')})
