﻿App.controller('AccountsListController', ['$scope', '$window', '$http', '$timeout', function ($scope, $window, $http, $timeout) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad" };
    $scope.$parent.isHome = true;
    $scope.usuarios = [];
    $scope.sortType = 'Name'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.filtro = '';     // set the default search/filter term


    //var timer;
    //alert("hola");

    $http.get('/api/Service/GetAllUsuarios').then(
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

    $scope.addActividad = function(event)
    {
        alert(event.target.id);
    }

    //$(document).ready(function () {
    //    timer = $timeout(countUp, 200, true)
    //});

    //var countUp = function () {
    //    if ($scope.usuarios.length > 0) {
    //        //$("#myTable").dataTable().fnDestroy();
    //        //var table = $('#myTable').DataTable({
    //        //    lengthChange: false,
    //        //    data: $scope.usuarios,
    //        //    select: true
    //        //});
    //        $scope.usuarios = $scope.usuarios;
    //        //$("#myTable").dataTable().data = $scope.usuarios;
    //        //for (var i = 0; i < $scope.usuarios.length; i++) {
    //        //    t.row.add([
    //        //        $scope.usuarios[i].id,
    //        //        $scope.usuarios[i].Name,
    //        //        $scope.usuarios[i].SurName,
    //        //        $scope.usuarios[i].Cuit
    //        //    ]).draw(false);
    //        //}
    //        //$("#myTable").dataTable().fnDestroy();
    //        //$('#myTable').DataTable({
    //            //data: $scope.usuarios
    //            //title: [
    //            //    { title: "Id" },
    //            //    { title: "UserName" },
    //            //    { title: "Name" },
    //            //    { title: "Surname" },
    //            //    { title: "Email" }
    //            //],
    //            //columns: [
    //            //{ "data": "Id", },
    //            //{ "data": "UserName" },
    //            //{ "data": "Name" },
    //            //{ "data": "Surname" },
    //            //{ "data": "Email" }
    //            //]
    //    //        columns: [
    //    //        { title: "Id", "data": "Id", },
    //    //        { title: "UserName", "data": "UserName" },
    //    //        { title: "Name", "data": "Name" },
    //    //        { title: "Surname", "data": "Surname" },
    //    //        { title: "Email", "data": "Email" }
    //    ////{ "data": "CuentaCorriente" },
    //    ////{ "data": "Cuit" }
    //    //        ]
    //        //});
    //    }
    //    else {
    //        $timeout(countUp, 200, true);
    //    }
    //}
}
]);