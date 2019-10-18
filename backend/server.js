var express = require('express');
var app = express();
const routes = require('./src/routes.js');

// currently running on localhost:8080
var port = process.env.PORT || 8080;

// lets routesApi handle routes starting with "/"
routes.init(app);

app.listen(port, () => {
	console.log("server has been started");
});