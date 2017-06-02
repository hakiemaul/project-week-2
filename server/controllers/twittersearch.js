var OAuth = require('oauth');

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'GYxInhKlj8A6r6Aw3QYsA6Ohw',
  'lyFu1dvkQYiwQMP4zdTKXxDz3j91pC5aYNRgWoz1n2ZHel1QJn',
  '1.0A',
  null,
  'HMAC-SHA1'
);

var findSomething = function(req, res) {
  let search = req.body.search;
  search = encodeURIComponent(search).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
  // console.log(req.body)
  oauth.get(
    `https://api.twitter.com/1.1/search/tweets.json?q=${search}`,
    '33863065-ZBivIXTbUA0dZSWfseh7Ygf2TKkpRpPPReeeVnCRS',
    'nuRORV0XOEK8E5ib0IVGeBgjIJDAAES8Y3xFvOrEFugbg',
    function (e, data){
      if(e) {
        res.send(e)
      } else {
        res.send(data)
      }
    })
}

module.exports = {
  findSomething
};