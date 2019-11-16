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

function getFandom(id, cb) {
	var o_id = new ObjectId(id);
	fandomSchema.find({_id:o_id}, function(err,fandom) {
		if(err) {
			cb(err, null)
		}
		cb(null,fandom)
	})
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

module.exports = {
		getFandom : getFandom,
		addFandom : addFandom,
		getAllFandoms:getAllFandoms
}