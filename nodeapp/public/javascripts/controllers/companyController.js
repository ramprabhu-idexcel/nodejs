var companyTodo = angular.module('companyTodo', []);

companyTodo.controller("companyController", function($scope, $http, companyService){
    $scope.company = {};

    // when landing on the page, get all companies and show them
    companyService.loadCompanies()
        .success(function(data){
            $scope.companies = data;
        })
        .error(function(data){
            console.log("Error: "+ data);
        });

    // when submitting form & send text to Node API
    $scope.createCompany = function(company){
        companyService.createCompany(company)
            .success(function(data){
                $scope.company = {};
                $scope.companies = data;
                console.log(data);
            })
            .error(function(data){
                console.log("Error: "+ data);
            });
    };

    // delete a company after checking it
    $scope.deleteCompany = function(id){
        companyService.deleteCompany(id)
            .success(function(data){
                $scope.companies = data;
            })
            .error(function(data){
                console.log("Error: "+ data);
            })
    };

    // update a company when submitting form
    $scope.updateCompany = function(company){
        var tempCompany = { name: company.name,
            numberOfEmployees: company.numberOfEmployees
        };
        companyService.updateCompany(company._id, tempCompany)
            .success(function(data){
                $scope.companies = data;
            })
            .error(function(data){
                console.log("Error: "+ data);
            })
    };
});

