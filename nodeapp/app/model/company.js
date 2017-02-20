'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @module company
 * @description contains details of company information, conditions & actions.
 */

var CompanySchema = new Schema({
    name: { type: String },
    numberOfEmployees: { type: Number }
});

CompanySchema.statics = {
    /**
     * findOneCompany return one company object
     * @param id: get id to find one company by id
     * @param callback: callback for this form.
      */
    get: function(query, callback){
        this.findOne(query, callback);
    },

    /**
     * findCompany return the company objects
     * @param callback of this form
     */
    getAll: function(query, callback){
        this.find(query, callback);
    },

    /**
     * Update by company ID
     */
    updateById: function(id, updateData, callback){
        this.update(id, { $set: updateData }, callback);
    },

    removeById: function(removeData, callback){
        this.remove(removeData, callback);
    },

    create: function(data, callback){
        var company = new this(data);
        company.save(callback);
    }
};

var company = mongoose.model('company', CompanySchema);

/** exports company */
module.exports = {
    Company: company
};

