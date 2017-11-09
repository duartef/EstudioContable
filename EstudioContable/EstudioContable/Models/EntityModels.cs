using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace EstudioContable.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        //public string Nombre { get; set; }
        //public string Apellido { get; set; }
        public bool Enabled { get; set; }
        //public string Cuit { get; set; }
        //public string Actividad { get; set; }
        //public decimal CuentaCorriente { get; set; }
        //public string Juridiccion { get; set; }
        //public string TipoDeCliente { get; set; }

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
        public string UserId { get; set; }
        //Persona Humana
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Dni { get; set; }
        public string Cuit { get; set; }
        public string Nacionalidad { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string EstadoCivil { get; set; }
        public string Profesion { get; set; }
        public string Celular { get; set; }
        public string TelefonoLaboral { get; set; }
        public string EmailLaboral { get; set; }
        public string EmailPersonal { get; set; }
        public string Domicilio { get; set; }
        public string Localidad { get; set; }
        public string Provincia { get; set; }
        public string DomicilioComercial { get; set; }
        public string LocalidadComercial { get; set; }
        public string ProvinciaComercial { get; set; }
        public string NroIngresosBrutos { get; set; }
        public DateTime FechaCierreEjercicios { get; set; }
        public bool EsEmpleador { get; set; }
        public string FrecAtencion { get; set; }
        public string Responsable { get; set; }
        public string SituacionImpositiva { get; set; }
        public string Observaciones { get; set; }
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
        public string Convenio { get; set; }
    }

    public class ConvenioDeLaPersonaHumana
    {
        [Key]
        public int Id { get; set; }
        public int CctId { get; set; }
        public int PersonaHumanaId { get; set; }
    }

    public class Actividad
    {
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }
    }

    public class ActividadDeLaPersonaHumana
    {
        [Key]
        public int Id { get; set; }
        public int ActividadId { get; set; }
        public int PersonaHumanaId { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            try
            {
                // 
                //Database.SetInitializer<ApplicationDbContext>(new DropCreateDatabaseAlways<ApplicationDbContext>());
                Database.SetInitializer<ApplicationDbContext>(new CreateDatabaseIfNotExists<ApplicationDbContext>());
                Database.Initialize(true);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public DbSet<PersonaHumana> PersonasHumanas { get; set; }
        public DbSet<PersonaJuridica> PersonasJuridicas { get; set; }
        public DbSet<Socio> Socios { get; set; }
        public DbSet<Director> Directores { get; set; }
        public DbSet<Sindico> Sindicos { get; set; }
        public DbSet<ConvenioColectivoDeTrabajo> ConveniosColectivos { get; set; }
        public DbSet<ConvenioDeLaPersonaHumana> ConveniosDeLaPersonaHumana { get; set; }
        public DbSet<Actividad> Actividades { get; set; }
        public DbSet<ActividadDeLaPersonaHumana> ActividadesDeLaPersonaHumana { get; set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}