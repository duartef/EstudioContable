App.controller('VerPersonaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Ver Persona", description: "Ver Persona." };

    $scope.usuarios = [];

    $http.get('/api/Service/GetAllPersonas').then(
    function (response) {
        if (response != null && response.data != null) {
            $scope.usuarios = response.data;
        }
        $scope.helpers.uiLoader('hide');
    },
    function (error) {
        $scope.helpers.uiLoader('hide');
        alert(error);
    });

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }

    $scope.verPersona = function (usuario) {
        if (usuario == null || usuario == '') {
            //alert("Ocurrio un error pruebe nuevamente por favor.")
        }
        else {
            var indexOfId = $scope.usuarios.findIndex(i => String(i.Id) === usuario.id);
            var usuarioSeleccionado = $scope.usuarios[indexOfId];
            if (usuarioSeleccionado.Tipo == "Persona Humana") {
                $window.location.href = '/Account/VerPersonaHumana?id=' + usuarioSeleccionado.Id;
            }
            else {
                if (usuarioSeleccionado.Tipo == "Persona Jurídica") {
                    $window.location.href = '/Account/VerPersonaJuridica?id=' + usuarioSeleccionado.Id;
                }
                else {
                    alert("Error!")
                }
            }

            //$http({
            //    url: '/Account/RemoveActividad',
            //    dataType: 'json',
            //    data: {
            //        Id: event.target.id,
            //        ActividadId: 0,
            //        PersonaJuridicaId: $scope.PersonaJuridicaId
            //    },
            //    method: 'POST',
            //    headers: {
            //        "Content-Type": "application/json"
            //    }
            //}).
            //then(function (response) {
            //    if (response != null && response.data.startsWith("Error") == true) {
            //        $scope.showErrorMessage = true;
            //    } else {
            //        alert("Actividad eliminada con éxito");
            //        $scope.refreshActividades();
            //    }
            //    $scope.helpers.uiLoader('hide');
            //}, function (error) {
            //    $scope.showErrorMessage = true;
            //    $scope.helpers.uiLoader('hide');
            //});
        }
    }

    $scope.helpers.uiLoader('hide');
}]);