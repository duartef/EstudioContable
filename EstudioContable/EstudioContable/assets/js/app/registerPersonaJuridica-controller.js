App.controller('RegisterPersonaJuridicaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de Persona Juridica", description: "Crea una cuenta." };
    $scope.showErrorMessage = false;

    $scope.actividades = [];
    $scope.conveniosColectivos = [];
    $scope.actividadesDeLaPersonaJuridica = [];
    $scope.cctsDeLaPersonaJuridica = [];
    $scope.PersonaJuridicaId = '';

    $scope.personaJuridica = {
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

    $scope.validationOptions = {
        rules: {
            Denomicacion: {
                required: true,
            },
            CUIT: {
                required: true,
                //maxlength: 9
            },
            TipoDePersonaJuridica: {
                required: true,
            },
            DomicilioLegal: {
                required: true,
            },
            Localidad: {
                required: true,
            },
            Provincia: {
                required: true
            },
            AgenciaAfip: {
                required: false
            },
            Celular: {
                required: true
            },
            TelefonoLaboral: {
                required: true,
                //dataType: tel
            },
            EmailLaboral: {
                required: true
            },
            EmailPersonal: {
                required: false
            },
            DomicioComercial: {
                required: false
            },
            LocalidadComercial: {
                required: false
            },
            ProvinciaComercial: {
                required: false
            },
            NumeroIngresosBrutos: {
                required: false
            },
            FechaCierre: {
                required: false,
                //dataType: Date
            },
            EsEmpleador: {
                required: false
            },
            DomicioComercial: {
                required: false,
                //dataType: Boolean
            },
            Frecuencia: {
                required: false
            },
            ResponsableEstudio: {
                required: true
            },
            ResNum: {
                required: false
            },
            TomoN: {
                required: false
            },
            FechaRes: {
                required: false,
                //dataType: Date
            },
            FolioD: {
                required: false
            },
            FolioH: {
                required: false
            },
            MatriculaNum: {
                required: false,
                //dataType: Boolean
            },
            Observaciones: {
                required: false
            },
        }
    }

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterPersonaJuridica',
                dataType: 'json',
                data: {
                    Denomicacion: $scope.personaJuridica.Denomicacion,
                    cuit: $scope.personaJuridica.CUIT,
                    TipoDePersonaJuridica: $scope.personaJuridica.TipoDePersonaJuridica,
                    DomicilioLegal: $scope.personaJuridica.Domicilio,
                    Localidad: $scope.personaJuridica.Localidad,
                    Provincia: $scope.personaJuridica.Provincia,
                    AgenciaAfip: $scope.personaJuridica.AgenciaAfip,
                    Celular: $scope.personaJuridica.Celular,
                    TelefonoLaboral: $scope.personaJuridica.TelefonoLaboral,
                    EmailLaboral: $scope.personaJuridica.EmailLaboral,
                    EmailPersonal: $scope.personaJuridica.EmailPersonal,
                    DomicioComercial: $scope.personaJuridica.DomicioComercial,
                    LocalidadComercial: $scope.personaJuridica.LocalidadComercial,
                    ProvinciaComercial: $scope.personaJuridica.ProvinciaComercial,
                    NumeroIngresosBrutos: $scope.personaJuridica.NumeroIngresosBrutos,
                    FechaCierre: $scope.personaJuridica.FechaCierre,
                    EsEmpleador: $scope.personaJuridica.EsEmpleador,
                    Frecuencia: $scope.personaJuridica.Frecuencia,
                    ResponsableEstudio: $scope.personaJuridica.ResponsableEstudio,
                    ResNum: $scope.personaJuridica.ResNum,
                    TomoN: $scope.personaJuridica.TomoN,
                    FechaRes: $scope.personaJuridica.FechaRes,
                    FolioD: $scope.personaJuridica.FolioD,
                    FolioH: $scope.personaJuridica.FolioH,
                    MatriculaNum: $scope.personaJuridica.MatriculaNum,
                    Claves : $scope.personaJuridica.Claves,
                    Observaciones: $scope.personaJuridica.Observaciones
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
                    $scope.PersonaJuridicaId = response.data;
                    alert("Persona guardada con éxito");
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
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

    $scope.helpers.uiLoader('hide');
}]);