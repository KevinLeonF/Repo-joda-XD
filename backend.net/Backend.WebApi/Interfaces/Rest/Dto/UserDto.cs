namespace Backend.WebApi.Interfaces.Rest.Dto;

using System;
using System.Collections.Generic;


public sealed class UpdateUserRolesRequest
{
    public List<string> Roles { get; init; } = new();
}