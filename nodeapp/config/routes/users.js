/**
 * Please refer below link
 * https://www.sitepoint.com/user-authentication-mean-stack/
 */
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlProfile = require(__base + 'app/controllers/profile');
var ctrlAuth = require(__base + 'app/controllers/authentication');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Read profile
 */
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
