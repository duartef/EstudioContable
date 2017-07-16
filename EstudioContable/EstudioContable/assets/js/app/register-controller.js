App.controller('RegisterController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de usuario", description: "Crea una cuenta y empieza a crear y administrar el contenido." };
    $scope.showErrorMessage = false;

    $scope.user = {
        name: '',
        surname: '',
        password: '',
        cuit: '',
        actividad: '',
        jurisdiccion: '',
        email: '',
        phonenumber: ''
    }

    $scope.validationOptions = {
        rules: {
            email: {
                required: true,
                email: true
            },
            cuit: {
                required: true               
            },
            name: {
                required: true,
            },
            surname: {
                required: true,
            },
            password: {
                required: true,
                minlength: 6
            },
            password2: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            actividad: {
                required: true
            },
            jurisdiccion: {
                required: false
            },
            phonenumber: {
                required: false
            }
        }
    }



    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');
            $scope.username = $scope.user.email;

            $http({
                url: '/Account/RegisterCliente',
                dataType: 'json',
                data: {
                    UserName: $scope.user.cuit,
                    Password: $scope.user.password,
                    Name: $scope.user.name,
                    Surname: $scope.user.surname,
                    Email: $scope.user.email,
                    Cuit: $scope.user.cuit,
                    Actividad: $scope.user.actividad,
                    Jurisdiccion: $scope.user.jurisdiccion,
                    PhoneNumber: $scope.user.phonenumber
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