﻿App.controller('VerPersonaJuridicaController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

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
        DomicilioLegal: '',
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


    function getPersonaJuridica() {
        $scope.personaJuridicaId = $location.search().id;

        $http.get('/api//Service/GetPersonaJuridica/' + $scope.personaJuridicaId).then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.personaJuridica = response.data;
                //var datePartials = $scope.personaHumana.FechaNacimiento.split("-");
                //var dateModel = new Date(datePartials[0], datePartials[1] - 1, datePartials[2]);
                $scope.personaJuridica.FechaCierre = new Date($scope.personaJuridica.FechaCierre);
                $scope.personaJuridica.FechaRes = new Date($scope.personaJuridica.FechaRes);

                $scope.refreshActividades();
                $scope.refreshConvenios();
                $scope.refreshSocios();
                $scope.refreshDirectores();

                $scope.helpers.uiLoader('hide');
            }
        },
        function (error) {
            $scope.showErrorMessage = true;
            $scope.helpers.uiLoader('hide');
        });
    }

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        //if (form.validate()) {
        if (true) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/ActualizarPersonaJuridica',
                dataType: 'json',
                data: {
                    Id: $scope.personaJuridica.Id,
                    Denomicacion: $scope.personaJuridica.Denomicacion,
                    CUIT: $scope.personaJuridica.CUIT,
                    TipoDePersonaJuridica: $scope.personaJuridica.TipoDePersonaJuridica,
                    DomicilioLegal: $scope.personaJuridica.DomicilioLegal,
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
                    Claves: $scope.personaJuridica.Claves,
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
    $scope.actividadesDeLaPersonaJuridica = [];

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

    $scope.removeActividad = function (actividadSeleccionada) {
        if (actividadSeleccionada == null || actividadSeleccionada == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveActividadJuridica',
                dataType: 'json',
                data: {
                    Id: actividadSeleccionada.Id,
                    ActividadId: 0,
                    PersonaJuridicaId: $scope.personaJuridicaId
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
        var a = String($scope.personaJuridica.Id);
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
    $scope.cctsDeLaPersonaJuridica = [];

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

    $scope.refreshConvenios = function () {
        var a = String($scope.personaJuridica.Id);
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

    $scope.removeCCTJuridica = function (cctSeleccionado) {
        if (cctSeleccionado == null || cctSeleccionado == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveCCTJuridica',
                dataType: 'json',
                data: {
                    Id: cctSeleccionado.Id,
                    CctId: 0,
                    PersonaJuridicaId: $scope.personaJuridicaId
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

    ///////////////////// END CONVENIOS////////////////////////////////


    /////////////////////DIRECTORIO////////////////////////////////

    $scope.director = {
        Nombre: '',
        Apellido: '',
        TelefonoLaboral: '',
        DNI: '',
        CUIT: '',
        Nacionalidad: '',
        FechaNacimiento: '',
        EstadoCivil: '',
        Profesion: '',
        Celular: '',
        EmailLaboral: '',
        Domicilio: '',
        Localidad: '',
        Provincia: '',
        Cargo: '',
        FechaDesignacion: '',
        VencimientoMandato: '',
        PersonaJuridicaId: ''
    }
    $scope.direcotresPj = [];

    $('#DirectorioModal').on('show.bs.modal', function () {
        document.getElementById("registerDirectorio").reset();
    });

    $scope.refreshDirectores = function () {
        var a = String($scope.personaJuridica.Id);
        $http.get('/api/Service/GetDirectoresDelPJ/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.direcotresPj = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }
    
    $scope.addDirectorio = function (event) {
        $scope.showErrorMessage = false;

        //if (form.validate()) {
        if (true) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterDirector',
                dataType: 'json',
                data: {
                    Nombre: $scope.director.Nombre,
                    Apellido: $scope.director.Apellido,
                    Dni: $scope.director.DNI,
                    Cuit: $scope.director.CUIT,
                    Nacionalidad: $scope.director.Nacionalidad,
                    FechaNacimiento: $scope.director.FechaNacimiento,
                    EstadoCivil: $scope.director.EstadoCivil,
                    Profesion: $scope.director.Profesion,
                    EmailLaboral: $scope.director.EmailLaboral,
                    Domicilio: $scope.director.Domicilio,
                    Localidad: $scope.director.Localidad,
                    Provincia: $scope.director.Provincia,
                    Cargo: $scope.director.Cargo,
                    FechaDesignacion: $scope.director.FechaDesignacion,
                    VencimientoMandato: $scope.director.VencimientoMandato,
                    PersonaJuridicaId: $scope.personaJuridica.Id
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
                    alert("Director agregado con éxito");
                    $scope.refreshDirectores();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.removeDirector = function (directorSeleccionado) {
        if (directorSeleccionado == null || directorSeleccionado == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveDirectorPJ',
                dataType: 'json',
                data: {
                    Id: directorSeleccionado.Id,
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
                    alert("Director eliminado con éxito");
                    $scope.refreshDirectores();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    ///////////////////// END DIRECTORIO////////////////////////////////

    ///////////////////SOCIOS//////////////////////

    $scope.Socio = {
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
        Email: '',
        Domicilio: '',
        Localidad: '',
        Provincia: '',
        CuotasAcciones: '',
        PorcentajeParticipacion: '',
        PersonaJuridicaId: ''
    }

    $scope.sociosPj = [];

    $('#SocioModal').on('show.bs.modal', function () {
        document.getElementById("registerSocio").reset();
    });

    $scope.addSocio = function (event) {
        $scope.showErrorMessage = false;

        //if (form.validate()) {
        if (true) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterSocio',
                dataType: 'json',
                data: {
                    Nombre: $scope.Socio.Nombre,
                    Apellido: $scope.Socio.Apellido,
                    Dni: $scope.Socio.DNI,
                    Cuit: $scope.Socio.CUIT,
                    Nacionalidad: $scope.Socio.Nacionalidad,
                    FechaNacimiento: $scope.Socio.FechaNacimiento,
                    EstadoCivil: $scope.Socio.EstadoCivil,
                    Profesion: $scope.Socio.Profesion,
                    Celular: $scope.Socio.Celular,
                    TelefonoLaboral: $scope.Socio.TelefonoLaboral,
                    Email: $scope.Socio.Email,
                    Domicilio: $scope.Socio.Domicilio,
                    Localidad: $scope.Socio.Localidad,
                    Provincia: $scope.Socio.Provincia,
                    CuotasAcciones: $scope.Socio.CuotasAcciones,
                    PorcentajeParticipacion: $scope.Socio.PorcentajeParticipacion,
                    PersonaJuridicaId: $scope.personaJuridica.Id
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
                    alert("Socio agregado con éxito");
                    $scope.refreshSocios();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    $scope.refreshSocios = function () {
        var a = String($scope.personaJuridica.Id);
        $http.get('/api/Service/GetSociosDelPJ/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.sociosPj = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }

    $scope.removeSocio = function (socioSeleccionado) {
        if (socioSeleccionado == null || socioSeleccionado == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/RemoveSocioPJ',
                dataType: 'json',
                data: {
                    Id: socioSeleccionado.Id,
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
                    alert("Socio eliminado con éxito");
                    $scope.refreshSocios();
                }
                $scope.helpers.uiLoader('hide');
            }, function (error) {
                $scope.showErrorMessage = true;
                $scope.helpers.uiLoader('hide');
            });
        }
    }

    ///////////////////// END SOCIOS////////////////////////////////
    getPersonaJuridica();

    //$scope.helpers.uiLoader('hide');
}]);