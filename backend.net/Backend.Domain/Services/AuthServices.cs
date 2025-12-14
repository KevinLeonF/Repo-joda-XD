using Backend.Domain.Services.Interfaces;

namespace Backend.Domain.Services;

public class AuthService(IUserService userService, IJwtTokenService jwtTokenService) : IAuthService
{
    public async Task<AuthResult> LoginUser(string email, string password, CancellationToken ct)
    {
        var getUser = await userService.LoginAsync(email, password, ct);
        var token = jwtTokenService.CreateToken(getUser);
        return new AuthResult(token, getUser.Id.ToString(), getUser.Name, getUser.Email);
    }

    public async Task<AuthResult> RegisterUserAsync(string name, string email, string password, CancellationToken ct)
    {
        var getUser = await userService.RegisterUserAsync(name, email, password, ct);
        var token = jwtTokenService.CreateToken(getUser);
        return new AuthResult(token, getUser.Id.ToString(), getUser.Name, getUser.Email);
    }
}