let currentPermissions = new Set<string>(); // para el backend de astro

function decodeJwt(token: string) { // decodificamos el token
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function setTokenAndPermissions(token: string | null) { //obtenemos el token y guardamos en el backend de astro pero tambien lo devolvemos para guardar en el frontend de astro
  currentPermissions = new Set(); // para el backend de astro
    if (!token) return;
    const decoded = decodeJwt(token);
    if (!decoded) return;

    const perms = decoded.permission ?? [];
    currentPermissions = new Set(perms); // para el backend de astro
    return perms;
}

//controlPermisos(['x','y']) => true si tiene TODOS
//controlPermisos(['x','y'], 'any') => true si tiene AL MENOS UNO
// controlPermisosFrontend(['x','y']) => true si tiene TODOS
// controlPermisosFrontend(['x','y'], 'any') => true si tiene AL MENOS UNO



export function controlPermisosFrontend(//funcion para ayudarnos a verificar si tiene el permiso
  required: string | string[],
  mode: "all" | "any" = "all"
): boolean {
  // Inicializamos userpermission con un Set vacio
  let userPermissions = new Set<string>();

  //en el backend de astro SSR no hay window/localStorage
  if (typeof window === "undefined") {
    // currentPermissions deberia ser Set<string>
    // si no existe dejamos la linea comentada
    userPermissions = currentPermissions;
  } else {
    // esto es para el frontend de astro
    const rawUser = window.localStorage.getItem("user");
    if (!rawUser) return false;

    try {
      const currentUser = JSON.parse(rawUser);

      if (Array.isArray(currentUser.permissions)) {
        userPermissions = new Set<string>(currentUser.permissions);
      } else {
        // Si no hay array de permisos se queda el Set vacio
        userPermissions = new Set<string>();
      }
    } catch {
      return false;
    }
  }

  const list = Array.isArray(required) ? required : [required];
  if (list.length === 0) return true;

  //Aqui en esta  consola mostramos todos los permisos
  console.log("Permisos actuales:", Array.from(userPermissions));

  if (mode === "all") {
    console.log("Verificando que tenga TODOS:", list);
    console.log(list.every((p) => userPermissions.has(p)));
    return list.every((p) => userPermissions.has(p));
  }

  // mode === "any"
  console.log("Verificando que tenga ALGUNO de:", list);
  return list.some((p) => userPermissions.has(p));
}


