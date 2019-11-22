const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
	tags : String,
	title: {
		type : String,
		required : true
	},
	content: {
		type : String,
	},
	image: {
		type : String,
	},
	author : {
		type : String
	},
	timestamp : {
		type : String
	},
	comments : [],
	numVotes : {
		type : Number
		
	},
	fandom : {
		type : String,
		required : true
	},
	userImage : {
		type : String,
		required : true
	}
});

module.exports = mongoose.model('postSchema', postSchema);