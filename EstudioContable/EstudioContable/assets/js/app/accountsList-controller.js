App.controller('AccountsListController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad" };
    $scope.$parent.isHome = true;
    $scope.usuarios = [];

    $scope.helpers.uiLoader('hide');

    //alert("hola");

    ////$scope.helpers.uiBlocks('#popUpWin', 'state_loading');
    //$http.get('/api/Service/GetAllUsuarios').then(
    //function (response) {
    //    if (response != null && response.data != null) {
    //        $scope.usuarios = response.data;
    //    }

    //    //$scope.helpers.uiLoader('hide');
    //    //$scope.helpers.uiBlocks('#popUpWin', 'state_normal');
    //},
    //function (error) {
    //    $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
    //});


}
]);