const router = require('express').Router();
const path = require('path');
var fdb = require('./../db/fandomDbDriver');

router.get('/', function(req, res){fdb.getAllFandoms(req,res)});
router.get('/:name', function(req, res) {fdb.getFandom(req, res)});

router.post('/add', function(req, res){fdb.addFandom(req,res)});
router.post('/update/:name', function(req, res){fdb.updateFandom(req, res)});
router.post('/setPosts/:name', function(req, res){fdb.setPosts(req, res)});
router.post('/setMods/:name', function(req, res){fdb.setMods(req, res)});
router.post('/setEvents/:name', function(req, res){fdb.setEvents(req, res)});
router.post('/setSubCount/:name', function(req, res){fdb.setSubCount(req, res)});

router.delete('/delete/:name', function(req, res){fdb.deleteFandom(req, res)});
router.delete('/deleteAll', function(req, res){fdb.deleteAll(req, res)});

module.exports = router;