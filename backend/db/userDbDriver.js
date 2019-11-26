var userSchema = require('./../models/user');

function getAllUsers(req, res) {
	userSchema.find(function(err, users) {
		if (err)
			res.status(400).send(err.message);
		else
			res.status(200).send(users);
	})
}

function addUser(req, res) {
	var user = new userSchema(req.body);
	user.save(function(err, user) {
		if (err)
			res.status(400).send(err.message);
		else
			res.status(200).send(user);
	});
}

function getUser(req, res) {
	userSchema.find({
		username : req.params.username,
		password : req.params.password
	}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user == '')
			res.status(404).send("User '" + req.params.username + "' not found");
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

function updateUser(req, res) { //for all other fields that's not array
	userSchema.updateOne({username : req.params.username}, req.body, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function deleteUser(req, res) {
	userSchema.deleteOne({username: req.params.username, password: req.body.password}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg)
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send('deleted')
	});
}

function deleteAll(req, res) {
	userSchema.deleteMany({}, function(err) {
		if (err)
			res.status(400).send(err.errmsg)
		else
			res.status(200).send('deleted')
	});
}

function addFriend(req, res) {
	userSchema.updateOne({username : req.params.username}, 
		{$push : {"profile.friends" : req.body.friend}}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function addPending(req, res) {
	userSchema.updateOne({username : req.params.username}, 
		{$push : {"profile.pending_friends" : req.body.friend}}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function removePending(req, res) {
	userSchema.updateOne({username : req.params.username}, 
		{$pull : {"profile.pending_friends" : req.body.friend}}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function removeFriend(req, res) {
	userSchema.updateOne({username : req.params.username}, 
		{$pull : {"profile.friends" : req.body.friend}}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function subscribe(req, res) {
	userSchema.updateOne({username : req.params.username}, 
		{$push : {"profile.subscribed" : req.body.fandom}}, function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

function unsubscribe(req, res) {
	userSchema.updateOne({username : req.params.username}, {$pull : {"profile.subscribed" : req.body.fandom}}, 
	function(err, user) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (user.n == 0)
			res.status(404).send("User '" + req.params.username + "' not found");
		else
			res.status(200).send(user);
	});
}

module.exports = {
	getAllUsers : getAllUsers,
	getUser : getUser,
	addUser : addUser,
	updateUser : updateUser,
	deleteUser : deleteUser,
	getUserByUsername : getUserByUsername,
	addFriend : addFriend,
	removeFriend : removeFriend,
	subscribe : subscribe,
	unsubscribe : unsubscribe,
	deleteAll : deleteAll,
	addPending : addPending,
	removePending : removePending
}