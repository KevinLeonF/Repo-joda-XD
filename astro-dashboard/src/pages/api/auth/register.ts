import { instanceBackendNet } from "@/lib/config";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { name, email, password } = await request.json();
    console.log("[API] POST /api/auth/register recibido para:", email);
    console.log("[API] Llamando a backend .NET en /api/auth/registrar-usuario...");

    const dataResp = (await instanceBackendNet.post(
      "/api/auth/registrar-usuario",
      { name, email, password }
    )) as IReponseApi;

    console.log("[API] Respuesta backend .NET registro:", dataResp);

    // Si el backend devuelve token al registrar, lo guardamos
    const data = dataResp as {
      result?: { token?: string; userId?: string; name?: string; email?: string };
      code: number;
    };

    const accessToken = data.result?.token;
    if (accessToken) {
      cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      console.log("[API] Cookie accessToken establecida tras registro");
    }

    return new Response(
      JSON.stringify({
        success: true,
        userId: data.result?.userId,
        name: data.result?.name,
        email: data.result?.email,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    const errorApi = error as IReponseApi;
    console.error("[API] Error en registro:", errorApi);
    return new Response(JSON.stringify({ message: errorApi.message || "Error en registro" }), {
      status: errorApi.code || 500,
    });
  }
};
