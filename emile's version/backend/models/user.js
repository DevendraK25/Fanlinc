import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username : {
		type : String,
		required : true,
		unique: true
	},
	firstname : {
		type : String,
		required : true,
		unique: true
	},
	lastname : {
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

export default mongoose.model('userSchema', userSchema);