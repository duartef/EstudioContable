App.controller('VerPersonaHumanaController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

    $scope.personaHumanaId = '';
    $scope.personaHumana = {
        Nombre: '',
        Apellido: '',
        Dni: '',
        Cuit: '',
        Nacionalidad: '',
        FechaNacimiento: '',
        EstadoCivil: '',
        Profesion: '',
        Celular: '',
        TelefonoLaboral: '',
        EmailLaboral: '',
        EmailPersonal: '',
        Domicilio: '',
        Localidad: '',
        Provincia: '',
        AgenciaAfip: '',
        DomicilioComercial: '',
        LocalidadComercial: '',
        ProvinciaComercial: '',
        NroIngresosBrutos: '',
        FechaCierreEjercicios: '',
        EsEmpleador: '',
        FrecAtencion: '',
        Responsable: '',
        SituacionImpositiva: '',
        Claves: '',
        Observaciones: ''
    }

    function getPersonaHumana() {
        $scope.personaHumanaId = $location.search().id;

        $http.get('/api//Service/GetPersonaHumana/' + $scope.personaHumanaId).then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.personaHumana = response.data;
                //var datePartials = $scope.personaHumana.FechaNacimiento.split("-");
                //var dateModel = new Date(datePartials[0], datePartials[1] - 1, datePartials[2]);
                $scope.personaHumana.FechaNacimiento = new Date($scope.personaHumana.FechaNacimiento);
                $scope.personaHumana.FechaCierreEjercicios = new Date($scope.personaHumana.FechaCierreEjercicios);

                $scope.refreshActividades();
                $scope.refreshConvenios();
                $scope.helpers.uiLoader('hide');
            }
        },
        function (error) {
            $scope.helpers.uiLoader('hide');
        });
    }
    ///////////Actividades////////////////
    $scope.addActividad = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/AddActividad',
                dataType: 'json',
                data: {
                    ActividadId: event.target.id,
                    PersonaHumanaId: $scope.personaHumanaId
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
                    PersonaHumanaId: $scope.personaHumanaId
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
        var a = String($scope.personaHumanaId);
        $http.get('/api/Service/GetActividadesDeLaPersonaHumana/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.actividadesDeLaPersona = response.data;
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
               //$("#myTable").dataTable().data = $scope.usuarios;
           }



           //$scope.helpers.uiLoader('hide');
           //$scope.helpers.uiBlocks('#popUpWin', 'state_normal');
       },
       function (error) {
           $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
       }
    );

    ///////////Actividades////////////////

    ///////////Convenios//////////////////
    $scope.addCCT = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/AddCCT',
                dataType: 'json',
                data: {
                    CctId: event.target.id,
                    PersonaHumanaId: $scope.personaHumanaId
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

    $scope.refreshConvenios = function () {
        var a = String($scope.personaHumanaId);
        $http.get('/api/Service/GetConveniossDeLaPersona/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.cctsDeLaPersona = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }

    $scope.removeCCT = function (event) {
        if (event.target.id == null || event.target.id == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveCCT',
                dataType: 'json',
                data: {
                    Id: event.target.id,
                    CctId: 0,
                    PersonaHumanaId: $scope.personaHumanaId
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

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/ActualizarPersonaHumana',
                dataType: 'json',
                data: {
                    Id: $scope.personaHumana.Id,
                    UserId: $scope.personaHumana.UserId,
                    Nombre: $scope.personaHumana.Nombre,
                    Apellido: $scope.personaHumana.Apellido,
                    Dni: $scope.personaHumana.Dni,
                    Cuit: $scope.personaHumana.Cuit,
                    Nacionalidad: $scope.personaHumana.Nacionalidad,
                    FechaNacimiento: $scope.personaHumana.FechaNacimiento,
                    EstadoCivil: $scope.personaHumana.EstadoCivil,
                    Profesion: $scope.personaHumana.Profesion,
                    Celular: $scope.personaHumana.Celular,
                    TelefonoLaboral: $scope.personaHumana.TelefonoLaboral,
                    EmailLaboral: $scope.personaHumana.EmailLaboral,
                    EmailPersonal: $scope.personaHumana.EmailPersonal,
                    Domicilio: $scope.personaHumana.Domicilio,
                    Localidad: $scope.personaHumana.Localidad,
                    Provincia: $scope.personaHumana.Provincia,
                    AgenciaAfip: $scope.personaHumana.AgenciaAfip,
                    DomicilioComercial: $scope.personaHumana.DomicilioComercial,
                    LocalidadComercial: $scope.personaHumana.LocalidadComercial,
                    ProvinciaComercial: $scope.personaHumana.ProvinciaComercial,
                    NroIngresosBrutos: $scope.personaHumana.NroIngresosBrutos,
                    FechaCierreEjercicios: $scope.personaHumana.FechaCierreEjercicios,
                    EsEmpleador: $scope.personaHumana.esEmpleador,
                    FrecAtencion: $scope.personaHumana.FrecAtencion,
                    Responsable: $scope.personaHumana.Responsable,
                    SituacionImpositiva: $scope.personaHumana.SituacionImpositiva,
                    Claves: $scope.personaHumana.Claves,
                    Observaciones: $scope.personaHumana.Observaciones
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
                    $scope.personaHumanaId = response.data;
                    alert("Persona guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    getPersonaHumana();

    //$scope.helpers.uiLoader('hide');
}]);