using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;

namespace EstudioContable.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Enabled { get; set; }
        public string Cuit { get; set; }
        public string Actividad { get; set; }
        public decimal CuentaCorriente { get; set; }
        public string Juridiccion { get; set; }

        public string TipoDeCliente { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class PersonaHumana
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        //Persona Humana
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Cuit { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string EstadoCivil { get; set; }
        public string Profesion { get; set; }
    }

    public class PersonaJuridica
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        //Persona Juridica
        public string TipoDePersonaJuridica { get; set; }
        public string Denominacion { get; set; }
        public string DomicilioLegal { get; set; }
        public string ResolucionNro { get; set; }
        public DateTime ResolucionFecha { get; set; }
        public string TomoNro { get; set; }
        public string FolioDesde { get; set; }
        public string FolioHasta { get; set; }
        public string MatriculaNro { get; set; }
    }

    public class Socio
    {
        [Key]
        public int Id { get; set; }
        public int PersonaJuridicaId { get; set; }
        //Socio
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Cuit { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string EstadoCivil { get; set; }
        public string Profesion { get; set; }
        public string Domicilio { get; set; }
        public decimal PorcentajeParticipacion { get; set; }
    }

    public class Director
    {
        [Key]
        public int Id { get; set; }
        public int PersonaJuridicaId { get; set; }
        //Director
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Cuit { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public DateTime FinMandato { get; set; }
        public string EstadoCivil { get; set; }
        public string Profesion { get; set; }
        public string Domicilio { get; set; }
        public string Tipo { get; set; } //Titular o Suplente
    }

    public class Sindico
    {
        [Key]
        public int Id { get; set; }
        public int PersonaJuridicaId { get; set; }
        //Sindico
        public string Apellido { get; set; }
        public string Nombre { get; set; }
        public string Dni { get; set; }
        public string Cuit { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public DateTime FinMandato { get; set; }
        public string EstadoCivil { get; set; }
        public string Profesion { get; set; }
        public string Domicilio { get; set; }
        public string Tipo { get; set; } //Titular o Suplente
    }

    public class ConvenioColectivoDeTrabajo
    {
        [Key]
        public int Id { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer<ApplicationDbContext>(new DropCreateDatabaseAlways<ApplicationDbContext>());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}