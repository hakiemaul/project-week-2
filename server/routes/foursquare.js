const express = require('express')
const router = express.Router()
const controllerFoursquare = require('../controllers/foursquare')
const controllerTwitter = require('../controllers/twittersearch')

router.post('/timeline', controllerTwitter.findSomething)

router.post('/venue', controllerFoursquare.getVenueByNearQuery)

router.post('/image', controllerFoursquare.getVenueImage)

module.exports = router