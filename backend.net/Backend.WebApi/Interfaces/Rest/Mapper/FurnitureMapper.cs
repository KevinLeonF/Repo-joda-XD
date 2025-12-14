namespace Backend.WebApi.Interfaces.Rest.Mapper;

using Backend.Domain.Entities;
using Backend.WebApi.Interfaces.Rest.Dto;
public static class FurnitureMapper
{
    public static FurnitureDto transformar_a_DTO(this Furniture f)
    {
        return new(f.Id, f.Name, f.Price, f.CategoryId, f.Category?.Name);
    }

    public static Furniture transformar_a_entidad(this FurnitureCreateDto f)
    {
        return new Furniture { Name = f.Name, Price = f.Price, CategoryId = f.CategorieId };
    }

    public static FurnitureResponseDto Tranformar_a_responseDto(Furniture f)
    {
        return new(f.Id, f.Name, f.Price, f.Active, f.CategoryId, f.CreatedAt, f.UpdatedAt);
    }

    public static FurnitureResponseUpdateDto Tranformar_a_response_update_Dto(this Furniture f)
    {
        return new(f.Id, f.Name, f.Price, f.UpdatedAt);
    }

}



