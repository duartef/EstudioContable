App.controller('AboutController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad" };
    $scope.$parent.isHome = true;

    $scope.helpers.uiLoader('hide');
}
]);