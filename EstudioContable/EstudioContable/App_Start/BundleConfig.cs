using System.Web;
using System.Web.Optimization;

namespace EstudioContable
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/assets/js/core/jquery.min.js",
                        "~/assets/js/core/jquery.placeholder.min.js",
                        "~/assets/js/core/jquery.scrollLock.min.js",
                        "~/assets/js/core/jquery.slimscroll.min.js",
                        "~/assets/js/core/jquery.countTo.min.js",
                        "~/assets/js/core/jquery.appear.min.js",
                        "~/assets/js/plugins/bootstrap-treeview/bootstrap-treeview.min.js",
                        "~/assets/js/plugins/datatables/jquery.dataTables.min.js",
                        "~/assets/js/plugins/dropzonejs/dropzone.min.js",
                        "~/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js",
                        "~/assets/js/plugins/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js",
                        "~/assets/js/plugins/bootstrap-wizard/jquery.bootstrap.wizard.min.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/assets/js/core/jquery.validate.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/assets/js/core/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/assets/js/core/angular.min.js",
                      "~/assets/js/core/angular-ui-bootstrap-tpls.min.js",
                      "~/assets/js/core/angular-ui-router.min.js",
                      "~/assets/js/core/ngStorage.min.js",
                      "~/assets/js/core/ocLazyLoad.min.js",
                      "~/assets/js/core/angular-validate.min.js",
                      "~/assets/js/app/app.js",
                      "~/assets/js/app/directives.js",
                      "~/assets/js/app/*-controller.js"
                      ));

            bundles.Add(new StyleBundle("~/css").Include(
                      "~/assets/css/bootstrap.min.css",
                      "~/assets/css/themes/*.css",
                      "~/assets/js/plugins/bootstrap-treeview/bootstrap-treeview.min.css",
                      "~/assets/js/plugins/datatables/jquery.dataTables.css",
                      "~/assets/js/plugins/dropzonejs/dropzone.min.css",
                      "~/assets/js/plugins/bootstrap-datepicker/bootstrap-datepicker3.min.css",
                      "~/assets/css/oneui.css",
                      "~/assets/css/Site.css"));
        }
    }
}
