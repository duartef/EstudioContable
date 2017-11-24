App.controller('VerPersonaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

    $scope.usuarios = [];

    $http.get('/api/Service/GetAllPersonas').then(
    function (response) {
        if (response != null && response.data != null) {
            $scope.usuarios = response.data;
        }
        $scope.helpers.uiLoader('hide');
    },
    function (error) {
        $scope.helpers.uiLoader('hide');
        alert(error);
    });

    $scope.helpers.uiLoader('hide');
}]);