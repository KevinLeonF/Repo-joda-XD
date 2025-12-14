using System.Security.Claims;

namespace Backend.Domain.Services.Interfaces;

public interface ICurrentUser
{
    string? UserId { get; }
    string? Email { get; }
    string? Name { get; }
    ClaimsPrincipal? Principal { get; }
}