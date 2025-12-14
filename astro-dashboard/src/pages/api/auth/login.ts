import { instanceBackendNet } from "@/lib/config";
import { setTokenAndPermissions } from "@/lib/control.permission";
import type { IReponseApi } from "@/lib/interfaces/api.interface";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    console.log("[API] POST /api/auth/login recibido con email:", email);
    console.log("[API] Llamando a backend .NET en /api/auth/inicio-sesion...");
    
    const dataResp = (await instanceBackendNet.post("/api/auth/inicio-sesion", {
      email,
      password,
    })) as IReponseApi;
    
    console.log("Respuesta del backend .NET:");
    console.log(dataResp);
    console.log("Respuesta del backend .NET:");
    
    const data = dataResp as {
      result: {
        token: string;
        userId: string;
        name: string;
        email: string;
      };
    };


    const accessToken = data.result?.token;
    const permissions = setTokenAndPermissions(data.result?.token);
    if (accessToken) {
      //GUARDARMOS EL TOKEN EN UNA CLAVE O PROPIEDAD DE TIPO COOKIE QUE SE LLAME accessToken
      cookies.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    // Devolvemos al frontend solo info necesaria de usuario
    const responseBody = {
      user: data.result.userId,
      name: data.result.name,
      email: data.result.email,
      permissions,
    };
    return new Response(JSON.stringify(responseBody), {
      status: 200,
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
