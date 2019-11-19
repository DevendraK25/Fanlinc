var userSchema = require('./../models/user');

// GET all users
function getAllUsers(req, res) {
	userSchema.find(function(err, users) {
		if (err)
			res.send(err.message);
		else
			res.json(users);
	})
}

// ADD user
function addUser(req, res) {
	var user = new userSchema(req.body);
	user.save(function(err, user) {
		if (err)
			res.status(400).send(err.message);
		else
			res.status(200).send(user);
	});
}

// GET user
function getUser(req, res) {
	userSchema.find({
		username : req.params.username,
		password : req.params.password
	}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user == '')
			res.send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function getUserByUsername(req, res) {
	userSchema.find({
		username : req.params.username
	}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user == '')
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

// UPDATE user info
function updateUser(req, res) {
	userSchema.update({
		username : req.params.username
	}, req.body, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

//DELETE user
function deleteAll(req, res) {
	// userSchema.deleteOne({
	// 	username : req.params.username
	// }, function(err, user) {
	// 	if (err)
	// 		res.status(400).send(err.errmsg);
	// 	else if (user.deletedCount == 0)
	// 		res.status(404)
	// 				.send("User '" + req.params.username + "' not found");
	// 	else
	// 		res.send("User '" + req.params.username
	// 				+ "' was successfully deleted");
	// });
	userSchema.deleteMany({}, function(err){
		if (err) res.send(err)
		else res.send('ok')
	});
}

function addFriend(req, res) {
	userSchema.updateOne({username : req.params.username},
		 { "profile": {$push : {"friends" : req.body.friend}} }, function(err, user) {
		if (err)
			res.status(404).send(err.errmsg);
		else
			res.status(200).send(user);
	});
}


function removeFriend(req, res) {
	userSchema.update({
		_id : req.body.user
	}, {
		profile : {
			$pull : {
				friends : req.body.friend
			}
		}
	}, function(err, user) {
		if (err)
			res.status(404).send(err.errmsg);
		else
			res.status(200).send();
	});
}

function subscribe(req, res) {
	userSchema.update({
		username : req.body.user
	}, {
		profile : {
			$push : {
				fandoms : req.body.fandom
			}
		}
	}, function(err, user) {
		if (err)
			res.status(404).send(err.errmsg);
		else
			res.status(200).send();
	});
}


function unsubscribe(req, res) {
	userSchema.update({
		_id : req.body.user
	}, {
		profile : {
			$pull : {
				fandom : req.body.fandom
			}
		}
	}, function(err, user) {
		if (err)
			res.status(404).send(err.errmsg);
		else
			res.status(200).send();
	});
}



module.exports = {
	getAllUsers : getAllUsers,
	getUser : getUser,
	addUser : addUser,
	updateUser : updateUser,
	deleteAll : deleteAll,
	getUserByUsername : getUserByUsername,
	addFriend : addFriend,
	removeFriend : removeFriend,
}