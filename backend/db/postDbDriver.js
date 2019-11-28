const mongoose = require('mongoose');
var postSchema = require('./../models/post');
var ObjectId = require('mongodb').ObjectId;

function getAllPosts(req, res) {
	postSchema.find(function(err, posts) {
		if (err)
			res.status(400).send(err.message);
		else
			res.status(200).json(posts);
	})
}

function getAssociatedPosts(req, res) {
	postSchema.find({
		fandom : req.params.fandom
	}, function(err, posts) {
		if (err)
		res.status(400).send(err.errmsg);
	else if (posts == '')
		res.status(404).send("Post '" + req.params.fandom + "' not found");
	else
		res.status(200).json(posts);
	}) 
}

function getPost(req, res) {
	postSchema.find({
		_id : ObjectId(req.params.id)
	}, function(err, post) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (post == '')
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post);
	});
}

function addPost(post, res) {
	var newPost = new postSchema(post.body)
	newPost.save(function(err, post) {
		if (err)
			res.status(400).send(err.message);
		else
			res.status(200).send(post);
	});
}

function deleteAll(req, res) {
	postSchema.deleteMany({}, function(err) {
		if (err)
			res.status(400).send(err.errmsg);
		else
			res.status(200).send('deleted');
	});
}

function setNumVotes(req, res) {
	postSchema.updateOne({_id : ObjectId(req.params.id)}, {"numVotes": req.body.numVotes},
		function(err, post) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (post.n == 0)
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post);
	});
}

function addComment(req, res) {
	postSchema.updateOne({_id : ObjectId(req.params.id)}, 
	{$push: {"comments": {"comment":req.body.newComment, "author":req.body.author}}},
		function(err, post) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (post.n == 0)
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post);
	});
}

function deletePost(req, res) {
    postSchema.deleteOne({_id : ObjectId(req.params.id)}, function(err, post) {
		if (err)
			res.status(400).send(err.errmsg);
		else if (post.n == 0)
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post);
	});
}

function updatePost(req, res) { //for all other fields that's not array
	postSchema.updateOne({
		_id : ObjectId(req.params.id)
	}, req.body, function(err, post) {
		if (err) 
			res.status(400).send(err.errmsg);
		else if (post.n == 0)
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post)
	})
}

function setUserImage(req, res) {
	postSchema.updateOne({_id: ObjectId(req.params.id)}, {userImage: req.body.image}, function(err, post){
		if (err) 
			res.status(400).send(err.errmsg);
		else if (post.n == 0)
			res.status(404).send("Post '" + req.params.id + "' not found");
		else
			res.status(200).send(post)
	})
}

module.exports = {
	getAssociatedPosts : getAssociatedPosts,
	getPost : getPost,
	addPost : addPost,
	getAllPosts : getAllPosts,
	deleteAll : deleteAll,
	setNumVotes:setNumVotes,
	addComment : addComment,
	deletePost : deletePost,
	updatePost : updatePost,
	setUserImage : setUserImage
}