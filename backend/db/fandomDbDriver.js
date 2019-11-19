const mongoose = require('mongoose');
var fandomSchema = require('./../models/fandom');
var ObjectId = require('mongodb').ObjectId; 
     
function getAllFandoms(req, res) {
	fandomSchema.find(function(err, fandoms){
        if (err) 
            res.send(err.message);
        else
            res.json(fandoms);
    })
}

function getFandom(req, res) {
	
	fandomSchema.find({name: req.params.name}, function(err,fandom) {
		if(err) {
			res.send(err.message);
		}		
		else if (fandom == '')
			res.status(404).send("Fandom '" + req.params.username + "' not found");
		else{
			res.status(200).send(fandom);
		}
	});
}

function addFandom(fandom, res) {
	console.log(fandom)
	var newFandom = new fandomSchema(fandom.body)
	newFandom.save(function(err, user){
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send(user);
    });
}

function deleteAll(req, res){
	fandomSchema.deleteMany({}, function(err){
		if (err) res.send(err);
		else res.send('ok');
	});
}

module.exports = {
	getFandom : getFandom,
	addFandom : addFandom,
	getAllFandoms:getAllFandoms,
	deleteAll : deleteAll
}