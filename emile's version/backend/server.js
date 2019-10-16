import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userSchema from './models/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/users', {
                    useNewUrlParser : true,
                    useUnifiedTopology : true,
                    useCreateIndex : true
                });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

//GET all users
app.get('/users', function(req, res){
    userSchema.find(function(err, users){
        if (err) 
            res.send(err.message);
        else
            res.json(users);
    })
})

//ADD user
app.post('/users/add', function(req, res){
    var user = new userSchema(req.body);
    user.save(function(err, user){
        if (err)
            res.status(400).send(err.message);
        else
            res.status(200).send("User '"+req.body.username+"' was successfully created");
    });
});

// GET user
app.get('/users/:username', function(req, res){
    userSchema.find({username: req.params.username}, function(err, user) {
        if (user == '')
            res.status(400).send("Failed to retrieve user '"+req.params.username+"'");
        else
            res.status(200).json(user);
    });
});

//UPDATE user info
app.post('/users/update/:username', function(req, res){
    userSchema.update({username: req.params.username}, req.body, function(err, user){
        if (err) 
            res.status(400).send(err.errmsg);
        else if (user.n == 0)
            res.send("Failed to retrieve user '"+req.params.username+"'");
        else if (user.nModified == 0)
            res.send("Nothing to modify for user '"+req.params.username+"'");
        else 
            res.json(user);
    });
});

//DELETE user
app.delete('/users/delete/:username', function(req, res){
    userSchema.deleteOne({username: req.params.username}, function(err, user){
        if (err) 
            res.status(400).send(err.errmsg);
        else if (user.deletedCount == 0)
            res.status(400).send("Failed to retrieve user '"+req.params.username+"'");
        else
            res.send("User '"+req.params.username+"' was successfully deleted");
    });
});

app.use('/', express.Router());

app.listen(8080, () => console.log('Express server running on port 8080'));