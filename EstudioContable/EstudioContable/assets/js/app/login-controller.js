App.controller('LoginController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    $scope.$parent.header = { title: "Inicio de sesión", description: "Ingrese con su usuario para crear y administrar el contenido." };
    $scope.showErrorMessage = false;

    $scope.user = {
        username: '',
        password: '',
        rememberMe: false
    }

    $scope.validationOptions = {
        rules: {
            username: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        }
    }

    $scope.login = function (form) {
        $scope.showErrorMessage = false;
        if (form.validate()) {
            $scope.helpers.uiLoader('show');
            $http({
                url: '/Account/Login',
                dataType: 'json',
                data: { UserName: $scope.user.username, Password: $scope.user.password, RememberMe: $scope.user.rememberMe },
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