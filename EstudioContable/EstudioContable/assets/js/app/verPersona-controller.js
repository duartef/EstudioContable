App.controller('VerPersonaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

    $scope.helpers.uiLoader('hide');
}]);