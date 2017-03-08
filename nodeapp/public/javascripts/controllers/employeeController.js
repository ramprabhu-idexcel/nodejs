angular.module('companyTodo').controller("employeeController", function($scope, $http, employeeService){
    $scope.employee = {};

    // when submitting form & send text to Node API
    $scope.createEmployee = function(employee){
        console.log("%%%%%%%%%%%%%%%%%%");
        employeeService.createEmployee(employee)
            .success(function(data){
                $scope.employee = {};
                $scope.employees = data;
                console.log(data);
                $scope.message = "Employee has been created successfully."
            })
            .error(function(data){
                console.log("Error: "+ data);
            });
    };
});
