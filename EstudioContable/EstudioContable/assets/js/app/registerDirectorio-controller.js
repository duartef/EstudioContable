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
        VencimientoMandato: ''
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

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterDirector',
                dataType: 'json',
                data: {
                    Nombre: $scope.Director.nombre,
                    Apellido: $scope.Director.apellido,
                    Dni: $scope.Director.dni,
                    Cuit: $scope.Director.cuit,
                    Nacionalidad: $scope.Director.nacionalidad,
                    FechaNacimiento: $scope.Director.fechaNacimiento,
                    EstadoCivil: $scope.Director.estadoCivil,
                    Celular: $scope.Director.profesion,
                    EmailLaboral: $scope.Director.EmailLaboral,
                    Domicilio: $scope.Director.Domicilio,
                    Localidad: $scope.Director.Localidad,
                    Provincia: $scope.Director.Provincia,
                    Cargo: $scope.Director.Cargo,
                    FechaDesignacion: $scope.Director.FechaDesignacion,
                    VencimientoMandato: $scope.Director.VencimientoMandato,
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