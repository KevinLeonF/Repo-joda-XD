import { instanceBackendAstro } from "./config";

export interface IFurnitureCreate {
  name: string;
  price: number;
  categorieId: string;
}

export async function createFurniture(furniture: IFurnitureCreate): Promise<any> {
  try {
    const response = await instanceBackendAstro.post(
      "/api/furniture/create-mueble",
      furniture
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Error creando mueble");
  }
}

export async function listFurniture(): Promise<any> {
  try {
    const response = await instanceBackendAstro.get("/api/furniture/list-muebles");
    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Error listando muebles");
  }
}

export async function getFurnitureById(idFurniture: string): Promise<any> {
  try {
    const response = await instanceBackendAstro.get(`/api/furniture/${idFurniture}`);
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Error obteniendo mueble ${idFurniture}`);
  }
}

export async function editFurnitureCompleteById(
  idFurniture: string,
  { name, price }: { name: string; price: number }
): Promise<any> {
  try {
    const payload = { name, price };
    const response = await instanceBackendAstro.put(
      `/api/furniture/edit-mueble-complete/${idFurniture}`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Error editando mueble ${idFurniture}`);
  }
}

export async function deleteFurnitureById(idFurniture: string): Promise<any> {
  try {
    const response = await instanceBackendAstro.delete("/api/furniture/eliminar-mueble-id", {
      params: { muebleId: idFurniture },
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Error eliminando mueble ${idFurniture}`);
  }
}

export async function reactivateFurnitureById(idFurniture: string): Promise<any> {
  try {
    const response = await instanceBackendAstro.patch(
      "/api/furniture/reactivar-mueble-id",
      {},
      { params: { muebleId: idFurniture } }
    );
    return response;
  } catch (error: any) {
    throw new Error(error?.message || `Error reactivando mueble ${idFurniture}`);
  }
}
