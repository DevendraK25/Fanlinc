const router = require('express').Router();
const path = require('path');
var pdb = require('./../db/postDbDriver');

router.get('/', function(req, res) {pdb.getAllPosts(req, res)});

router.get('/allposts/:fandom', function(req, res) {pdb.getAssociatedPosts(req,res)});
router.get('/:id', function(req, res){ pdb.getPost(req, res) });

router.post('/add', function(req, res){ pdb.addPost(req, res) });
router.post('/setNumVotes/:id', function(req, res){ pdb.setNumVotes(req, res) });
router.post('/addComment/:id', function(req, res){ pdb.addComment(req, res) });
router.post('/update/:id', function(req, res){pdb.updatePost(req, res) });
router.post('/setUserImage/:id', function(req, res){pdb.setUserImage(req, res) });

router.delete('/delete/:id', function(req, res){pdb.deletePost(req, res) });
router.delete('/deleteAll', function(req, res){ pdb.deleteAll(req, res) });

module.exports = router;
