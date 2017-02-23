'use strict';

var mongoose = require('mongoose');

var blobSchema = new mongoose.Schema({
    name: { type: String },
    badge: { type: Number },
    dob: { type: Date, default: Date.now },
    isolved: { type: Boolean }
});

blobSchema.statics = {
    get: function(query, callback){
        this.findOne(query, callback);
    },

    /**
     * find blob return the blob objects
     * @param callback of this form
     */
    getAll: function(query, callback){
        this.find(query, callback);
    },

    /**
     * Update by blob ID
     */
    updateById: function(id, updateData, callback){
        this.update(id, { $set: updateData }, callback);
    },

    remove: function(removeData, callback){
        this.remove(removeData, callback);
    },

    create: function(data, callback){
        var blob = new this(data);
        blob.save(callback);
    },

    show: function(id, callback){

    }
};

var blob = mongoose.model('Blob', blobSchema);

/** exports blobs */
module.exports = {
    Blob: blob
};