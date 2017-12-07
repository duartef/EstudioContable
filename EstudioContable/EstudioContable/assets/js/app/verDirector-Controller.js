App.controller('RegisterDirectorioController', ['$scope', '$window', '$http', function ($scope, $window, $http) {

    var vm = this;
    $scope.$parent.header = { title: "Registro de Directorio", description: "Crea el Directorio." };
    $scope.showErrorMessage = false;
    $scope.DirectoresDelPJ = []

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

    $scope.refreshDirectores = function () {
        var a = String($scope.PersonaJuridicaId);
        $http.get('/api/Service/GetDirectoresDelPJ/' + a).then(
           function (response) {
               if (response != null && response.data != null) {
                   $scope.DirectoresDelPJ = response.data;
               }
           },
           function (error) {
               $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
           }
        );
    }

    $scope.helpers.uiLoader('hide');
}]);