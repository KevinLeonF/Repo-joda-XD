import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  try {
    const { name, price } = await request.json();

    console.log("backend astro EDITAR mueble por id");
    console.log("el mueble con id", params.idMueble);
    console.log("Body recibido del cliente:", { name, price });
    
    const dataResp = (await instanceBackendNet.put(
      `/api/Furniture/actualizar-mueble-por-id`,
      { updateName: name, ActuaizarPrecio: Number(price) },
      {
        params: {
          muebleId: params.idMueble,
          token: cookies.get("accessToken")?.value,
        },
      }
    )) as IReponseApi;
    console.log("Respuesta del backend:", dataResp);
    return new Response(JSON.stringify(dataResp.result), {
      status: dataResp.code,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorApi = error as IReponseApi;
    console.log("Error capturado:", errorApi);
    // If you want to log more error details, ensure the property exists on IReponseApi
    return new Response(JSON.stringify({ message: errorApi.message }), {
      status: errorApi.code,
    });
  }
};
