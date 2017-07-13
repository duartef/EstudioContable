App.controller('IndexController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad!" };
    $scope.$parent.isHome = true;

    $scope.modules = [
        { name: "Perfil", description: "Conozca sobre nosotros", colorClass: "bg-bold-blue", appearTimeout: 0, iconClass: "fa-lightbulb-o", link: "/Home/About" },
        { name: "Organizacion", description: "La base de nuetra Empresa", colorClass: "bg-pastel-green", appearTimeout: 0, iconClass: "fa-cubes", link: "/Home/EnConstruccion" },
        { name: "Directores", description: "Quienes Somos?", colorClass: "bg-pastel-blue", appearTimeout: 0, iconClass: "fa-users", link: "/Tools/CalculadoraLaboral" },
        { name: "Servicios", description: "Conozca nuestros Servicios", colorClass: "bg-secondary-blue", appearTimeout: 0, iconClass: "fa-briefcase", link: "/Home/EnConstruccion" },
        { name: "Contacto", description: "Tenes algo para contarnos?", colorClass: "bg-cyan", appearTimeout: 0, iconClass: "fa-comments", link: "/Home/EnConstruccion" },
        { name: "Sitios de Interes", description: "Sitios de Interes", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-thumb-tack", link: "/Contenido/Index" },
        { name: "Agregar Cliente", description: "Clic aqui para agregar Cliente.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-user-plus", link: "/Account/Register" },
        { name: "Vaciones", description: "Clic aqui para solicitar tus vacaciones!", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-plane", link: "/Manage/Categorias" },
        { name: "Plantillas Mails", description: "Plantillas de mail para notificaciones.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-envelope-o", link: "/Manage/Contenido" },
        { name: "Reportes", description: "Toda la reporteria generada por el sistemas.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-clone", link: "/Manage/Documentos" },
        { name: "Seguridad", description: "Administracion de Base de Datos.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-lock", link: "/Account/AccountsList" }

    ];

    $scope.helpers.uiLoader('hide');
}
]);