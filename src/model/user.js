const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
	username : {
		type : String,
		required : true,
		unique: true
	},
	password : {
		type : String,
		required : true,
		min : 6,
		max : 40
	},
	email : {
		type : String,
		required : true,
		unique: true
	}
});

mongoose.model('User', userSchema).ensureIndexes(function (err) {
  if (err) console.log(err.message);
});

module.exports = mongoose.model('User', userSchema);