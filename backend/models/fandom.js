const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let fandomSchema = new Schema({

	image : {
		type: String,
		default: "https://via.placeholder.com/100.jpg"
	},
	name : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	posts : [],
	subcount : {
		type : Number
	},
	admin : {
		type : String,
		required : true,
	},
	mods : [],
	events : []
});

module.exports = mongoose.model('fandom', fandomSchema);