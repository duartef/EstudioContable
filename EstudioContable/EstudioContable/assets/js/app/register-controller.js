App.controller('RegisterController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Registro de usuario", description: "Crea una cuenta y empieza a crear y administrar el contenido." };
    $scope.showErrorMessage = false;

    $scope.user = {
        name: '',
        surname: '',
        username: '',
        password: '',
        cuit: ''
    }

    $scope.validationOptions = {
        rules: {
            username: {
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
            }
        }
    }



    $scope.register = function (form) {
        $scope.showErrorMessage = false;

        if (form.validate()) {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/Register',
                dataType: 'json',
                data: { UserName: $scope.user.username, Password: $scope.user.password, Name: $scope.user.name, Surname: $scope.user.surname },
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