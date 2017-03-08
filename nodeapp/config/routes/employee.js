var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),  // mongoDB connection
    bodyParser = require("body-parser"), // parsing information from form
    methodOverride = require("method-override"); // used to manipulate POST

router.use(bodyParser.urlencoded({extended: true}));

router.use(methodOverride('_method'));

var Employee = require(__base + 'app/controllers/employee');

router.get("/", Employee.index);

router.get("/all", Employee.all);

module.exports = router;

