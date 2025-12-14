namespace Backend.WebApi.Interfaces.Rest.Dto;

using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

public sealed record CategorieCreateDto
(
    [Required, MinLength(1)]
    string name,

    [Optional]
    string description
);

public sealed record CategorieResponseDto(
    Guid Id,
    string Name,
    string? Description,
    bool Active,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public sealed record CategorieUpdateDto(
    [Required, MinLength(1)]
    string name,

    [Optional]
    string? description
);
