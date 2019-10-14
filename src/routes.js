const path = require('path')

const homeRoute = require('./controllers/homepage')
const registerRoute = require('./controllers/register')

function init(server) {
	server.get('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

	server.get('/', function(req, res) {
		res.redirect('/home');
	});

	server.use('/home', homeRoute);
	server.use('/register', registerRoute);
	
}

module.exports = {
	init : init
};