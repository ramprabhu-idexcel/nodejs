'use strict';

var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),  // mongoDB connection
    bodyParser = require("body-parser"), // parsing information from form
    methodOverride = require("method-override"); // used to manipulate POST

router.use(bodyParser.urlencoded({extended: true}));

router.use(methodOverride('_method'));

var Blob = require(__base + 'app/controllers/blobs');

router.get("/", Blob.index);

router.post("/", Blob.create);

/* GET New Blob page. */
router.get("/new", function(req, res){
    res.render('blobs/new', { title: 'Add New Blob' });
});

/* search blob id */
router.get('/:id/edit', Blob.search);

/* we need to GET an individual blob to display it */
router.get("/:id", Blob.show);

/* route middleware to validate :id */
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Blob').findById(id, function (err, blob) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404);
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                },
                json: function(){
                    res.json({message : err.status  + ' ' + err});
                }
            });
            //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(blob);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

//PUT to update a blob by ID
router.put('/:id/edit', Blob.updateBlobByID);

//DELETE a Blob by ID
router.delete("/:id/edit", Blob.delete);

module.exports = router;