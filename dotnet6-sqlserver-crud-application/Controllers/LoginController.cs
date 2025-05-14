using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using WebApi.Helpers;
using WebApi.Entities;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly DataContext _context;

    public LoginController(DataContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] Login login)
    {
        try
        {
            login.Password = BCrypt.Net.BCrypt.HashPassword(login.Password);
            _context.Logins.Add(login);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Erreur serveur : " + ex.Message });
        }
    }

    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] Login login)
    {
        var user = await _context.Logins.SingleOrDefaultAsync(x => x.Username == login.Username);
        if (user == null)
            return Unauthorized(new { message = "Utilisateur non trouvé" });

        bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.Password, user.Password);
        if (!isPasswordValid)
            return Unauthorized(new { message = "Mot de passe invalide" });

        var token = "some-jwt-token"; // Replace with real JWT
        return Ok(new { message = "Login successful", token });
    }
}
