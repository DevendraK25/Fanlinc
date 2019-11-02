import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let userSchema = new Schema({
    username : {
		type : String,
		required : true,
		unique: true
	},
	email : {
		type : String,
		required : true,
		unique: true
	},
	password : {
		type : String,
		required : true,
		min : 6,
		max : 40
	}
});

export default mongoose.model('userSchema', userSchema);