companyTodo.service("companyService", function($http){
    this.loadCompanies = function(){ return $http.get("/api/companies") };
    this.createCompany = function(company) { return $http.post("/api/companies", company) };
    this.deleteCompany = function(id) { return $http.delete("/api/company/"+ id) };
    this.updateCompany = function(id, company) { return $http.put("/api/company/"+ id, company) }
});
