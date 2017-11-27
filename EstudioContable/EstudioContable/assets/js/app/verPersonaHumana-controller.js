App.controller('VerPersonaHumanaController', ['$scope', '$location', '$window', '$http', function ($scope, $location, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

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
        AgenciaAfip: '',
        DomicilioComercial: '',
        LocalidadComercial: '',
        ProvinciaComercial: '',
        NroIngresosBrutos: '',
        FechaCierreEjercicios: '',
        EsEmpleador: '',
        Frecuencia: '',
        ResponsableEstudio: '',
        SituacionImpositiva: '',
        Claves: '',
        Observaciones: ''
    }

    function getPersonaHumana() {
        var id = $location.search().id;

        $http.get('/api//Service/GetPersonaHumana/' + id).then(
        function (response) {
            if (response != null && response.data != null) {
                $scope.personaHumana = response.data;
                $scope.helpers.uiLoader('hide');
            }
        },
        function (error) {
            $scope.helpers.uiLoader('hide');
        });
    }

    getPersonaHumana();

    //$scope.helpers.uiLoader('hide');
}]);