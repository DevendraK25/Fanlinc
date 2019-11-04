const db = require('./db/db');
const path = require('path');
const userHandler = require('./handlers/userH')

function init(server){
	db.connection()
	
	server.get('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});
	
	server.use('/users', userHandler);
	
  // ---database section---
//  udb.connection(); //connect to mongodb
//  server.get('/users', function(req, res){ udb.getAllUsers(req, res) });
//  server.post('/users/add', function(req, res){ udb.addUser(req, res) });
//  server.get('/users/:username', function(req, res){ udb.getUserByUsername(req, res) });
//  server.get('/users/:username/:password', function(req, res){ udb.getUser(req, res) });
//  server.post('/users/update/:username', function(req, res){ udb.updateUser(req, res) });
//  server.delete('/users/delete/:username', function(req, res){ udb.deleteUser(req, res) });
  // ---database section---

}

module.exports = {
  init : init
}