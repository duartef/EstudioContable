App.controller('AccountsListController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad" };
    $scope.$parent.isHome = true;
    $scope.usuarios = [];

    $scope.helpers.uiLoader('hide');

    function getAllUsuarios() {
        //$scope.helpers.uiBlocks('#popUpWin', 'state_loading');
        $http.get('/api/Service/GetAllUsuarios').then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.usuarios = response.data;
            }

            //$scope.helpers.uiLoader('hide');
            //$scope.helpers.uiBlocks('#popUpWin', 'state_normal');
        },
        function (error) {
            $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
        });
    }
    getAllUsuarios();
}
]);