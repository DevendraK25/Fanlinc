const router = require('express').Router();
const path = require('path');
var pdb = require('./../db/postDbDriver');

router.get('/', function(req, res) {pdb.getAllPosts(req, res)});

// router.get('/:id', function(req, res) {
// 	var id = req.params.id
// 	pdb.getPost(id, function(err, post) {
// 		if(err) {
// 			res.status(404).send(err.message);
// 		} else {
// 			res.status(200).send(post);
// 		}
// 	})
// });
router.get('/:id', function(req, res){ pdb.addPost(req, res) });

// router.post('/create', function(req, res){
// 	pdb.addPost(req.body, function(err,success) {
// 		if(err) { 
// 			res.status(400).send(err.message);
// 		} else 
// 		res.status(200).send() ;
		
// 	})
// });
router.post('/create', function(req, res){ pdb.addPost(req, res) });

// TODO
router.post('/update/', function(req, res){res.sendStatus(400) });
router.delete('/delete/:id', function(req, res){res.sendStatus(400) });

module.exports = router;