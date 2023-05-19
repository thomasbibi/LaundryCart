require('dotenv').config()
const express = require('express')
const connect = require('./Connections/connect.js')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')



const app = express()


 // create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
 





app.listen(5000,()=>{console.log('App up at 5000')})


