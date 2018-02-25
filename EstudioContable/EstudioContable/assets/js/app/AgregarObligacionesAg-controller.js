App.controller('AgregarObligaciobesAgController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Agregar Obligación", description: "Obligaciones" };

    $scope.obligacionesAg = [];
    
    $http.get('/api/Service/GetAllObligaciones').then(
    function (response) {
        if (response != null && response.data != null) {
            $scope.obligacionesAg = response.data;
        }
        $scope.helpers.uiLoader('hide');
    },
    function (error) {
        $scope.helpers.uiLoader('hide');
        alert(error);
    });

    $scope.verObligacionAg = function (obligacionAg) {
        if (obligacionAg == null || obligacionAg == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            //ToDo: Ver ObligacionAg
            $window.location.href = '/Account/VerObligacionAg?id=' + obligacionAg.Id;
        }
    }    

    $scope.helpers.uiLoader('hide');
}]);