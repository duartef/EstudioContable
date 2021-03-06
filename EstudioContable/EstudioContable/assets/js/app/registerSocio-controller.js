﻿App.controller('RegisterSocioController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de Socio", description: "Crea una cuenta." };
    $scope.showErrorMessage = false;

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

    $scope.validationOptions = {
        rules: {
            Nombre: {
                required: true,
            },
            Apellido: {
                required: true,
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
                required: false,
                //dataType: Date
            },
            EstadoCivil: {
                required: false
            },
            Profesion: {
                required: false
            },

            Celular: {
                required: true,
                //dataType: tel
            },
            TelefonoLaboral: {
                required: false,
                //dataType: tel
            },
            EmailLaboral: {
                required: false
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
            CuotasAcciones: {
                required: false
            },
            PorcentajeParticipacion: {
                required: false,
                //dataType: Date
            },
        }
    }



    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
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
                    EmailLaboral: $scope.Socio.EmailLaboral,
                    Domicilio: $scope.Socio.Domicilio,
                    Localidad: $scope.Socio.Localidad,
                    Provincia: $scope.Socio.Provincia,
                    CuotasAcciones: $scope.Socio.CuotasAcciones,
                    PorcentajeParticipacion: $scope.Socio.PorcentajeParticipacion,
                    PersonaJuridicaId: $scope.PersonaJuridicaId
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
                    //$window.location.href = "/Home/Index";
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