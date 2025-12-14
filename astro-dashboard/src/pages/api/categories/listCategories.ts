import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  try {
    console.log("[API][listCategories] LLEGANDO AL BACKEND DE ASTRO - LISTCATEGORIES");
    const token = cookies.get("accessToken")?.value;
    console.log("[API][listCategories] token recibido:", token);
    const dataResp = (await instanceBackendNet.get(
      "/api/Categorie/listar-categorias",
      {
        params: {
          token,
        },
      }
    )) as IReponseApi;
    console.log("[API][listCategories] respuesta backend .NET:", dataResp);

    return new Response(JSON.stringify(dataResp.result), {
      status: dataResp.code,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error" }), {
      status: 500,
    });
  }
};
