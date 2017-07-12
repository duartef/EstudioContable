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

        [Route("api/Service/GetAllUsuarios")]
        public IEnumerable<ApplicationUser> GetAllUsuarios()
        {
            var a = db.Users.ToList();
            return a;
        }
    }
}
