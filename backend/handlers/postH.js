const router = require('express').Router();
const path = require('path');
pdb = require('./../db/postDbDriver');


router.get('/:id', function(req, res) {
	var id = req.params.id
	pdb.getPost(id, function(err, post) {
		if(err) {
			res.status(404).send(err.message);
		} else {
			res.status(200).send(post);
		}
	})
});

router.post('/create', function(req, res){
	pdb.addPost(req.body, function(err,success) {
		if(err) {
			res.status(400).send(err.message);
		} else 
		res.sendStatus(200) ;
		
	})
});

// TODO
router.post('/update/', function(req, res){res.sendStatus(400) });
router.delete('/delete/:id', function(req, res){res.sendStatus(400) });

module.exports = router;