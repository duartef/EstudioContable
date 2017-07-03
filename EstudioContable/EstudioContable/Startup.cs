using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EstudioContable.Startup))]
namespace EstudioContable
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
