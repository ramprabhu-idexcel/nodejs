'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * @module employee
 * @description contains details of employee information, conditions & actions.
 */

var employeeSchema = new Schema({
    empno: String,
    name: String,
    salary: { type: Number },
    hiredate: { type: Date },
    dob: { type: Date },
    dept: String
});

employeeSchema.statics = {
    /**
     * get a employee
     * @param query
     * @param callback
     */
    get: function(query, callback){
        this.findOne(query, callback);
    },
    /**
     * fetch all employees
     * @param query
     * @param callback
     */
    all: function(query, callback){
        this.find(query, callback);
    },

    /**
     * Update employee by number
     */
    updateById: function(id, updateData, callback){
        this.findByIdAndUpdate(id, { $set: updateData }, callback);
    },

    /**
     * Remove employee by number
     * @param removeData
     * @param callback
     */
    removeById: function(removeData, callback){
        this.remove(removeData, callback);
    },

    /**
     * Create a new employee
     * @param data
     * @param callback
     */
    create: function(data, callback){
        var employee = new this(data);
        employee.save(callback);
    }
};

var employee = mongoose.model('employee', employeeSchema);

/**
 * Employee model export
 * @type {{Employee: *}}
 */
module.exports = {
    Employee: employee
};