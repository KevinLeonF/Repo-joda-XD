import { instanceBackendAstro } from "./config";
import type { Categorie } from "./interfaces/categorie.interface";

export async function listCategories(): Promise<Categorie[]> {
  const response = await instanceBackendAstro.get(
    "/api/categories/listCategories"
  );
  return response as unknown as Categorie[];
}

export interface ICategorieCreate {
  name: string;
  description: string;
}

export async function createCategorie(payload: ICategorieCreate): Promise<any> {
  const response = await instanceBackendAstro.post(
    "/api/categories/crear-categoria",
    payload
  );
  return response as unknown;
}

export async function getCategorieById(idCategorie: string): Promise<Categorie> {
  const response = await instanceBackendAstro.get(`/api/categories/${idCategorie}`);
  return response as unknown as Categorie;
}

export async function editCategorieCompleteById(
  idCategorie: string,
  payload: { name: string; description: string }
): Promise<Categorie> {
  const response = await instanceBackendAstro.put(
    `/api/categories/edit-categorie-complete/${idCategorie}`,
    payload,
    { headers: { "Content-Type": "application/json" } }
  );
  return response as unknown as Categorie;
}

export async function deleteCategorieById(idCategorie: string): Promise<any> {
  const response = await instanceBackendAstro.delete(
    "/api/categories/eliminar-categoria-id",
    { params: { categorieId: idCategorie } }
  );
  return response as unknown;
}

export async function reactivateCategorieById(idCategorie: string): Promise<any> {
  const response = await instanceBackendAstro.patch(
    "/api/categories/reactivar-categoria-id",
    {},
    { params: { categorieId: idCategorie } }
  );
  return response as unknown;
}
