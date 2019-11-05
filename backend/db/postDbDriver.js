const mongoose = require('mongoose');
postSchema = require('./../models/post');
var ObjectId = require('mongodb').ObjectId; 
     


function getPost(id, cb) {
	var o_id = new ObjectId(id);
	postSchema.find({_id:o_id}, function(err,post) {
		if(err) {
			cb(err, null)
		}
		cb(null,post)
	})
}


function addPost(post, cb) {
	console.log(post)
	var newPost = new postSchema(post)
	newPost.save(function(err, post) {
		if(err){
			cb(err,null)
		}
		cb(null, post)
	})
}

module.exports = {
		getPost : getPost,
		addPost : addPost
}