const router = require('express').Router();
const path = require('path');
const user = require('../model/user');

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + "/../frontend/register.html"));
});

// put routes here
router.post('/', async (req, res) => {
	// register success
	// register failure
});



module.exports = router;
