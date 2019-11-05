/**
 * http://usejsdoc.org/
 */
const mongoose = require('mongoose');

function connection() { 
  const uri = "mongodb+srv://user:Password@cluster0-pu5as.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri, {
                      useNewUrlParser : true,
                      useUnifiedTopology : true,
                      useCreateIndex : true,
                  });
  const connection = mongoose.connection;
  connection.once('open', () => {
      console.log('MongoDB database connection established successfully!');
  });
}

module.exports = {
		connection : connection
}