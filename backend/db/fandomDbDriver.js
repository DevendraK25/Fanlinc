const mongoose = require('mongoose');
var fandomSchema = require('./../models/fandom');
var ObjectId = require('mongodb').ObjectId; 
     
function getAllFandoms(req, res) {
	fandomSchema.find(function(err, fandoms){
        if (err) 
            res.status(400).send(err.message);
        else
            res.status(200).json(fandoms);
    })
}

function getFandom(req, res) {	
	fandomSchema.find({name: req.params.name}, function(err, fandom) {
		if (err) 
			res.status(400).send(err.message);		
		else if (fandom == '')
			res.status(404).send("Fandom '" + req.params.username + "' not found");
		else
			res.status(200).send(fandom);
	});
}

function addFandom(fandom, res) {
	var newFandom = new fandomSchema(fandom.body)
	newFandom.save(function(err, user){
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send(user);
    });
}

function updateFandom(req, res){
	fandomSchema.updateOne({
		_id : ObjectId(req.params.id)
	}, req.body, function(err, fandom) {
		if (err) 
			res.status(404).send(err.errmsg);
		else if (fandom.n == 0)
			res.status(404).send("fandom '" + req.params.id + "' not found");
		else
			res.status(200).send(fandom)
	})
}

function deleteFandom(req, res) {
    fandomSchema.deleteOne({_id : ObjectId(req.params.id)}, function(err, fandom) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (fandom.n == 0)
			res.status(404).send("fandom '" + req.params.id + "' not found");
		else
			res.status(200).send(fandom);
	});
}

function deleteAll(req, res){
	fandomSchema.deleteMany({}, function(err){
		if (err) 
			res.status(400).send(err);
		else 
			res.status(200).send('deleted');
	});
}

module.exports = {
	getFandom : getFandom,
	addFandom : addFandom,
	getAllFandoms : getAllFandoms,
	deleteAll : deleteAll,
	updateFandom : updateFandom,
	deleteFandom : deleteFandom
}