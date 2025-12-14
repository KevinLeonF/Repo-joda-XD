namespace Backend.Domain.Repositories;

using Backend.Domain.Entities;

public interface ICategorieRepository
{
    Task<bool> CheckExistCategorieById(Guid id, CancellationToken ct = default);
    Task<Categorie> CreateCategorieAsync(Categorie categorie, CancellationToken ct = default);
    Task<int> SaveCategorie(CancellationToken ct = default);
    Task<IReadOnlyList<Categorie>> ListAllCategoriesAsync(CancellationToken ct = default);
    Task<Categorie?> GetCategorieByIdAsync(Guid id, CancellationToken ct = default);
    Task<Categorie> UpdateCategorieAsync(Categorie categorie, CancellationToken ct = default);
    Task<Categorie?> GetByIdCategorieIncludingInactiveAsync(Guid id, CancellationToken ct = default);
}
