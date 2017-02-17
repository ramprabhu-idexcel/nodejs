'use strict';

var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),  // mongoDB connection
    bodyParser = require("body-parser"), // parsing information from form
    methodOverride = require("method-override"); // used to manipulate POST

router.use(bodyParser.urlencoded({extended: true}));

router.use(methodOverride('_method'));

var Blob = require(__base + 'app/controller/blobs');


router.get("/blob11", Blob.index);


/**
 * build the REST operations at the base for blobs
 * this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
 **/
router.route("/")
    .get(function(req, res, next){
        mongoose.model('Blob').find({}, function(err, blobs){
            if(err){
                return console.error(err);
            }
            else{
                res.format({
                    html: function(){
                        res.render('blobs/index',{
                            title: "All my blobs",
                            "blobs": blobs
                        })
                    },
                    // Json response
                    json: function(){
                        res.json(infophotos)
                    }
                })
            }
        });
    })
/**
 * POST a new blob
 */
    .post(function(req, res, next){
        /**
         * Get values from POST request. These can be done through forms or REST calls.
         * These rely on the "name" attributes for forms
         */
        var name = req.body.name;
        var badge = req.body.badge;
        var dob = req.body.dob;
        var company = req.body.company;
        var isloved = req.body.isloved;

        //call the create function for our database
        mongoose.model('Blob').create({
            name: name,
            badge: badge,
            dob: dob,
            company: company,
            isloved: isloved
        }, function(err, blob){
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else{
                console.log('POST creating new blob: ' + blob);
                res.format({
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs");
                    },
                    json: function(){
                        res.json(blob);
                    }
                });
            }
        });
    });

/* GET New Blob page. */
router.get("/new", function(req, res){
    res.render('blobs/new', { title: 'Add New Blob' });
});


// route middleware to validate :id
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

// we need to GET an individual blob to display it

router.route('/:id')
    .get(function(req, res) {
        mongoose.model('Blob').findById(req.id, function (err, blob) {
            if (err) {
                console.log('GET Error: There was a problem retrieving: ' + err);
            } else {
                console.log('GET Retrieving ID: ' + blob._id);
                var blobdob = blob.dob.toISOString();
                blobdob = blobdob.substring(0, blobdob.indexOf('T'))
                res.format({
                    html: function(){
                        res.render('blobs/show', {
                            "blobdob" : blobdob,
                            "blob" : blob
                        });
                    },
                    json: function(){
                        res.json(blob);
                    }
                });
            }
        });
    });

//GET the individual blob by Mongo ID
router.get('/:id/edit', function(req, res) {
    //search for the blob within Mongo
    mongoose.model('Blob').findById(req.id, function (err, blob) {
        if (err) {
            console.log('GET Error: There was a problem retrieving: ' + err);
        } else {
            //Return the blob
            console.log('GET Retrieving ID: ' + blob._id);
            //format the date properly for the value to show correctly in our edit form
            var blobdob = blob.dob.toISOString();
            blobdob = blobdob.substring(0, blobdob.indexOf('T'));
            res.format({
                //HTML response will render the 'edit.jade' template
                html: function(){
                    res.render('blobs/edit', {
                        title: 'Blob' + blob._id,
                        "blobdob" : blobdob,
                        "blob" : blob
                    });
                },
                //JSON response will return the JSON output
                json: function(){
                    res.json(blob);
                }
            });
        }
    });
});


//PUT to update a blob by ID
router.put('/:id/edit', function(req, res) {
    // Get our REST or form values. These rely on the "name" attributes
    var name = req.body.name;
    var badge = req.body.badge;
    var dob = req.body.dob;
    var company = req.body.company;
    var isloved = req.body.isloved;

    //find the document by ID
    mongoose.model('Blob').findById(req.id, function (err, blob) {
        //update it
        blob.update({
            name : name,
            badge : badge,
            dob : dob,
            isloved : isloved
        }, function (err, blobID) {
            if (err) {
                res.send("There was a problem updating the information to the database: " + err);
            }
            else {
                //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                res.format({
                    html: function(){
                        res.redirect("/blobs/" + blob._id);
                    },
                    //JSON responds showing the updated values
                    json: function(){
                        res.json(blob);
                    }
                });
            }
        })
    });
});


//DELETE a Blob by ID
router.delete('/:id/edit', function (req, res){
    //find blob by ID
    mongoose.model('Blob').findById(req.id, function (err, blob) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            blob.remove(function (err, blob) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + blob._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                        html: function(){
                            res.redirect("/blobs");
                        },
                        //JSON returns the item with the message that is has been deleted
                        json: function(){
                            res.json({message : 'deleted',
                                item : blob
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;