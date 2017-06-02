const express = require('express')
const router = express.Router()
const controllerFoursquare = require('../controllers/foursquare')

router.get('/categories', controllerFoursquare.getCategories)

module.exports = router