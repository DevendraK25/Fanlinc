var mongoose = require('mongoose')
const User = require('../model/user')

// Get DB to connect to
// move to .env file later
mongoose
		.connect(
				'mongodb+srv://user:Password@cluster0-pu5as.mongodb.net/test?retryWrites=true&w=majority',
				{
					useNewUrlParser : true,
					useUnifiedTopology : true,
					useCreateIndex : true
				});
function verifyUser(jsonCred, callback) {
	User.findOne({
		username : jsonCred.user,
		password : jsonCred.password
	}).exec(function(err) {
		console.log(err.message)
		callback(err)
	}, function(res) {
		console.log("res returned: ", res)
		callback(res)
	})
}

function addUser(jsonUser, method) {
	console.log(jsonUser)

	var newUser = new User({
		username : jsonUser.username,
		password : jsonUser.password,
		email : jsonUser.email
	})
	
	
	newUser.save().then(function() {
		console.log("saved")
	}).then(function() {
		method(200)
	}, function(err) {
		if(err) {
			console.log(err.message)
			method(409)
		}
	})
}

module.exports = {
	verifyUser : verifyUser,
	addUser : addUser
};