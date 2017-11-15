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
        nombre: '',
        apellido: '',
        dni: '',
        cuit: '',
        nacionalidad: '',
        fechaNacimiento: '',
        estadoCivil: '',
        profesion: '',
        celular: '',
        telefonoLaboral: '',
        emailLaboral: '',
        emailPersonal: '',
        domicilio: '',
        localidad: '',
        provincia: '',
        domicilioComercial: '',
        localidadComercial: '',
        provinciaComercial: '',
        nroIngresosBrutos: '',
        fechaCierreEjercicios: '',
        esEmpleador: '',
        frecAtencion: '',
        responsable: '',
        situacionImpositiva: '',
        observaciones: ''
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
        var a = String($scope.personaHumanaId);
        $http.get('/api/Service/GetActividadesDeLaPersonaHumana/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.actividadesDeLaPersona = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
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
            nombre: {
                required: true,
            },
            apellido: {
                required: false,
            },
            dni: {
                required: true,
            },
            cuit: {
                required: true
            },
            nacionalidad: {
                required: true
            },
            fechaNacimiento: {
                required: false
                //dataType: Date
            },
            estadoCivil: {
                required: false
            },
            profesion: {
                required: false
            },
            celular: {
                required: true
                //dataType: tel
            },
            telefonoLaboral: {
                required: false
                //dataType: tel
            },
            emailLaboral: {
                required: true,
                email: true
            },
            emailPersonal: {
                required: false,
                email: true
            },
            domicilio: {
                required: false
            },
            localidad: {
                required: false
            },
            provincia: {
                required: false
            },
            domicilioComercial: {
                required: false
            },
            localidadComercial: {
                required: false
            },
            provinciaComercial: {
                required: false
            },
            nroIngresosBrutos: {
                required: false
            },
            fechaCierreEjercicios: {
                required: false
                //dataType: Date
            },
            esEmpleador: {
                required: false
                //dataType: Boolean
            },
            frecAtencion: {
                required: false
            },
            responsable: {
                required: false
            },
            situacionImpositiva: {
                required: false
            },
            observaciones: {
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
                    Nombre: $scope.personaHumana.nombre,
                    Apellido: $scope.personaHumana.apellido,
                    Dni: $scope.personaHumana.dni,
                    Cuit: $scope.personaHumana.cuit,
                    Nacionalidad: $scope.personaHumana.nacionalidad,
                    FechaNacimiento: $scope.personaHumana.fechaNacimiento,
                    EstadoCivil: $scope.personaHumana.estadoCivil,
                    Profesion: $scope.personaHumana.profesion,
                    Celular: $scope.personaHumana.celular,
                    TelefonoLaboral: $scope.personaHumana.telefonoLaboral,
                    EmailLaboral: $scope.personaHumana.emailLaboral,
                    EmailPersonal: $scope.personaHumana.emailPersonal,
                    Domicilio: $scope.personaHumana.domicilio,
                    Localidad: $scope.personaHumana.localidad,
                    Provincia: $scope.personaHumana.provincia,
                    DomicilioComercial: $scope.personaHumana.domicilioComercial,
                    LocalidadComercial: $scope.personaHumana.localidadComercial,
                    ProvinciaComercial: $scope.personaHumana.provinciaComercial,
                    NroIngresosBrutos: $scope.personaHumana.nroIngresosBrutos,
                    FechaCierreEjercicios: $scope.personaHumana.fechaCierreEjercicios,
                    EsEmpleador: $scope.personaHumana.esEmpleador,
                    FrecAtencion: $scope.personaHumana.frecAtencion,
                    Responsable: $scope.personaHumana.responsable,
                    SituacionImpositiva: $scope.personaHumana.situacionImpositiva,
                    Observaciones: $scope.personaHumana.observaciones
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