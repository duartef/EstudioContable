
angular.module("app").controller('mainController', function ($scope, $http) {
    $scope.sortType = 'name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';     // set the default search/filter term
    $scope.usuarios = [];


    $http.get('/api/Service/GetAllUsuarios').then(
    function (response) {
        if (response != null && response.data != null) {
            $scope.usuarios = response.data;
            //$("#myTable").dataTable().data = $scope.usuarios;
        }

        //$scope.helpers.uiLoader('hide');
        //$scope.helpers.uiBlocks('#popUpWin', 'state_normal');
    },
    function (error) {
        $scope.helpers.uiBlocks('#popUpWin', 'state_normal');
    });

    // create the list of sushi rolls 
    //$scope.sushi = [
    //  { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
    //  { name: 'Philly', fish: 'Tuna', tastiness: 4 },
    //  { name: 'Tiger', fish: 'Eel', tastiness: 7 },
    //  { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
    //];

});
