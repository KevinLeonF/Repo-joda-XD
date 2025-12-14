import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  try {
    const { name, description } = await request.json();

    const dataResp = (await instanceBackendNet.put(
      "/api/Categorie/actualizar-por-id",
      { name, description },
      {
        params: {
          categorieId: params.idCategorie,
          token: cookies.get("accessToken")?.value,
        },
      }
    )) as IReponseApi;

    return new Response(JSON.stringify(dataResp.result), {
      status: dataResp.code,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorApi = error as IReponseApi;
    console.log(errorApi);
    return new Response(JSON.stringify({ message: errorApi.message }), {
      status: errorApi.code || 500,
    });
  }
};

