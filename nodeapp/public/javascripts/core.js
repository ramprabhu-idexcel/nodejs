var companyTodo = angular.module('companyTodo', []);

companyTodo.controller("companyController", function($scope, $http){
    $scope.formData = {};

    // when landing on the page, get all companies and show them
    $http.get("/api/companies")
        .success(function(data){
            $scope.companies = data;
        })
        .error(function(data){
            console.log("Error: "+ data);
        });

    // when submitting form & send text to Node API
    $scope.createCompany = function(company){
        $http.post("/api/companies", company)
            .success(function(data){
                $scope.formData = {};
                $scope.companies = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+ data);
            });
    };

    // delete a company after checking it
    $scope.deleteCompany = function(id){
        $http.delete("/api/company/"+ id)
            .success(function(data){
                $scope.companies = data;
            })
            .error(function(data){
                console.log("Error: "+ data);
            })
    };
});

