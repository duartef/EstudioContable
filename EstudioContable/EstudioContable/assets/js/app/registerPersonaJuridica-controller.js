App.controller('RegisterPersonaJuridicaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de Persona Juridica", description: "Crea una cuenta." };
    $scope.showErrorMessage = false;


    $scope.personaJuridica = {
        Denomicacion: '',
        cuit: '',
        TipoDePersonaJuridica: '',
        DomicilioLegal: '',
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
        Observaciones: ''
    }

    $scope.validationOptions = {
        rules: {
            Denomicacion: {
                required: true,
            },
            cuit: {
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
            Actividades: {
                required: true
            },
            EsEmpleador: {
                required: false
            },
            DomicioComercial: {
                required: false,
                //dataType: Boolean
            },
            CCT: {
                required: false,
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
                    cuit: $scope.personaJuridica.cuit,
                    TipoDePersonaJuridica: $scope.personaJuridica.TipoDePersonaJuridica,
                    DomicilioLegal: $scope.personaJuridica.DomicilioLegal,
                    Localidad: $scope.personaJuridica.Localidad,
                    Provincia: $scope.personaJuridica.Provincia,
                    Celular: $scope.personaJuridica.Celular,
                    EmailLaboral: $scope.personaJuridica.EmailLaboral

                },
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            }).
            then(function (response) {
                if (response != null && response.data > 0) {
                    $scope.showErrorMessage = true;
                } else {
                    $window.location.href = "/Home/Index";
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