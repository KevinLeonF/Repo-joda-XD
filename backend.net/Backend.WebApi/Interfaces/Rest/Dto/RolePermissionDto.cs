namespace Backend.WebApi.Interfaces.Rest.Dto;

using System;
using System.Collections.Generic;

public sealed class RoleCreateRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}

public sealed class PermissionCreateRequest
{
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}

public sealed class AssignPermissionToRoleRequest
{
    public string RoleName { get; set; } = null!;
    public string PermissionCode { get; set; } = null!;
}

public sealed class RoleResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public List<string> Permissions { get; set; } = new();
}

public sealed class PermissionResponse
{
    public Guid Id { get; set; }
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}
