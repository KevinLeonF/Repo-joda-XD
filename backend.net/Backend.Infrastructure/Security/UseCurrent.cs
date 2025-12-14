using System.Security.Claims;
using Backend.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Backend.Infrastructure.Security;

public sealed class CurrentUser(IHttpContextAccessor accessor) : ICurrentUser
{
    private ClaimsPrincipal? P => accessor.HttpContext?.User;

    public ClaimsPrincipal? Principal => P;

    public string? UserId =>
        P?.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? P?.FindFirstValue("sub");

    public string? Email =>
        P?.FindFirstValue(ClaimTypes.Email)
        ?? P?.FindFirstValue("email");

    public string? Name =>
        P?.FindFirstValue("name")
        ?? P?.Identity?.Name;
}