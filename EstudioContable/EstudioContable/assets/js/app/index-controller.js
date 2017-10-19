App.controller('IndexController', ['$scope', '$window', function ($scope, $window) {
    $scope.$parent.header = { title: null, description: "Dos generaciones brindándole confiabilidad!" };
    $scope.$parent.isHome = true;

    //Roles:
    //0: Sin Loguear
    //1: Empleado
    //2: Tesoreria
    //3: Administrador
    //Clienet: la chupa por ahora

    $scope.modules = [
        { rol: 0, name: "Perfil", description: "Conozca sobre nosotros", colorClass: "bg-bold-blue", appearTimeout: 0, iconClass: "fa-lightbulb-o", link: "/Home/About" },
        { rol: 0, name: "Organizacion", description: "La base de nuetra Empresa", colorClass: "bg-pastel-green", appearTimeout: 0, iconClass: "fa-cubes", link: "/Home/EnConstruccion" },
        { rol: 0, name: "Directores", description: "Quienes Somos?", colorClass: "bg-pastel-blue", appearTimeout: 0, iconClass: "fa-users", link: "/Tools/CalculadoraLaboral" },
        { rol: 0, name: "Servicios", description: "Conozca nuestros Servicios", colorClass: "bg-secondary-blue", appearTimeout: 0, iconClass: "fa-briefcase", link: "/Home/EnConstruccion" },
        { rol: 0, name: "Contacto", description: "Tenes algo para contarnos?", colorClass: "bg-cyan", appearTimeout: 0, iconClass: "fa-comments", link: "/Home/EnConstruccion" },
        { rol: 0, name: "Sitios de Interes", description: "Sitios de Interes", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-thumb-tack", link: "/Contenido/Index" },
        { rol: 1, name: "Agregar Cliente", description: "Clic aqui para agregar Cliente.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-user-plus", link: "/Account/Register" },
        { rol: 1, name: "Agregar Persona Jurídica", description: "Clic aqui para agregar Cliente.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-user-plus", link: "/Account/Register" },
        { rol: 1, name: "Agregar Persona Humana", description: "Clic aqui para agregar Cliente.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-user-plus", link: "/Account/Register" },
        { rol: 1, name: "Agregar Cliente", description: "Clic aqui para agregar Cliente.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-user-plus", link: "/Account/Register" },
        { rol: 1, name: "Vacaciones", description: "Clic aqui para solicitar tus vacaciones!", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-plane", link: "/Manage/Categorias" },
        { rol: 2, name: "Saldos", description: "Modificar los saldos de cada cuenta", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-plane", link: "/Manage/Categorias" },
        { rol: 3, name: "Plantillas Mails", description: "Plantillas de mail para notificaciones.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-envelope-o", link: "/Manage/Contenido" },
        { rol: 3, name: "Reportes", description: "Toda la reporteria generada por el sistemas.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-clone", link: "/Manage/Documentos" },
        { rol: 3, name: "Seguridad", description: "Administracion de Base de Datos.", colorClass: "bg-light-blue", appearTimeout: 0, iconClass: "fa-lock", link: "/Account/AccountsList" }

    ];

    $scope.helpers.uiLoader('hide');
}
]);