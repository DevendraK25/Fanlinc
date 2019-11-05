const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let commentSchema = new Schema({
	postID : {
		type :String,
		required : true
	},
	title: {
		type : String,
		required : true
	},
	content: {
		type : String,
	},
	author : {
		type : String
	},
	timestamp : {
		type : String
	},
	comments : []
	

});

module.exports = mongoose.model('comment', postSchema);