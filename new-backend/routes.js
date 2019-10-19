const db = require('./dbDriver');

function init(server){

  // ---database section---
  db.connection(); //connect to mongodb
  server.get('/users', function(req, res){ db.getAllUsers(req, res) })
  server.post('/users/add', function(req, res){ db.addUser(req, res) });
  server.get('/users/:username/:password', function(req, res){ db.getUser(req, res) });
  server.post('/users/update/:username', function(req, res){ db.updateUser(req, res) });
  server.delete('/users/delete/:username', function(req, res){ db.deleteUser(req, res) });
  // ---database section---

}

module.exports = {
  init : init
}