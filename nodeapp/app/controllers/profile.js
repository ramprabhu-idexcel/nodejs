/**
 * Please refer below link
 * https://www.sitepoint.com/user-authentication-mean-stack/
 */
'use strict';

var mongoose = require('mongoose');
var User =  require(__base + "app/models/users").User;

/**
 * Read user profile
 * @param req
 * @param res
 */
module.exports.profileRead = function(req, res) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function(err, user) {
                res.status(200).json(user);
            });
    }
};