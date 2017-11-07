App.controller('AboutController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Perfil" };
    $scope.$parent.isHome = true;

    $scope.helpers.uiLoader('hide');
}
]);