const router = require('express').Router();
const path = require('path');
var udb = require('./../db/userDbDriver');


router.get('/', function(req, res) {
	udb.getAllUsers(req, res)
});

router.post('/add', function(req, res){ udb.addUser(req, res) });
router.get('/:username', function(req, res){ udb.getUserByUsername(req, res) });
router.get('/:username/:password', function(req, res){ udb.getUser(req, res) });
router.post('/update/:username', function(req, res){ udb.updateUser(req, res) });
router.delete('/delete/:username', function(req, res){ udb.deleteUser(req, res) });

module.exports = router;