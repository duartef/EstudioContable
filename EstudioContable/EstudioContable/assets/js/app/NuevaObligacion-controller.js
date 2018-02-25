App.controller('NuevaObligacionController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Nueva Obligación", description: "Nueva Obligación" };

    $scope.obligacionAgId = '';

    $scope.obligacionAg = {
        Nombre: '',
        Ano: ''
    }

    $scope.validationOptions = {
        rules: {
            Nombre: {
                required: true,
            },
            Ano: {
                required: true,
                //maxlength: 9
            },
        }
    }

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterObligacionAg',
                dataType: 'json',
                data: {
                    Nombre: $scope.obligacionAg.Nombre,
                    Ano: $scope.obligacionAg.Ano
                },
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            }).
            then(function (response) {
                if (response != null && response.data.startsWith("Error") == true) {
                    $scope.showErrorMessage = true;
                } else {
                    $scope.obligacionAgId = response.data;
                    alert("Obligación guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.helpers.uiLoader('hide');

    //Registros de Obligacion

    $scope.obligacionId = '';
    $scope.obligacion = {
        ObligacionAgId: '',
        Nombre: ''
    }

    $scope.validateObligacion = {
        rules: {
            Nombre: {
                required: true,
            }
        }
    }

    $scope.registerObligacion = function (form) {
        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterObligacion',
                dataType: 'json',
                data: {
                    Nombre: $scope.obligacion.Nombre,
                    ObligacionAgId: $scope.obligacionAgId
                },
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            }).
            then(function (response) {
                if (response != null && response.data.startsWith("Error") == true) {
                    $scope.showErrorMessage = true;
                } else {
                    $scope.obligacionId = response.data;
                    $scope.refreshConfigs();
                    alert("Obligación guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    //Registros de Obligacion

    //Config de Obligacion

    $scope.configs = [];

    $scope.refreshConfigs = function () {
        $scope.helpers.uiLoader('show');
        var a = String($scope.obligacionId);
        $http.get('/api/Service/GetConfigsObligaciones/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.configs = response.data;
               }
               $scope.helpers.uiLoader('hide');
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
               $scope.helpers.uiLoader('hide');
           }
        );
    }

    $scope.updateConfig = function (id, dia) {
        $http({
            url: '/Account/UpdateConfig',
            dataType: 'json',
            data: {
                Id: id,
                Dia: dia
            },
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).
            then(function (response) {
                if (response != null && response.data.startsWith("Error") == true) {
                    $scope.showErrorMessage = true;
                } else {
                    $scope.obligacionId = response.data;
                    alert("Obligación guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
    }

    //Config de Obligacion

}]);