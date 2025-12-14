namespace Backend.Domain.Repositories;

using Backend.Domain.Entities;
public interface IFurnitureRepository
{
    Task<Furniture> CreateFurnitureAsync(Furniture furniture, CancellationToken ct = default);

    Task<IReadOnlyList<Furniture>> GetAllFurnituresAsync(CancellationToken ct = default);

    Task<Furniture?> GetByIdFurnitureAsync(Guid id, CancellationToken ct = default);

    Task<Furniture?> UpdateCompleteFurnitureAsync(Furniture furniture, CancellationToken ct = default);

    Task<Furniture?> ActuaizarPrecioFurnitureAsync(Furniture furniture, CancellationToken ct = default);

    Task<Furniture?> DeleteFurnitureAsync(Furniture furniture, CancellationToken ct = default);
    Task<int> SaveChangesFurnitureAsync(CancellationToken ct);
    Task<Furniture?> GetByIdFurnitureIncludingInactiveAsync(Guid id, CancellationToken ct = default);
}


