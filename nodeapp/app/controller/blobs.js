'use strict';

var Blob =  require(__base + "app/model/blobs").Blob;

/**
 * All blobs
 */
exports.index = function(req, res){
    console.log("#############");
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
 * All blobs
 */
exports.all = function(req, res){
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
    var company = req.body.company;
    var isloved = req.body.isloved;
    var body = {
        name: name,
        badge: badge,
        dob: dob,
        company: company,
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
 * get blob by id
 */
exports.get = function(req, res){
    Blob.get({_id: req.params.id}, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * update blob
 */
exports.update = function(req, res){
    Blob.updateById(req.params.id, req.body, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * delete blob
 */
exports.delete = function(req, res){
    Blob.remove({_id: req.params.id}, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * New blob
 */
exports.new = function(req, res){
    res.render('blobs/new', { title: 'Add New Blob' });
};


