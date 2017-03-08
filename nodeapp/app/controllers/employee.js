'use strict';

var Employee =  require(__base + "app/models/employee").Employee;

/**
 * employees UI calls
 * @param req
 * @param res
 */
exports.index = function(req, res){
    Employee.all(req.body, function(err, result){
        if(err){
            return res.send(err);
        }
        else{
            res.format({
                html: function(){
                    res.render('employees/index',{
                        title: "All employees",
                        "employees": result
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
 * All employees
 */
exports.all = function(req, res){
    Employee.all(req.body, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};


/**
 * create employee
 */
exports.create = function(req, res){
    Employee.create(req.body, function(err, result){
        if(!err){
            Employee.find({}, function(err, employees){
                return res.json(employees);
            });
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * get employee by id
 */
exports.get = function(req, res){
    Employee.get({_id: req.params.id}, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * update employee
 */
exports.update = function(req, res){
    Employee.updateById(req.params.id, req.body, function(err, result){
        if(!err){
            Employee.find({}, function(err, employees){
                return res.json(employees);
            });
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * delete employee
 */
exports.delete = function(req, res){
    Employee.removeById({_id: req.params.id}, function(err, result){
        if(!err){
            Employee.find({}, function(err, employees){
                return res.json(employees);
            });
        }
        else{
            return res.send(err);
        }
    });
};
