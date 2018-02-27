using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using EstudioContable.Models;
using System.ServiceModel.Web;
using System.Data.Entity.Migrations;
using System.Collections.Generic;

namespace EstudioContable.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private ApplicationDbContext db = new ApplicationDbContext();

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //
        // GET: /Account/AccountsList
        [Authorize(Roles = "Admin")]
        public ActionResult AccountsList(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // GET: /Account/TestDatatable
        public ActionResult TestDatatable(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        public int Login(LoginViewModel model, string returnUrl)
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            try
            {
                var result = SignInManager.PasswordSignIn(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
                return (int)result;
            }
            catch (Exception ex)
            {
                return 1;
            }

        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent: model.RememberMe, rememberBrowser: model.RememberBrowser);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        //
        // GET: /Account/RegisterPersonaJuridica
        [AllowAnonymous]
        public ActionResult RegisterPersonaJuridica()
        {
            return View();
        }

        //
        // GET: /Account/RegisterPersonaJuridica2
        [AllowAnonymous]
        public ActionResult RegisterPersonaJuridica2()
        {
            return View();
        }

        // GET: /Account/verPersona
        [AllowAnonymous]
        public ActionResult verPersona()
        {
            return View();
        }

        // GET: /Account/AgregarObligacionesAg
        [AllowAnonymous]
        public ActionResult AgregarObligacionesAg()
        {
            return View();
        }

        // GET: /Account/NuevaObligacion
        [AllowAnonymous]
        public ActionResult NuevaObligacion()
        {
            return View();
        }

        // GET: /Account/VerObligacion
        [AllowAnonymous]
        public ActionResult VerObligacion()
        {
            return View();
        }

        //
        // GET: /Account/RegisterPersonaHumana
        [AllowAnonymous]
        public ActionResult RegisterPersonaHumana()
        {
            return View();
        }

        //
        // GET: /Account/VerPersonaHumana
        [AllowAnonymous]
        public ActionResult VerPersonaHumana()
        {
            return View();
        }

        //
        // GET: /Account/VerPersonaJuridica
        [AllowAnonymous]
        public ActionResult VerPersonaJuridica()
        {
            return View();
        }

        // GET: /Account/RegisterEmpleado   
        [AllowAnonymous]
        public ActionResult RegisterEmpleado()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        public int Register(RegisterViewModel model)
        {
            try
            {
                var user = new ApplicationUser { UserName = model.UserName, Email = model.UserName };
                var result = UserManager.Create(user, model.Password);
                if (result.Succeeded)
                {
                    SignInManager.SignIn(user, isPersistent: false, rememberBrowser: false);
                    return 0;
                }
                //Error
                return 1;
            }
            catch (Exception ex)
            {
                return 1;
            }
        }

        //
        // POST: /Account/RegisterDirector
        [HttpPost]
        [AllowAnonymous]
        public string RegisterDirector(Director director)
        {
            try
            {
                db.Directores.Add(director);
                db.SaveChanges();
                return director.Id.ToString();
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/RegisterSocio
        [HttpPost]
        [AllowAnonymous]
        public string RegisterSocio(Socio socio)
        {
            try
            {
                db.Socios.Add(socio);
                db.SaveChanges();
                return socio.Id.ToString();
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/RegisterPersonaHumana
        [HttpPost]
        [AllowAnonymous]
        public string RegisterPersonaHumana(PersonaHumana ph)
        {
            try
            {
                var user = new ApplicationUser
                {
                    UserName = ph.EmailLaboral,
                    Email = ph.EmailLaboral
                };

                var result = UserManager.Create(user, new PasswordHasher().HashPassword("EstudioVilla18"));
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "Cliente");
                    //return 0;
                }

                ph.UserId = user.Id;

                db.PersonasHumanas.Add(ph);
                db.SaveChanges();
                return ph.Id.ToString();
                //return 0;
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/ActualizarPersonaHumana
        [HttpPost]
        [AllowAnonymous]
        public string ActualizarPersonaHumana(PersonaHumana ph)
        {
            try
            {
                //Acá encuentro a la persona
                //PersonaHumana aux = db.PersonasHumanas.First(x => x.Id == ph.Id);
                //La modifico
                db.PersonasHumanas.AddOrUpdate(ph);
                //Guardo los cambios
                db.SaveChanges();

                return ph.Id.ToString();
                //return 0;
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/ActualizarPersonaJuridica
        [HttpPost]
        [AllowAnonymous]
        public string ActualizarPersonaJuridica(PersonaJuridica pj)
        {
            try
            {
                //Acá encuentro a la persona
                //PersonaHumana aux = db.PersonasHumanas.First(x => x.Id == ph.Id);
                //La modifico
                db.PersonasJuridicas.AddOrUpdate(pj);
                //Guardo los cambios
                db.SaveChanges();

                return pj.Id.ToString();
                //return 0;
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }


        // POST: /Account/RegisterObligacion
        [HttpPost]
        [AllowAnonymous]
        public string RegisterObligacion(Obligacion obligacion)
        {
            try
            {
                db.Obligaciones.Add(obligacion);
                db.SaveChanges();

                for (int i = 0; i < 10; i++)
                {
                    ConfigObligacion config = new Models.ConfigObligacion();
                    config.Dia = 1;
                    config.ObligacionId = obligacion.Id;
                    config.TerminacionCuit = i;

                    db.ConfigObligaciones.Add(config);
                }

                db.SaveChanges();

                return obligacion.Id.ToString();
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }


        // POST: /Account/RegisterObligacionAg
        [HttpPost]
        [AllowAnonymous]
        public string RegisterObligacionAg(ObligacionAg obligacionAg)
        {
            try
            {
                db.ObligacionesAg.Add(obligacionAg);
                db.SaveChanges();
                return obligacionAg.Id.ToString();
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/UpdateConfig
        [HttpPost]
        [AllowAnonymous]
        public string UpdateConfig(ConfigObligacion[] configs)
        {
            try
            {
                List<ConfigObligacion> configsObligaciones = configs.ToList();
                foreach (ConfigObligacion config in configsObligaciones)
                {
                    //Acá encuentro a la config
                    ConfigObligacion aux = db.ConfigObligaciones.First(x => x.Id == config.Id);
                    aux.Dia = config.Dia;
                    //La modifico
                    db.ConfigObligaciones.AddOrUpdate(aux);
                    db.SaveChanges();
                }
                ////Acá encuentro a la config
                //ConfigObligacion aux = db.ConfigObligaciones.First(x => x.Id == config.Id);
                //aux.Dia = config.Dia;
                ////La modifico
                //db.ConfigObligaciones.AddOrUpdate(aux);
                ////Guardo los cambios
                //db.SaveChanges();

                return "OK";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

       // POST: /Account/RegisterPersonaJuridica
       [HttpPost]
        [AllowAnonymous]
        public string RegisterPersonaJuridica(PersonaJuridica pj)
        {
            try
            {
                var user = new ApplicationUser
                {
                    UserName = pj.EmailLaboral,
                    Email = pj.EmailLaboral
                };

                var result = UserManager.Create(user, new PasswordHasher().HashPassword("EstudioVilla18"));
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "Cliente");
                    //return 0;
                }

                pj.UserId = user.Id;

                db.PersonasJuridicas.Add(pj);
                db.SaveChanges();
                return pj.Id.ToString();
                //return 0;
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/AddActividadToPersonaHumana
        [HttpPost]
        [AllowAnonymous]
        public string AddActividad(ActividadDeLaPersonaHumana actividad)
        {
            try
            {
                Actividad aux = db.Actividades.Find(actividad.ActividadId);
                actividad.Descripcion = aux.Descripcion;
                actividad.Codigo = aux.Codigo;

                db.ActividadesDeLaPersonaHumana.Add(actividad);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }


        //
        // POST: /Account/AddObligacionToPh
        [HttpPost]
        [AllowAnonymous]
        public string AddObligacionToPh(int ObligacionId, int PersonaHumanaId)
        {
            try
            {
                PersonaHumana ph = db.PersonasHumanas.Find(PersonaHumanaId);
                string cuitPoronga = ph.Cuit;
                int largoCuit = cuitPoronga.Length - 1;
                string a = cuitPoronga[largoCuit].ToString();

                int s = Convert.ToInt32(a);

                ConfigObligacion config = db.ConfigObligaciones.First(x => x.ObligacionId == ObligacionId && x.TerminacionCuit == s);
                
                ObligacionPh obligacionPh = new Models.ObligacionPh();
                obligacionPh.ConfigObligacionId = config.Id;
                obligacionPh.PersonaHumanaId = ph.Id;

                db.ObligacionesPh.Add(obligacionPh);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/RemoveActividadToPersonaHumana
        [HttpPost]
        [AllowAnonymous]
        public string RemoveActividad(ActividadDeLaPersonaHumana actividad)
        {
            try
            {
                ActividadDeLaPersonaHumana aux = db.ActividadesDeLaPersonaHumana.Find(actividad.Id);
                db.ActividadesDeLaPersonaHumana.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/RemoveActividadToPersonaJuridica
        [HttpPost]
        [AllowAnonymous]
        public string RemoveActividadJuridica(ActividadDeLaPersonaJuridica actividad)
        {
            try
            {
                ActividadDeLaPersonaJuridica aux = db.ActividadesDeLaPersonaJuridica.Find(actividad.Id);
                db.ActividadesDeLaPersonaJuridica.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/AddActividadToPersonaJuridica
        [HttpPost]
        [AllowAnonymous]
        public string AddActividadJuridica(ActividadDeLaPersonaJuridica actividad)
        {
            try
            {
                Actividad aux = db.Actividades.Find(actividad.ActividadId);
                actividad.Descripcion = aux.Descripcion;
                actividad.Codigo = aux.Codigo;

                db.ActividadesDeLaPersonaJuridica.Add(actividad);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/AddCCT
        [HttpPost]
        [AllowAnonymous]
        public string AddCCT(ConvenioDeLaPersonaHumana convenio)
        {
            try
            {
                ConvenioColectivoDeTrabajo aux = db.ConveniosColectivos.Find(convenio.CctId);
                convenio.Convenio = aux.Convenio;

                db.ConveniosDeLaPersonaHumana.Add(convenio);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/AddCCTJuridica
        [HttpPost]
        [AllowAnonymous]
        public string AddCCTJuridica(ConvenioDeLaPersonaJuridica convenio)
        {
            try
            {
                ConvenioColectivoDeTrabajo aux = db.ConveniosColectivos.Find(convenio.CctId);

                convenio.Convenio = aux.Convenio;

                db.ConveniosDeLaPersonaJuridica.Add(convenio);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        //
        // POST: /Account/RemoveCCT
        [HttpPost]
        [AllowAnonymous]
        public string RemoveCCT(ConvenioDeLaPersonaHumana convenio)
        {
            try
            {
                ConvenioDeLaPersonaHumana aux = db.ConveniosDeLaPersonaHumana.Find(convenio.Id);
                db.ConveniosDeLaPersonaHumana.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/RemoveCCTJuridica
        [HttpPost]
        [AllowAnonymous]
        public string RemoveCCTJuridica(ConvenioDeLaPersonaJuridica convenio)
        {
            try
            {
                ConvenioDeLaPersonaJuridica aux = db.ConveniosDeLaPersonaJuridica.Find(convenio.Id);
                db.ConveniosDeLaPersonaJuridica.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/RemoveDirectorPJ
        [HttpPost]
        [AllowAnonymous]
        public string RemoveDirectorPJ(Director director)
        {
            try
            {
                Director aux = db.Directores.Find(director.Id);
                db.Directores.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }

        // POST: /Account/RemoveSocioPJ
        [HttpPost]
        [AllowAnonymous]
        public string RemoveSocioPJ(Socio socio)
        {
            try
            {
                Socio aux = db.Socios.Find(socio.Id);
                db.Socios.Remove(aux);
                db.SaveChanges();

                return "Ok";
            }
            catch (Exception ex)
            {
                return "Error: " + ex.Message;
            }
        }


        //
        // POST: /Account/RegisterCliente
        [HttpPost]
        [AllowAnonymous]
        public int RegisterCliente(RegisterViewModel model)
        {
            try
            {
                var user = new ApplicationUser {
                    UserName = model.Email,
                    Email = model.Email,
                    Enabled = true
                    //Nombre = model.Name,
                    //Apellido = model.SurName,
                    ////Cuit = model.Cuit,
                    ////Actividad = model.Actividad,
                    ////Juridiccion = model.Jurisdiccion,
                    ////PhoneNumber = model.PhoneNumber
                };

                var result = UserManager.Create(user, model.Password);
                if (result.Succeeded)
                {
                    //UserManager.AddToRole(user.Id, "Cliente");
                    UserManager.AddToRole(user.Id, "Admin");

                    //SignInManager.SignIn(user, isPersistent: false, rememberBrowser: false);
                    return 0;
                }
                //Error
                return 1;
            }
            catch (Exception ex)
            {
                return 1;
            }
        }

        //GET: /Account/Cliente
        //ToDo: Change this to: [Authorize]
        [AllowAnonymous]
        public ActionResult Cliente()
        {
            return View();
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                // string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                // var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);		
                // await UserManager.SendEmailAsync(user.Id, "Reset Password", "Please reset your password by clicking <a href=\"" + callbackUrl + "\">here</a>");
                // return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        public int LogOff()
        {
            try
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return 0;
            }
            catch (Exception)
            {
                return 1;
            }
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}