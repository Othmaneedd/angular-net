using System.ComponentModel.DataAnnotations.Schema;

[Table("Login")] // ? Spécifie que la table s'appelle "Login" (exactement comme dans SQL Server)
public class Login
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}