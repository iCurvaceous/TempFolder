var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Load User Model
require('./models/user_model');
var User = mongoose.model('UserList');

//route to register user
router.get('/register', function(req,res){
    res.render('register');
});

router.post('/register', function(req,res){
    //reminder: function(req,res) is a callback function
    var errors = [];

    if(req.body.password != req.body.password2){
        errors.push({text:"Passwords do not match"});
    }

    if(req.body.password.length < 4){
        errors.push({text:"Password is less than 4 characters"});
    }

    if(errors.length > 0){
        res.render('/register',{
            errors:errors,
            company_name:req.body.company_name,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            username:req.body.username,
            email:req.body.email,
            password1:req.body.password1,
            password2:req.body.password2
        });
    } else {
        User.findOne({user_email:req.body.user_email})
        .then(function(user){
            if(user){
            //add flash message that user exists
            res.redirect('/register');
            } else {
                var newUser = new User({
                    company_name:req.body.company_name,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password
                });

                bcrypt.genSalt(10,function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err)throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(function(user){
                            res.redirect('/home');
                            $('#loginModalCenter').modal('show'); //opens login modal-javascript
                        }).catch(function(err){
                        console.log(err);
                        return;
                        });
                    })
                })
            }
        })
    }

    /*
    console.log(req.body);
    var newUser = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    new User(newUser)
    .save().then(function(user){
        res.redirect('/')
    });
    */
});

module.exports = router;