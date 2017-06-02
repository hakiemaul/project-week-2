const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
require('../config/db')

module.exports = {
	signup : (req, res)=>{
		User.findOne({username : req.body.username})
		.then(result=>{
			if(result != null){				
				res.send('This username already exists')
			}else{
				User.findOne({email : req.body.email})
				.then(query=>{
					if(query != null){
						res.send('This email is already registered')
					}else if(query == null){
						var insertUser = User({
							name : req.body.name,
							email : req.body.email,
							username : req.body.username,
							password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(process.env.SALT)),
							role : req.body.role || 'user'
						})

						insertUser.save((error, response)=>{
							if(!error){
								res.send(response)						
							}else{
								res.send(error)
							}
						})		
					}
				})
				.catch(error=>{
					res.send(error)
				})
			}
		})
		.catch(err=>{
			res.send(err)
		})
	},
	signin : (req, res)=>{
		User.findOne({
      username : req.body.username
    })
    .then((query)=>{
      if(bcrypt.compareSync(req.body.password, query.password)){
			var token = jwt.sign({
				id : query._id,
				name : query.name,
				email : query.email,
				role : query.role
			}, 'secret', {expiresIn : '1h'})
			res.send({
				token : token
			})
      }
    })
	},
	signinFacebook : (req, res)=>{
		User.findOne({
      email : req.body.email
    })
    .then((query)=>{
      if(query){
				var token = jwt.sign({
					id : query._id,
					name : query.name,
					email : query.email,
					role : query.role
				}, 'secret', {expiresIn : '1h'})
				res.send({
					token : token
				})
      }else{
      	User.create({
      		name : req.body.name,
      		email : req.body.email,
      		role : 'user'
      	})
      	.then((result)=>{
      		var token = jwt.sign({
						id : result._id,
						name : result.name,
						email : result.email,
						role : result.role
					}, 'secret', {expiresIn : '1h'})
					res.send({
						token : token
					})
      	})
      }
    })
  },
	getAll : (req, res)=>{
		User.find({})
		.then(result =>{
			res.send(result)
		})
		.catch(err =>{
			res.send(err)
		})
	},
	getDetail : (req, res)=>{
		User.findById(req.params.id)
		.then(result=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	insert : (req, res)=>{
		User.findOne({username : req.body.username})
		.then(result=>{
			if(result){
				res.send('this username already exists')
			}else{
				User.findOne({email : req.body.email})
				.then(response=>{
					console.log(response)
					if(response){
						res.send('This email is already registered')
					}else{
						var insertUser = new User({
							name : req.body.name,
							email : req.body.email,
							password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
							role : req.body.role || 'user'
						})

						insertUser.save((error, response)=>{
							if(!error){
								res.send(response)						
							}else{
								res.send(error)
							}
						})		
					}
				})
				.catch(error=>{
					res.send(error)
				})
			}
		})
		.catch(err=>{
			res.send(err)
		})
	},
	delete : (req, res)=>{
		User.deleteOne({_id : req.params.id})
		.then((result)=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	update : (req, res)=>{
		User.findById(req.params.id)
		.then(result=>{
			User.updateOne({
				name : req.body.name || result.name,
				email : req.body.email || result.email,
				password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) || result.password,
				role : req.body.role || result.role
			})
			.then(response=>{
				res.send(response)
			})
			.catch(error=>{
				res.send(error)
			})
		})
		.catch(err=>{
			res.send(err)
		})
	}
}