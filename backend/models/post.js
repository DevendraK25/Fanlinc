const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let postSchema = new Schema({
	tags : [],
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
		
	}
	

});

module.exports = mongoose.model('post', postSchema);