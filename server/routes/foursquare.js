const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/user')
const controllerFoursquare = require('../controllers/foursquare')
const helpersJwt = require('../helpers/jwtVerify')

router.post('/venue', helpersJwt.verifyTokenAdminAndUser, controllerFoursquare.getVenueByNearQuery)
router.post('/signin', controllerUser.signin)
router.post('/signup', controllerUser.signup)
router.post('/signfb', controllerUser.signinFacebook)
router.post('/validation', helpersJwt.verifyTokenAdmin)

const controllerTwitter = require('../controllers/twittersearch')

router.post('/timeline', controllerTwitter.findSomething)
router.post('/image', controllerFoursquare.getVenueImage)

module.exports = router