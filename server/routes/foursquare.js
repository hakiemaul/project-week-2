const express = require('express')
const router = express.Router()
const controllerFoursquare = require('../controllers/foursquare')

router.post('/venue', controllerFoursquare.getVenueByNearQuery)

module.exports = router