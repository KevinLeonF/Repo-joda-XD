import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request, cookies }) => {
  try {
    const dataResp = (await instanceBackendNet.get(
      "/api/Furniture/recuperar-mueble-id",
      {
        params: {
          mueble_id: params.idMueble,
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
      status: errorApi.code,
    });
  }
};
