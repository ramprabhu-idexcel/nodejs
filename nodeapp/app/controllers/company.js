'use strict';

var Company =  require(__base + "app/models/company").Company;

/**
 * All companies
 */
exports.all = function(req, res){
    Company.getAll(req.body, function(err, result){
        if(!err){
            return res.json(result);
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * create function to create company
 */
exports.create = function(req, res){
  Company.create(req.body, function(err, result){
     if(!err){
         Company.find({}, function(err, companies){
             return res.json(companies);
         });
     }
     else{
         return res.send(err);
     }
  });
};

/**
 * get company by id
 */
exports.get = function(req, res){
  Company.get({_id: req.params.id}, function(err, result){
      if(!err){
          return res.json(result);
      }
      else{
          return res.send(err);
      }
  });
};

/**
 * update company
 */
exports.update = function(req, res){
    Company.updateById(req.params.id, req.body, function(err, result){
        if(!err){
            Company.find({}, function(err, companies){
                return res.json(companies);
            });
        }
        else{
            return res.send(err);
        }
    });
};

/**
 * delete company
 */
exports.delete = function(req, res){
    Company.removeById({_id: req.params.id}, function(err, result){
       if(!err){
           Company.find({}, function(err, companies){
               return res.json(companies);
           });
       }
       else{
           return res.send(err);
       }
    });
};


