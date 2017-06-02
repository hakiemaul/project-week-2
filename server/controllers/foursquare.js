var axios = require('axios')

module.exports = {
	getCategories : (req, res)=>{
		axios.get('https://api.foursquare.com/v2/venues/categories?oauth_token=5LSZM4DSYBQDWTM33RPHIHD2UEVQRDK2JVP1BGIBAHGPSCLJ&v=20170602')
		.then(response=>{
			var data = response.data.response
			res.send(data.categories)
		})
		.catch(err=>{
			console.log(err)
		})
	}
}