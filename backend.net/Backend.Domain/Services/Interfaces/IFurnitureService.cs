namespace Backend.Domain.Services.Interfaces;

using Backend.Domain.Entities;
public interface IFurnitureService
{
    Task<Furniture> CreateFurnitureServiceAsync(string name, decimal price, Guid categorieId,  CancellationToken ct = default);

    Task<IReadOnlyList<Furniture>> ListAllFurnitures(CancellationToken ct = default);

    Task<Furniture?> GetByIdFurnitureAsync(Guid id, CancellationToken ct = default);

    Task<Furniture> UpdateCompleteFurnitureAsync(Guid id, string name, decimal price, CancellationToken ct = default);

    Task<Furniture> ActuaizarPrecioFurnitureAsync(Guid id, decimal price, CancellationToken ct = default);

    Task<Furniture> DeleteFurnitureLogicAsync(Guid id, CancellationToken ct = default);

    Task<Furniture> ReactivateFurnitureAsync(Guid id, CancellationToken ct = default);
}

