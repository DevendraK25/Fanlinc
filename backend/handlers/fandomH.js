const router = require('express').Router();
const path = require('path');
var pdb = require('./../db/fandomDbDriver');

//TODO
router.get('/:name', function(req, res) {res.sendStatus(400)
});

router.post('/add', function(req, res){res.sendStatus(400)
});

router.post('/update/', function(req, res){res.sendStatus(400) });
router.delete('/delete/:id', function(req, res){res.sendStatus(400) });

module.exports = router;