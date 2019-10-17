const router = require('express').Router();
const path = require('path');

// put routes here
router.get('/', (req, res) => {
//	res.send("Hello World");
	res.sendFile(path.join(__dirname + '/../frontend/homepage.html'));
});


module.exports = router;
