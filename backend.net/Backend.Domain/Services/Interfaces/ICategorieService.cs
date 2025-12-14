namespace Backend.Domain.Services.Interfaces;

using Backend.Domain.Entities;

public interface ICategorieService
{
    Task<Categorie> CreateCategorieServiceAsync(string name, string? description, CancellationToken ct = default);
    Task<IReadOnlyList<Categorie>> ListAllCategoriesAsync(CancellationToken ct = default);
    Task<Categorie?> GetCategorieByIdAsync(Guid id, CancellationToken ct = default);
    Task<Categorie> UpdateCompleteCategorieAsync(Guid id, string name, string? description, CancellationToken ct = default);
    Task<Categorie> DeleteCategorieLogicAsync(Guid id, CancellationToken ct = default);
    Task<Categorie> ReactivateCategorieAsync(Guid id, CancellationToken ct = default);
}
