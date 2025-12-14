namespace Backend.WebApi.Interfaces.Rest.Mapper;

using System.Collections.Generic;
using System.Linq;
using Backend.Domain.Entities;
using Backend.WebApi.Interfaces.Rest.Dto;

public static class RolePermissionMapper
{
    public static RoleResponse ToRoleResponse(this Role role)
    {
        var permissions = role.RolePermissions?
            .Where(rp => rp.Permission != null)
            .Select(rp => rp.Permission!.Code)
            .Distinct()
            .ToList() ?? new();

        return new RoleResponse
        {
            Id = role.Id,
            Name = role.Name,
            Description = role.Description,
            Permissions = permissions
        };
    }

    public static IEnumerable<RoleResponse> ToRoleResponse(this IEnumerable<Role> roles)
        => roles.Select(r => r.ToRoleResponse());

    public static PermissionResponse ToPermissionResponse(this Permission permission)
    {
        return new PermissionResponse
        {
            Id = permission.Id,
            Code = permission.Code,
            Name = permission.Name,
            Description = permission.Description
        };
    }
}
