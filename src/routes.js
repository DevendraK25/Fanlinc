const path = require('path')
const home = require('./controllers/homepage.js')

// const apiRoute = require('./controllers/apis')
const homeRoute = require('./controllers/homepage.js')
// const errorRoute = require('./controllers/error');

function init(server) {
	server.get('*', function(req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
	});

	server.get('/', function(req, res) {
		res.redirect('/home');
	});

	// server.use('/api', apiRoute);
	server.use('/home', homeRoute);
	// server.use('/error', errorRoute);
}

module.exports = {
	init : init
};