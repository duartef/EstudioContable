App.controller('RegisterDirectorioController', ['$scope', '$window', '$http', function ($scope, $window, $http) {

    var vm = this;
    $scope.$parent.header = { title: "Registro de Directorio", description: "Crea el Directorio." };
    $scope.showErrorMessage = false;

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
            Cargo: {
                required: false
            },
            FechaDesignacion: {
                required: false,
                //dataType: Date
            },
            VencimientoMandato: {
                required: false,
                //dataType: Date
            },
        }
    }

    $scope.addDirector = function (form) {
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