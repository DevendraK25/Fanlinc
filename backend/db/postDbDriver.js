const mongoose = require('mongoose');
var postSchema = require('./../models/post');
var ObjectId = require('mongodb').ObjectId; 
     
function getAllPosts(req, res) {
    postSchema.find(function(err, posts){
        if (err) 
            res.send(err.message);
        else
            res.json(posts);
    })
}

function getPost(id, cb) {
	var o_id = new ObjectId(id);
	postSchema.find({_id:o_id}, function(err,post) {
		if(err) {
			cb(err, null)
		}
		cb(null,post)
	})
}

function addPost(post, res) {
	console.log(post)
	var newPost = new postSchema(post.body)
	newPost.save(function(err, user){
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send(user);
    });
}

module.exports = {
		getPost : getPost,
		addPost : addPost,
		getAllPosts:getAllPosts
}