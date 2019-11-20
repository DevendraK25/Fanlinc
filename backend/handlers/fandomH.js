const router = require('express').Router();
const path = require('path');
var fdb = require('./../db/fandomDbDriver');

router.get('/', function(req, res){fdb.getAllFandoms(req,res)});
router.get('/getAllFandoms', function(req, res) {fdb.getAllFandoms(req, res)});
router.get('/:name', function(req, res) {fdb.getFandom(req, res)});

router.post('/add', function(req, res){fdb.addFandom(req,res)});
router.post('/update/:id', function(req, res){fdb.addFandom(req, res)});

router.delete('/delete/:id', function(req, res){fdb.deleteFandom(req, res)});

module.exports = router;