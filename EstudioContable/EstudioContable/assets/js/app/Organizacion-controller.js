App.controller('OrganizacionController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Organizacion" };
    $scope.$parent.isHome = true;

    $scope.helpers.uiLoader('hide');
}
]);