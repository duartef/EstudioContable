App.controller('VerObligacionController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$parent.header = { title: "Obligación", description: "Obligación" };

    $scope.obligacionAgId = '';

    $scope.obligacionAg = {
        Nombre: '',
        Ano: ''
    }

    function getObligacionAg() {
        $scope.obligacionAgId = $location.search().id;

        $http.get('/api//Service/GetObligacionAg/' + $scope.obligacionAgId).then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.obligacionAg = response.data;

                $scope.refreshObligaciones();
                $scope.helpers.uiLoader('hide');
            }
        },
        function (error) {
            $scope.helpers.uiLoader('hide');
        });
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
    $scope.obligaciones = [];

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
                    $scope.refreshObligaciones();
                    alert("Obligación guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.refreshObligaciones = function () {
        $scope.helpers.uiLoader('show');
        var a = String($scope.obligacionAgId);
        $http.get('/api/Service/GetObligacionesDeLaAgrupacion/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.obligaciones = response.data;
               }
               $scope.helpers.uiLoader('hide');
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
               $scope.helpers.uiLoader('hide');
           }
        );
    }

    //Registros de Obligacion

    //Config de Obligacion

    $scope.configs = [];
    $scope.cuit0 = "";
    $scope.cuit1 = "";
    $scope.cuit2 = "";
    $scope.cuit3 = "";
    $scope.cuit4 = "";
    $scope.cuit5 = "";
    $scope.cuit6 = "";
    $scope.cuit7 = "";
    $scope.cuit8 = "";
    $scope.cuit9 = "";

    $scope.refreshConfigs = function () {
        $scope.helpers.uiLoader('show');
        var a = String($scope.obligacionId);
        $http.get('/api/Service/GetConfigsObligaciones/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.configs = response.data;
                   $scope.cuit0 = $scope.configs[0].Dia;
                   $scope.cuit1 = $scope.configs[1].Dia;
                   $scope.cuit2 = $scope.configs[2].Dia;
                   $scope.cuit3 = $scope.configs[3].Dia;
                   $scope.cuit4 = $scope.configs[4].Dia;
                   $scope.cuit5 = $scope.configs[5].Dia;
                   $scope.cuit6 = $scope.configs[6].Dia;
                   $scope.cuit7 = $scope.configs[7].Dia;
                   $scope.cuit8 = $scope.configs[8].Dia;
                   $scope.cuit9 = $scope.configs[9].Dia;
               }
               $scope.helpers.uiLoader('hide');
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
               $scope.helpers.uiLoader('hide');
           }
        );
    }

    $scope.openConfigs = function(obligacion){
        $scope.obligacionId = obligacion.Id;
        $scope.obligacion = obligacion;
        $scope.refreshConfigs();
        //$scope.refreshObligaciones();
    }

    $scope.updateConfig = function () {
        $scope.configs[0].Dia = $scope.cuit0;
        $scope.configs[1].Dia = $scope.cuit1;
        $scope.configs[2].Dia = $scope.cuit2;
        $scope.configs[3].Dia = $scope.cuit3;
        $scope.configs[4].Dia = $scope.cuit4;
        $scope.configs[5].Dia = $scope.cuit5;
        $scope.configs[6].Dia = $scope.cuit6;
        $scope.configs[7].Dia = $scope.cuit7;
        $scope.configs[8].Dia = $scope.cuit8;
        $scope.configs[9].Dia = $scope.cuit9;

        $http({
            url: '/Account/UpdateConfig',
            dataType: 'json',
            data: {
                Configs: $scope.configs
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

        //for (var i = 0; i < $scope.configs.length; i++) {
        //    $http({
        //        url: '/Account/UpdateConfig',
        //        dataType: 'json',
        //        data: {
        //            Id: id,
        //            Dia: dia
        //        },
        //        method: 'POST',
        //        headers: {
        //            "Content-Type": "application/json"
        //        }
        //    }).
        //    then(function (response) {
        //        if (response != null && response.data.startsWith("Error") == true) {
        //            $scope.showErrorMessage = true;
        //        } else {
        //            $scope.obligacionId = response.data;
        //            alert("Obligación guardada con éxito");
        //        }
        //        $scope.helpers.uiLoader('hide');
        //    }, function (error) {
        //        $scope.showErrorMessage = true;
        //        $scope.helpers.uiLoader('hide');
        //    });
        //}
        
    }

    //Config de Obligacion

    //$('#exampleModal').on('show.bs.modal', function () {
    //    document.getElementById("registerDirectorio").reset();
    //});

    getObligacionAg();

}]);