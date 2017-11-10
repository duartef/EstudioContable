App.controller('ProfesionalesController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Profesionales" };
    $scope.$parent.isHome = true;

    $scope.helpers.uiLoader('hide');
}
]);