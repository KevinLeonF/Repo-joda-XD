namespace Backend.Domain.Services.Interfaces;

public record AuthResult(string Token, string UserId, string name, string email);
public interface IAuthService
{
    Task<AuthResult> RegisterUserAsync(string name, string email, string password, CancellationToken ct);
    Task<AuthResult> LoginUser(string email, string password, CancellationToken ct);
}
