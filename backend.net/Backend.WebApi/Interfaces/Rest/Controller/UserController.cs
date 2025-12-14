namespace Backend.WebApi.Interfaces.Rest.Controller;

using System.Security.Claims;
using Backend.Domain.Common;
using Backend.Domain.Services.Interfaces;
using Backend.WebApi.Interfaces.Rest.Dto;
using Backend.WebApi.Interfaces.Rest.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/users")]
public sealed class UsersController : ControllerBase
{
    private readonly IUserService users;

    public UsersController(IUserService users)
    {
        this.users = users;
    }

    [HttpPut("{userId:guid}/roles")]
    public async Task<IActionResult> SetRoles(
        Guid userId,
        [FromBody] UpdateUserRolesRequest request,
        CancellationToken ct)
    {
        await users.AssignRoleAsync(userId, request.Roles, ct);
        return NoContent();
    }
}
