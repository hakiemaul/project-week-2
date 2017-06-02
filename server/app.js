const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require('mongoose')
mongoose.Promise=require('bluebird')

const app = express()
var foursquare = require('./routes/foursquare')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use('/api',foursquare)

app.listen(3000, ()=>{
	console.log('Connected to port 3000!')
})