App.controller('RegisterPersonaHumanaController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de Persona Humana", description: "Crea una cuenta." };
    $scope.showErrorMessage = false;

    $scope.personaHumana = {
        nombre: '',
        apellido: '',
        dni: '',
        cuit: '',
        nacionalidad: '',
        fechaNacimiento: '',
        estadoCivil: '',
        profesion: '',
        celular: '',
        telefonoLaboral: '',
        emailLaboral: '',
        emailPersonal: '',
        domicilio: '',
        localidad: '',
        provincia: '',
        domicilioComercial: '',
        localidadComercial: '',
        provinciaComercial: '',
        nroIngresosBrutos: '',
        fechaCierreEjercicios: '',
        esEmpleador: '',
        frecAtencion: '',
        responsable: '',
        situacionImpositiva: '',
        observaciones: ''
    }

    $scope.validationOptions = {
        rules: {
            nombre: {
                required: true,
            },
            apellido: {
                required: true,
            },
            dni: {
                required: true,
            },
            cuit: {
                required: true               
            },
            nacionalidad: {
                required: true
            },
            fechaNacimiento: {
                required: false,
                dataType: Date
            },
            estadoCivil: {
                required: false
            },
            profesion: {
                required: false
            },
            celular: {
                required: true,
                dataType: tel
            },
            telefonoLaboral: {
                required: false,
                dataType: tel
            },
            emailLaboral: {
                required: true,
                dataType: email
            },
            emailPersonal: {
                required: false,
                dataType: email
            },
            domicilio: {
                required: false
            },
            localidad: {
                required: false
            },
            provincia: {
                required: false
            },
            domicilioComercial: {
                required: false
            },
            localidadComercial: {
                required: false
            },
            provinciaComercial: {
                required: false
            },
            nroIngresosBrutos: {
                required: false
            },
            fechaCierreEjercicios: {
                required: false,
                dataType: Date
            },
            esEmpleador: {
                required: false,
                dataType: Boolean
            },
            frecAtencion: {
                required: false
            },
            responsable: {
                required: false
            },
            situacionImpositiva: {
                required: false
            },
            observaciones: {
                required: false
            }
        }
    }

    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');

            $http({
                url: '/Account/RegisterPersonaHumana',
                dataType: 'json',
                data: {
                    Nombre: $scope.personaHumana.nombre,
                    Apellido: $scope.personaHumana.apellido,
                    Dni: $scope.personaHumana.dni,
                    Cuit: $scope.personaHumana.cuit,
                    Nacionalidad: $scope.personaHumana.nacionalidad,
                    FechaNacimiento: $scope.personaHumana.fechaNacimiento,
                    EstadoCivil: $scope.personaHumana.estadoCivil,
                    Profesion: $scope.personaHumana.profesion
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