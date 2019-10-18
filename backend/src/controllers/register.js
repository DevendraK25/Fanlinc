const router = require('express').Router();
const path = require('path')
const user = require('../model/user')
const bodyParser = require('body-parser')
var db = require('../db/dbDriver')

router.use(bodyParser.json())

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + "/../frontend/register.html"));
});

// put routes here
router.post('/', (req, res) => {
	
	var userCred = req.body
	console.log(userCred)
	db.addUser(userCred, function (a) {
		if(a == 200) {
			console.log("success")
			res.status(200).end()
		} else if(a == 409){
			console.log("failed")
			res.status(409).end()
		} else if(a == 400) {
			res.status(400).end()
		}
	})

	
});



module.exports = router;
