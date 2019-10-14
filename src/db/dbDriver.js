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
function verifyUser(user, password) {
	var found = mongoose.Collection.findOne({
		username : user,
		password : password
	});
	if (found) {
		return found;
	} else {
		return false;
	}
}

function addUser(jsonUser, method) {
	console.log(jsonUser)

	var newUser = new User({
		username : jsonUser.username,
		password : jsonUser.password,
		email : jsonUser.email
	})
	
	
//	newUser.save(function(err) {
//		if (err) {
//			console.log(err.message)
//			method(400);
//		} else {
//			method(200);
//		}
//	})
	
	newUser.save().then(function() {
		console.log("saved")
	}).then(function() {
		method(200)
	}, function(err) {
		if(err) {
			console.log(err.message)
			method(400)
		}
	})


	

//	try {
//	newUser.save().then( () => {
//		return 200
//	})
//	} catch(err){
//		return 400
//	}
	
}

module.exports = {
	verifyUser : verifyUser,
	addUser : addUser
};