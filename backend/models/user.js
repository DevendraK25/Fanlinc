const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
	username : {
		type : String,
		required : true,
		unique : true
	},
	email : {
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true,
		min : 6,
		max : 40
	},
	profile : {
		subscribed : {
			type : Array
		},
		friends : {
			type : Array
		},
		bio : {
			type : String
		},
		age : {
			type : Number
		},
		interests : {
			type : Array
		},
		fandoms : {
			type : Array
		},
		groups : {
			type : Array
		},
		friends : {
			type : Array
		}
	}
});

module.exports = mongoose.model('user', userSchema);