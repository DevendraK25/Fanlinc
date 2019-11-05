const mongoose = require('mongoose');

const Schema = mongoose.Schema;

fandomSchema = new Schema({
	name : {
		type : String
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