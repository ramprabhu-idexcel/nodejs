/**
 * Please refer below link
 * https://www.sitepoint.com/user-authentication-mean-stack/
 */
'use strict';

var passport = require('passport');
var mongoose = require('mongoose');
var User =  require(__base + "app/models/users").User;

/**
 * To register user
 * @param req
 * @param res
 * @param next
 */
module.exports.register = function(req, res, next){
    console.log("1111111111111111");
    console.log("coming");
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token" : token
        });
    });
};

/**
 * Login User
 * @param req
 * @param res
 * @param next
 */

module.exports.login = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};



