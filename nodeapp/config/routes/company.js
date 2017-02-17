var Company = require(__base + 'app/controller/company');

// API server
module.exports = function(router){
    router.get('/api/companies', Company.all),
    router.post('/api/companies', Company.create),
    router.get("/api/company/:id", Company.get),
    router.put("/api/company/:id", Company.update),
    router.delete("/api/company/:id", Company.delete)
};