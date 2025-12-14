using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Domain.Entities;
using Backend.Domain.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Infrastructure.Security;

public sealed class JwtOptions
{
    public string Issuer { get; set; } = "example-issuer";
    public string Audience { get; set; } = "example-audience";
    public string Secret { get; set; } = "super_secret_key_change_me";
    public int ExpMinutes { get; set; } = 60;
}

public sealed class JwtTokenService(IOptions<JwtOptions> options) : IJwtTokenService
{
    private readonly JwtOptions _opt = options.Value;

    public string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("name", user.Name),
        };

        //////
        // roles
        Console.WriteLine("ROLES DEL USUARIO");
        foreach (var ur in user.UserRoles)
        {
            claims.Add(new Claim("Role", ur.Role.Name));
        }
        // permisos que vienen en los roles
        var permissions = user.UserRoles
            .SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Code)
            .Distinct();

        Console.WriteLine("ASIGNAR PERMISOS AL TOKEN");
        foreach (var perm in permissions)
        {
            Console.WriteLine(perm);
            claims.Add(new Claim("permission", perm));
        }
        //////
        /// 
        /// 
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_opt.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: _opt.Issuer,
            audience: _opt.Audience,
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddMinutes(_opt.ExpMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}
