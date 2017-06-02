var axios = require('axios')

module.exports = {
	getVenueByNearQuery : (req, res)=>{
		var near = req.body.near
		var query = req.body.query
		axios.get('https://api.foursquare.com/v2/venues/search?near='+near+'&query='+query+'&limit=10&oauth_token=5LSZM4DSYBQDWTM33RPHIHD2UEVQRDK2JVP1BGIBAHGPSCLJ&v=20170602')
		.then(response=>{
			var data = response.data.response
			res.send(data)
		})
		.catch(err=>{
			console.log(err)
		})
	}
}