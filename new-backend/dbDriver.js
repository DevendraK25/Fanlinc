import mongoose from 'mongoose';
import express from 'express';
import userSchema from './models/user';

function connection() { 
  const uri = "mongodb+srv://user:Password@cluster0-pu5as.mongodb.net/test?retryWrites=true&w=majority";
  mongoose.connect(uri, {
                      useNewUrlParser : true,
                      useUnifiedTopology : true,
                      useCreateIndex : true,
                  });
  const connection = mongoose.connection;
  connection.once('open', () => {
      console.log('MongoDB database connection established successfully!');
  });
}

//GET all users
function getAllUsers(req, res) {
    userSchema.find(function(err, users){
        if (err) 
            res.send(err.message);
        else
            res.json(users);
    })
}

//ADD user
function addUser(req, res){
    var user = new userSchema(req.body);
    user.save(function(err, user){
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send(user);
    });
}

// GET user
function getUser(req, res){
    userSchema.find({username: req.params.username, password: req.params.password}, function(err, user) {
        if (err) 
            res.status(400).send(err.errmsg);
        if (user == '')
            res.status(404).send("User '"+req.params.username+"' not found");
        else
            res.status(200).send(user);
    });
}

//UPDATE user info
function updateUser(req, res){
    userSchema.update({username: req.params.username}, req.body, function(err, user){
        if (err) 
            res.status(400).send(err.errmsg);
        else if (user.n == 0)
            res.status(404).send("User '"+req.params.username+"' not found");
        else if (user.nModified == 0)
            res.status(200).send("Nothing to modify for user '"+req.params.username+"'");
        else 
            res.status(200).send(user);
    });
}

//DELETE user
function deleteUser(req, res){
    userSchema.deleteOne({username: req.params.username}, function(err, user){
        if (err) 
            res.status(400).send(err.errmsg);
        else if (user.deletedCount == 0)
            res.status(404).send("User '"+req.params.username+"' not found");
        else
            res.send("User '"+req.params.username+"' was successfully deleted");
    });
}

module.exports = {
  connection : connection,
  getAllUsers : getAllUsers,
  getUser : getUser,
  addUser : addUser,
  updateUser : updateUser,
  deleteUser : deleteUser
}