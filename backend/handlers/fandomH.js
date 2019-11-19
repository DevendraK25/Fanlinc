const router = require('express').Router();
const path = require('path');
var fdb = require('./../db/fandomDbDriver');

router.get('/', function(req, res){fdb.getAllFandoms(req,res)});
//TODO
router.get('/getAllFandoms', function(req, res) {fdb.getAllFandoms(req, res)});
router.post('/add', function(req, res){fdb.addFandom(req,res)
});

router.post('/update/', function(req, res){fdb.addFandom(req, res)});
router.delete('/delete/:id', function(req, res){fdb.addFandom(req, res)});
router.get('/:name', function(req, res) {fdb.getFandom(req, res)
});

module.exports = router;