const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
	verifyTokenAdmin : (req, res, next)=>{
		jwt.verify(req.body.token, 'secret', (err, decoded) => {
      if(decoded == undefined){
        res.send(err)
      }else{
        if(decoded.role.toLowerCase() == 'user') {
          res.send(decoded)
        }
        else {
          res.send("You Cant acces this routes")
        }
       }
    })
	},
	verifyTokenAdminAndUser : (req, res, next)=>{
		jwt.verify(req.body.token, 'secret', (err, decoded) => {
      if(decoded == undefined){
        res.send(err)
      }else{
        if(decoded.role.toLowerCase() == 'admin' || decoded.role.toLowerCase() == 'user') {
          req.decoded = decoded
          next();
        }
        else {
          res.send(err)
        }
      }
    })
	}
}