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

        [Route("api/Service/GetActividadesDeLaPersonaHumana/{personaHumanaId}")]
        public IEnumerable<ActividadDeLaPersonaHumana> GetActividadesDeLaPersonaHumana(string personaHumanaId)
        {
            try
            {
                int phId = Convert.ToInt32(personaHumanaId);
                var a = db.ActividadesDeLaPersonaHumana.Where(x => x.PersonaHumanaId == phId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<ActividadDeLaPersonaHumana>();
            }

        }

        [Route("api/Service/GetActividadesDeLaPersonaJuridica/{personaJuridicaId}")]
        public IEnumerable<ActividadDeLaPersonaJuridica> GetActividadesDeLaPersonaJuridica(string personaJuridicaId)
        {
            try
            {
                int pjId = Convert.ToInt32(personaJuridicaId);
                var a = db.ActividadesDeLaPersonaJuridica.Where(x => x.PersonaJuridicaId == pjId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<ActividadDeLaPersonaJuridica>();
            }

        }


        [Route("api/Service/GetConveniossDeLaPersona/{personaHumanaId}")]
        public IEnumerable<ConvenioDeLaPersonaHumana> GetConveniossDeLaPersona(string personaHumanaId)
        {
            try
            {
                int phId = Convert.ToInt32(personaHumanaId);
                var a = db.ConveniosDeLaPersonaHumana.Where(x => x.PersonaHumanaId == phId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<ConvenioDeLaPersonaHumana>();
            }

        }

        [Route("api/Service/GetConveniossDeLaPersonaJuridica/{PersonaJuridicaId}")]
        public IEnumerable<ConvenioDeLaPersonaJuridica> GetConveniossDeLaPersonaJuridica(string PersonaJuridicaId)
        {
            try
            {
                int pjId = Convert.ToInt32(PersonaJuridicaId);
                var a = db.ConveniosDeLaPersonaJuridica.Where(x => x.PersonaJuridicaId == pjId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<ConvenioDeLaPersonaJuridica>();
            }

        }

        [Route("api/Service/GetPersonaHumana/{personaHumanaId}")]
        public PersonaHumana GetPersonaHumana(string personaHumanaId)
        {
            try
            {
                int phId = Convert.ToInt32(personaHumanaId);
                var a = db.PersonasHumanas.First(x => x.Id == phId);
                return a;
            }
            catch (Exception ex)
            {
                return new PersonaHumana();
            }

        }



        [Route("api/Service/GetPersonaJuridica/{personaJuridicaId}")]
        public PersonaJuridica GetPersonaJuridica(string personaJuridicaId)
        {
            try
            {
                int pjId = Convert.ToInt32(personaJuridicaId);
                var a = db.PersonasJuridicas.First(x => x.Id == pjId);
                return a;
            }
            catch (Exception ex)
            {
                return new PersonaJuridica();
            }

        }

        [Route("api/Service/GetSociosDelPJ/{personaJuridicaId}")]
        public IEnumerable<Socio> GetSociosDelPJ(string personaJuridicaId)
        {
            try
            {

                int pjId = Convert.ToInt32(personaJuridicaId);
                var a = db.Socios.Where(x => x.PersonaJuridicaId == pjId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<Socio>();
            }

        }

        [Route("api/Service/GetDirectoresDelPJ/{PersonaJuridicaId}")]
        public IEnumerable<Director> GetDirectoresDelPJ(string PersonaJuridicaId)
        {
            try
            {
                int pjId = Convert.ToInt32(PersonaJuridicaId);
                //int PersonaJuridicaId = 37;
                var a = db.Directores.Where(x => x.PersonaJuridicaId == pjId);
                return a;
            }
            catch (Exception ex)
            {
                return new List<Director>();
            }

        }

        [Route("api/Service/GetAllPersonas")]
        public IEnumerable<object> GetAllPersonas()
        {
            try
            {

                var p = db.PersonasHumanas.ToList();
                var phs = from t in p
                          select new
                          {
                              Id = t.Id,
                              Nombre = t.Nombre,
                              Apellido = t.Apellido,
                              Cuit = t.Cuit,
                              Tipo = "Persona Humana"
                          };

                var pjs = from q in db.PersonasJuridicas
                          select new
                          {
                              Id = q.Id,
                              Nombre = "",
                              Apellido = q.Denomicacion,
                              Cuit = q.CUIT,
                              Tipo = "Persona Jurídica"
                          };

                var personas = (from t in db.PersonasHumanas
                                select new
                                {
                                    Id = t.Id,
                                    Nombre = t.Nombre,
                                    Apellido = t.Apellido,
                                    Cuit = t.Cuit,
                                    Tipo = "Persona Humana"
                                }).Union(from q in db.PersonasJuridicas
                                         select new
                                         {
                                             Id = q.Id,
                                             Nombre = "",
                                             Apellido = q.Denomicacion,
                                             Cuit = q.CUIT,
                                             Tipo = "Persona Jurídica"
                                         });

                return personas;
            }
            catch (Exception ex)
            {
                return new List<object>();
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

        //    [Route("api/Service/GetPersonasTodas")]
        //    public IEnumerable<ApplicationUser> GetPersonasTodas()
        //    {
        //        try
        //        {
        //            var innerJoinQuery =
        //from cust in customers
        //join dist in distributors on cust.City equals dist.City
        //select new { CustomerName = cust.Name, DistributorName = dist.Name };
        //        }
        //        catch (Exception ex)
        //        {
        //            return null;
        //        }
        //    }
    }
}
