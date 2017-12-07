App.controller('verSocioController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Socio", description: "Socio." };
    $scope.showErrorMessage = false;
    $scope.SociosDelPJ = []

    $scope.SocioId = '';
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


    $scope.refreshSocios = function () {
        var a = String($scope.PersonaJuridicaId);
        $http.get('/api/Service/GetSociosDelPJ/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.SociosDelPJ = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }

    $scope.helpers.uiLoader('hide');
}]);