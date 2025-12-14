import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const PATCH: APIRoute = async ({ url, cookies }) => {
  try {
    const muebleId = url.searchParams.get("muebleId");
    if (!muebleId) {
      return new Response(
        JSON.stringify({ message: "muebleId es requerido" }),
        { status: 400 }
      );
    }

    const dataResp = (await instanceBackendNet.patch(
      "/api/Furniture/reactivar-mueble-id",
      {},
      {
        params: {
          muebleId,
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

