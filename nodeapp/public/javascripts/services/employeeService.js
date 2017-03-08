companyTodo.service("employeeService", function($http){
    this.loadEmployees = function(){ return $http.get("/api/employees") };
    this.createEmployee = function(employee) { return $http.post("/api/employees", employee) };
    this.deleteEmployee = function(id) { return $http.delete("/api/employee/"+ id) };
    this.updateEmployee = function(id, employee) { return $http.put("/api/employee/"+ id, employee) }
});
