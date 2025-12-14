import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { name, description } = await request.json();
    const dataResp = (await instanceBackendNet.post(
      "/api/Categorie/crear-categoria",
      {
        name,
        description,
      },
      {
        params: {
          token: cookies.get("accessToken")?.value,
        },
      }
    )) as IReponseApi;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
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