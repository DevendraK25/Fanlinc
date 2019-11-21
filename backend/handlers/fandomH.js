const router = require('express').Router();
const path = require('path');
var fdb = require('./../db/fandomDbDriver');

router.get('/', function(req, res){fdb.getAllFandoms(req,res)});
router.get('/:name', function(req, res) {fdb.getFandom(req, res)});

router.post('/add', function(req, res){fdb.addFandom(req,res)});
router.post('/update/:id', function(req, res){fdb.updateFandom(req, res)});
router.post('/setPosts/:id', function(req, res){fdb.setPosts(req, res)});
router.post('/setMods/:id', function(req, res){fdb.setMods(req, res)});
router.post('/setEvents/:id', function(req, res){fdb.setEvents(req, res)});

router.delete('/delete/:id', function(req, res){fdb.deleteFandom(req, res)});
router.delete('/deleteAll', function(req, res){fdb.deleteAll(req, res)});

module.exports = router;