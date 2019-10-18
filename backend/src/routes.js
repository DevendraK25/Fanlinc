const path = require('path')
const cors = require('cors')
const homeRoute = require('./controllers/homepage')
const registerRoute = require('./controllers/register')
const bodyParser = require('body-parser')


function init(server) {
	server.use(cors())
	server.use(bodyParser.json());
	server.use(bodyParser.urlencoded({ extended: false }));
	
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