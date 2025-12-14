import { instanceBackendAstro } from "./config";

interface LoginRequestDTO {
  email: string;
  password: string;
}

export async function loginRequest(params: LoginRequestDTO) {
  try {
    console.log("[SERVICE] Enviando petición a /api/auth/login con email:", params.email);
    //esto llama al backend de astro que esta en la carpeta pages/api/auth/login.ts
    const response = await instanceBackendAstro.post("/api/auth/login", params);
    console.log("[SERVICE] Respuesta recibida:", response);
    return response;
  } catch (error: any) {
    console.error("[SERVICE] Error en loginRequest:", error);
    console.error("[SERVICE] Error status:", error.response?.status);
    console.error("[SERVICE] Error data:", error.response?.data);
    throw error;
  }
}

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

export async function registerRequest(params: RegisterRequestDTO) {
  try {
    console.log("[SERVICE] Enviando petición a /api/auth/register con email:", params.email);
    const response = await instanceBackendAstro.post("/api/auth/register", params);
    console.log("[SERVICE] Respuesta recibida en register:", response);
    return response;
  } catch (error: any) {
    console.error("[SERVICE] Error en registerRequest:", error);
    throw error;
  }
}