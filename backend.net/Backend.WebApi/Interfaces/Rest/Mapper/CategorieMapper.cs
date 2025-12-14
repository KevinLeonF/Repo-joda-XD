namespace Backend.WebApi.Interfaces.Rest.Mapper;

using Backend.WebApi.Interfaces.Rest.Dto;
using Backend.Domain.Entities;

public static class CategorieMapper
{
    public static Categorie dtoToEntity(this CategorieCreateDto c)
    {
        return new Categorie { Name = c.name, Description = c.description };
    }

    public static CategorieResponseDto entityToDto(Categorie c)
    {
        return new(c.Id, c.Name, c.Description, c.Active, c.CreatedAt, c.UpdatedAt);
    }

}
