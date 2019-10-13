var mongoose = require('mongoose');


// Get DB to connect to 
// move to .env file later
 mongoose.connect('mongodb+srv://user:Password@cluster0-pu5as.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser : true,
	useUnifiedTopology : true
});

function verifyUser(user, password) {
	
	
};
 
module.exports = mongoose;