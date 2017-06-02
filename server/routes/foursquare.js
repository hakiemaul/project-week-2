const express = require('express')
const router = express.Router()
const controllerFoursquare = require('../controllers/foursquare')

router.post('/venue', controllerFoursquare.getVenueByNearQuery)

router.post('/image', controllerFoursquare.getVenueImage)

module.exports = router