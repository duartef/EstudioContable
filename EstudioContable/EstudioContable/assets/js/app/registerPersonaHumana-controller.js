App.controller('RegisterPersonaHumanaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de Persona Humana", description: "Crea una cuenta." };
    $scope.showErrorMessage = false;
    $scope.personaHumanaCreada = false;
    $scope.personaHumanaId = '';

    $scope.actividades = [];
    $scope.conveniosColectivos = [];
    $scope.actividadesDeLaPersona = [];
    $scope.cctsDeLaPersona = [];

    $scope.personaHumana = {
        Nombre: '',
        Apellido: '',
        DNI: '',
        CUIT: '',
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
        //AgenciaAfip: '',
        DomicilioComercial: '',
        LocalidadComercial: '',
        ProvinciaComercial: '',
        NroIngresosBrutos: '',
        FechaCierre: '',
        EsEmpleador: '',
        Frecuencia: '',
        ResponsableEstudio: '',
        SituacionImpositiva: '',
        //Claves: '',
        Observaciones: ''
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

    ///////////Convenios//////////////////


    $scope.validationOptions = {
        rules: {
            Nombre: {
                required: true,
            },
            Apellido: {
                required: false,
            },
            DNI: {
                required: true,
            },
            CUIT: {
                required: true
            },
            Nacionalidad: {
                required: true
            },
            FechaNacimiento: {
                required: false
                //dataType: Date
            },
            EstadoCivil: {
                required: false
            },
            Profesion: {
                required: false
            },
            Celular: {
                required: true
                //dataType: tel
            },
            TelefonoLaboral: {
                required: false
                //dataType: tel
            },
            EmailLaboral: {
                required: true,
                email: true
            },
            EmailPersonal: {
                required: false,
                email: true
            },
            Domicilio: {
                required: false
            },
            Localidad: {
                required: false
            },
            Provincia: {
                required: false
            },
            //AgenciaAfip: {
            //    required: false
            //},
            DomicilioComercial: {
                required: false
            },
            LocalidadComercial: {
                required: false
            },
            ProvinciaComercial: {
                required: false
            },
            NroIngresosBrutos: {
                required: false
            },
            FechaCierre: {
                required: false
                //dataType: Date
            },
            esEmpleador: {
                required: false
                //dataType: Boolean
            },
            Frecuencia: {
                required: false
            },
            ResponsableEstudio: {
                required: false
            },
            SituacionImpositiva: {
                required: false
            },
            Observaciones: {
                required: false
            }
        }
    }

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterPersonaHumana',
                dataType: 'json',
                data: {
                    Nombre: $scope.personaHumana.Nombre,
                    Apellido: $scope.personaHumana.Apellido,
                    Dni: $scope.personaHumana.DNI,
                    Cuit: $scope.personaHumana.CUIT,
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
                    //AgenciaAfip: $scope.personaHumana.AgenciaAfip,
                    DomicilioComercial: $scope.personaHumana.DomicilioComercial,
                    LocalidadComercial: $scope.personaHumana.LocalidadComercial,
                    ProvinciaComercial: $scope.personaHumana.ProvinciaComercial,
                    NroIngresosBrutos: $scope.personaHumana.NroIngresosBrutos,
                    FechaCierreEjercicios: $scope.personaHumana.FechaCierre,
                    EsEmpleador: $scope.personaHumana.esEmpleador,
                    FrecAtencion: $scope.personaHumana.Frecuencia,
                    Responsable: $scope.personaHumana.ResponsableEstudio,
                    SituacionImpositiva: $scope.personaHumana.SituacionImpositiva,
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

    $scope.helpers.uiLoader('hide');
}]);