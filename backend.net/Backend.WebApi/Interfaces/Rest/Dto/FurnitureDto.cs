﻿namespace Backend.WebApi.Interfaces.Rest.Dto;

using System.ComponentModel.DataAnnotations;

public sealed record FurnitureDto(
    Guid Id,
    string Name,
    decimal Price,
    Guid? CategoryId,
    string? CategoryName
);

public sealed record FurnitureCreateDto
(
    [Required, MinLength(1)]
    string Name,

    [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
    decimal Price,

    [Required]
    Guid CategorieId
);

public sealed record FurnitureResponseDto(
    Guid Id,
    string Name,
    decimal Price,
    bool Active,
    Guid? categorieId,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

public sealed record FurnitureResponseUpdateDto(
    Guid Id,
    string Name,
    decimal Price,
    DateTime UpdatedAt
);


public sealed record FurnitureUpdateDto(
    [Required, MinLength(1)]
    string updateName,

    [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
    decimal ActuaizarPrecio
);

public sealed record FurnitureUpdatePriceDto(
    [Range(typeof(decimal), "0.01", "79228162514264337593543950335")]
    decimal Precio
);


