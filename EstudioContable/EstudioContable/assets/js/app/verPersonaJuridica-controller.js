App.controller('VerPersonaJuridicaController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

    $scope.personaHumana = {
        Denomicacion: '',
        CUIT: '',
        TipoDePersonaJuridica: '',
        Domicilio: '',
        Localidad: '',
        Provincia: '',
        AgenciaAfip: '',
        Celular: '',
        TelefonoLaboral: '',
        EmailLaboral: '',
        EmailPersonal: '',
        DomicioComercial: '',
        LocalidadComercial: '',
        ProvinciaComercial: '',
        NumeroIngresosBrutos: '',
        FechaCierre: '',
        Actividades: '',
        EsEmpleador: '',
        CCT: '',
        Frecuencia: '',
        ResponsableEstudio: '',
        ResNum: '',
        TomoN: '',
        FechaRes: '',
        FolioD: '',
        FolioH: '',
        MatriculaNum: '',
        Claves: '',
        Observaciones: ''
    }

    function getPersonaJuridica() {
        var id = $location.search().id;

        $http.get('/api//Service/GetPersonaJuridica/' + id).then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.personaJuridica = response.data;
                $scope.helpers.uiLoader('hide');
            }
        },
        function (error) {
            $scope.helpers.uiLoader('hide');
        });
    }
    /////////////////////////Add actividad & Remove////

    $scope.addActividadPJ = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/AddActividadJuridica',
                dataType: 'json',
                data: {
                    ActividadId: event.target.id,
                    PersonaJuridicaID: $scope.PersonaJuridicaId
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
                    alert("Actividad agregadad con éxito");
                    $scope.refreshActividades();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.removeActividad = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveActividad',
                dataType: 'json',
                data: {
                    Id: event.target.id,
                    ActividadId: 0,
                    PersonaJuridicaId: $scope.PersonaJuridicaId
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
                    alert("Actividad eliminada con éxito");
                    $scope.refreshActividades();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.refreshActividades = function () {
        $scope.helpers.uiLoader('show');
        var a = String($scope.PersonaJuridicaId);
        $http.get('/api/Service/GetActividadesDeLaPersonaJuridica/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.actividadesDeLaPersonaJuridica = response.data;
               }
               $scope.helpers.uiLoader('hide');
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
               $scope.helpers.uiLoader('hide');
           }
        );
    }

    $http.get('/api/Service/GetAllActividades').then(
       function (response) {
           if (response != null && response.data != null) {
               $scope.actividades = response.data;
           }
       },
       function (error) {
           $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
       }
    );

    ///////////////END ADD ACTIVIDADPJ///////////////////////////

    /////////////////////CONVENIOS////////////////////////////////

    $scope.addCCT = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/AddCCTJuridica',
                dataType: 'json',
                data: {
                    CctId: event.target.id,
                    PersonaJuridicaId: $scope.PersonaJuridicaId
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
                    alert("Convenio agregado con éxito");
                    $scope.refreshConvenios();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }
    ////////////este no se/////////////////
    $scope.refreshConvenios = function () {
        var a = String($scope.PersonaJuridicaId);
        $http.get('/api/Service/GetConveniossDeLaPersonaJuridica/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.cctsDeLaPersonaJuridica = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }

    $scope.removeCCTJuridica = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/AddCCTJuridica',
                dataType: 'json',
                data: {
                    Id: event.target.id,
                    CctId: 0,
                    PersonaJuridicaId: $scope.PersonaJuridicaId
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
                    alert("Convenio eliminado con éxito");
                    $scope.refreshConvenios();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $http.get('/api/Service/GetAllConvenios').then(
       function (response) {
           if (response != null && response.data != null) {
               $scope.conveniosColectivos = response.data;
               //$("#myTable").dataTable().data = $scope.usuarios;
           }
       },
       function (error) {
           $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
       }
    );

    getPersonaJuridica();

    //$scope.helpers.uiLoader('hide');
}]);