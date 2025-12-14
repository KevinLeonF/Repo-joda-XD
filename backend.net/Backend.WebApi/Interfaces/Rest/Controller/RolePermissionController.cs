namespace Backend.WebApi.Controllers;

using System.Threading;
using System.Threading.Tasks;
using Backend.Domain.Services.Interfaces;
using Backend.WebApi.Interfaces.Rest.Dto;
using Backend.WebApi.Interfaces.Rest.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/roles-permisos")]
public sealed class RolesController : ControllerBase
{
    private readonly IRolePermissionService _rolePermissionService;

    public RolesController(IRolePermissionService rolePermissionService)
    {
        _rolePermissionService = rolePermissionService;
    }

    [HttpPost("crear-rol")]
    public async Task<IActionResult> CreateRole(
        [FromBody] RoleCreateRequest request,
        CancellationToken ct)
    {
        var role = await _rolePermissionService.CreateRoleAsync(
            request.Name,
            request.Description,
            ct);

        var dto = role.ToRoleResponse();
        return Ok(dto);
    }

    [HttpPost("crear-permiso")]
    public async Task<IActionResult> CreatePermission(
        [FromBody] PermissionCreateRequest request,
        CancellationToken ct)
    {
        var permission = await _rolePermissionService.CreatePermissionAsync(
            request.Code,
            request.Name,
            request.Description,
            ct);

        var dto = permission.ToPermissionResponse();
        return Ok(dto);
    }

    [HttpPost("asignar-permiso-rol")]
    public async Task<IActionResult> AssignPermissionToRole(
        [FromBody] AssignPermissionToRoleRequest request,
        CancellationToken ct)
    {
        await _rolePermissionService.AssignPermissionToRoleAsync(
            request.RoleName,
            request.PermissionCode,
            ct);

        return Ok(new { message = "permission assigned to role" });
    }
}
