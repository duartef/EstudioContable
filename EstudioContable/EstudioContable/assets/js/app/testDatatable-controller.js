
angular.module("app").controller("TableController", function ($scope, UserService) {
    $scope.usuarios = [];
    UserService.getUsers().then(function (d) {
        $scope.usuarios = d.data;
    }, function () {
        alert("error occured try again");
    });
})
.factory("UserService", function ($http) {
    var fact = {};
    fact.getUsers = function () {
        return $http.get('/api/Service/GetAllUsuarios');
    }
    return fact;
});
