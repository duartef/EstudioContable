App.controller('IndexController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad" };
    $scope.$parent.isHome = true;

    $scope.modules = [
        { name: "Perfil", description: "Conozca un poco mas sobre nosotros!", colorClass: "bg-bold-blue", appearTimeout: 0, iconClass: "fa-users", link: "/Home/about" },
        { name: "Guía para emprendedores", description: "Contenido específico para los emprendedores", colorClass: "bg-pastel-green", appearTimeout: 0, iconClass: "fa-handshake-o", link: "/Home/EnConstruccion" },
        { name: "Calculadora laboral", description: "Use la nueva calculadora laboral y olvídese de los cálculos manuales", colorClass: "bg-pastel-blue", appearTimeout: 0, iconClass: "si si-calculator", link: "/Tools/CalculadoraLaboral" },
        { name: "Consulta tributaria", description: "Explore el contenido relacionado", colorClass: "bg-secondary-blue", appearTimeout: 0, iconClass: "fa-bank", link: "/Home/EnConstruccion" },
        { name: "Links de interes", description: "Informacion mas relevante", colorClass: "bg-cyan", appearTimeout: 0, iconClass: "fa-link", link: "/Home/EnConstruccion" },
        { name: "Buscador de contenidos", description: "Acceda a los distintos contenidos disponibles", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-search", link: "/Contenido/Index" }
        //{ name: "Documentos descargables", description: "Acceda a los distintos tipos de documentos!", colorClass: "bg-bold-green", appearTimeout: 400, iconClass: "fa-folder-open" },
        //{ name: "Documentos descargables", description: "Acceda a los distintos tipos de documentos!", colorClass: "bg-flat", appearTimeout: 600, iconClass: "fa-folder-open" }
    ];

    $scope.helpers.uiLoader('hide');
}
]);