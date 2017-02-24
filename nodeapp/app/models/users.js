/**
 * Please refer below link
 * https://www.sitepoint.com/user-authentication-mean-stack/
 */

'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
/**
 * Generating a JSON web token
 */
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    hash: String,
    Salt: String
});

/**
 * Instead of saving the password to a password path
 * we will be able to pass it to the setPassword function to set the salt and hash paths in the user document
 * @param password
 */
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
 * Checking password
 */
userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};


/**
 * Adding a generateJwt method to userSchema in order to return a JWT looks like this:
 */
userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

/**
 * Register User schema
 */
var user = mongoose.model('user', userSchema);

/** exports user */
module.exports = {
    User: user
};

