const router = require('express').Router();
const path = require('path');
var pdb = require('./../db/postDbDriver');

router.get('/', function(req, res) {pdb.getAllPosts(req, res)});
router.post('/add', function(req, res){ pdb.addPost(req, res) });
router.get('/:id', function(req, res){ pdb.addPost(req, res) });
router.get('/:id', function(req, res){ pdb.addPost(req, res) });
router.delete('/deleteAll', function(req, res){ pdb.deleteAll(req, res) });

// TODO
router.post('/update/:id', function(req, res){pdb.updatepost(req, res) });
router.delete('/delete/:id', function(req, res){pdb.deletepost(req, res) });

module.exports = router;