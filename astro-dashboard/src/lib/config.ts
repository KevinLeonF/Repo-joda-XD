import axios from "axios";

// Configuracion de Axios para el BACKEND NET
export const instanceBackendNet = axios.create({
  baseURL: import.meta.env.BACKEND_URL ?? "http://localhost:5118",
  timeout: 60000,
  headers: { "X-Custom-Header": "mi-backend" },
});

//INTERCEPTOR PARA LO QUE ENVIAMOS AL BACKEND NET
instanceBackendNet.interceptors.request.use(
  function (config) {
    const { token } = config.params || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//INTERCEPTOR PARA LO QUE RECIBIMOS DEL BACKEND NET
instanceBackendNet.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.error("[CONFIG] Error en instanceBackendNet interceptor:", error.message);
    console.error("[CONFIG] Error response:", error.response);
    
    // Pasar el error completo, no solo error.response.data
    const errorToThrow = {
      message: error.response?.data?.message || error.message || "Error desconocido en backend .NET",
      status: error.response?.status || 500,
      data: error.response?.data,
      originalError: error
    };
    
    return Promise.reject(errorToThrow);
  }
);

// Configuracion de Axios para el BACKEND DE ASTRO
export const instanceBackendAstro = axios.create({
  baseURL: import.meta.env.DOMAIN_ASTRO ?? "http://localhost:4321/",
  timeout: 60000,
  withCredentials: true,
  headers: { "X-Custom-Header": "backend-astro" },
});

//INTERCEPTOR PARA LO QUE ENVIAMOS AL BACKEND ASTRO
instanceBackendAstro.interceptors.request.use(
  function (config) {
    // Asegurar que las peticiones desde el navegador envíen/acepten cookies
    config.withCredentials = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//INTERCEPTOR PARA LO QUE RECIBIMOS DEL BACKEND ASTRO
instanceBackendAstro.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    const errorObj = {
      message: errorMessage,
      status: error.response?.status || 500,
      data: error.response?.data,
    };
    console.error("[CONFIG] Error en instanceBackendAstro:", errorObj);
    return Promise.reject(errorObj);
  }
);
