using EstudioContable.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EstudioContable.Controllers
{
    public class ServiceController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Service
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Service/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Service
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Service/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Service/5
        public void Delete(int id)
        {
        }

        [Route("api/Service/GetAllActividades")]
        public IEnumerable<Actividad> GetAllActividades()
        {
            try
            {
                var a = db.Actividades.ToList();
                return a;
            }
            catch (Exception ex)
            {
                return new List<Actividad>();
            }

        }

        [Route("api/Service/GetAllConvenios")]
        public IEnumerable<ConvenioColectivoDeTrabajo> GetAllConvenios()
        {
            try
            {
                var a = db.ConveniosColectivos.ToList();
                return a;
            }
            catch (Exception ex)
            {
                return new List<ConvenioColectivoDeTrabajo>();
            }

        }

        [Route("api/Service/GetAllUsuarios")]
        public IEnumerable<ApplicationUser> GetAllUsuarios()
        {
            try
            {
                var a = db.Users.ToList();
                return a;
            }
            catch (Exception ex)
            {
                return new List<ApplicationUser>();
            }
            
        }

        [Route("api/Service/GetClientes")]
        public IEnumerable<ApplicationUser> GetAllClientes()
        {
            try
            {
                Microsoft.AspNet.Identity.EntityFramework.IdentityRole rolCliente = db.Roles.FirstOrDefault(x => x.Name == "Cliente");
                if (rolCliente != null)
                {
                    return db.Users.Where(x => x.Roles.Any(y => y.RoleId == rolCliente.Id)).ToList();
                }

                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
