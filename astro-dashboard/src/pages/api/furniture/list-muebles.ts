import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const token = cookies.get("accessToken")?.value;
    console.log("[API][list-muebles] token recibido:", token);
    const dataResp = (await instanceBackendNet.get("/api/Furniture/listar-muebles", {
      params: {
        token: cookies.get("accessToken")?.value,
      },
    })) as IReponseApi;
    console.log("[API][list-muebles] respuesta backend .NET:", dataResp);
    return new Response(JSON.stringify(dataResp.result), {
      status: dataResp.code,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorApi = error as IReponseApi;
    console.log(errorApi);
    return new Response(JSON.stringify({ message: errorApi.message }), {
      status: errorApi.code,
    });
  }
};
