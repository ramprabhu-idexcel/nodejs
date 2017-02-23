'use strict';

var Blob =  require(__base + "app/models/blobs").Blob;

/**
 * All blobs
 */
exports.index = function(req, res){
    Blob.getAll(req.body, function(err, result){
        if(err){
            return res.send(err);
        }
        else{
            res.format({
                html: function(){
                    res.render('blobs/index',{
                        title: "All my blobs",
                        "blobs": result
                    })
                },
                // Json response
                json: function(){
                    res.json(infophotos)
                }
            })
        }
    });
};

/**
 * create function to create blob
 */
exports.create = function(req, res){
    var name = req.body.name;
    var badge = req.body.badge;
    var dob = req.body.dob;
    var isloved = req.body.isloved;
    var body = {
        name: name,
        badge: badge,
        dob: dob,
        isloved: isloved
    };
    Blob.create(body, function(err, blob){
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
};

/**
 * New blob
 */
exports.new = function(req, res){
    res.render('blobs/new', { title: 'Add New Blob' });
};

/**
 * show blob
 */
exports.show = function(req, res){
    Blob.findById(req.id, function (err, blob) {
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
};

/**
 * search blob
 */
exports.search = function(req, res){
    Blob.findById(req.id, function (err, blob) {
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
};

/**
 * Update blob info
 */
exports.updateBlobByID = function(req, res){
    // Get our REST or form values. These rely on the "name" attributes
    var name = req.body.name;
    var badge = req.body.badge;
    var dob = req.body.dob;
    var company = req.body.company;
    var isloved = req.body.isloved;

    //find the document by ID
    Blob.findById(req.id, function (err, blob) {
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
};

/*
 * Delete a blob
 */
exports.delete = function(req, res){
    //find blob by ID
    Blob.findById(req.id, function (err, blob) {
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
};


