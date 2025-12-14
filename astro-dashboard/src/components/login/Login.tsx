import { useState, useEffect } from "react";
import { loginRequest, registerRequest } from "@/lib/service.auth";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      const hash = window.location.hash.replace("#", "");
      if (tab === "register" || hash === "register") return "register";
    }
    return "login";
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario de registro
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "register" || tab === "login") {
      setActiveTab(tab as "login" | "register");
    }
    const syncFromUrl = () => {
      try {
        const p = new URLSearchParams(window.location.search);
        const t = p.get("tab") || window.location.hash.replace("#", "");
        if (t === "register" || t === "login") {
          setActiveTab(t as "login" | "register");
        }
      } catch {}
    };
    window.addEventListener("popstate", syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("hashchange", syncFromUrl);
    };
  }, []);

  const setTab = (tab: "login" | "register") => {
    setActiveTab(tab);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.replaceState(null, "", url.toString());
    } catch {}
  };


  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor completa email y contraseña.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      console.log("[LOGIN] Iniciando login con email:", username);
      
      // Llamada al backend a través del servicio de autenticación
      // El servicio llama a /api/auth/login que a su vez llama al backend .NET
      const getUserAuth = await loginRequest({ 
        email: username,
        password 
      });
      
      console.log("[LOGIN] Respuesta exitosa del servidor:", getUserAuth);
      
      // Guardar información del usuario en localStorage
      localStorage.setItem("user", JSON.stringify(getUserAuth));
      console.log("[LOGIN] Usuario guardado en localStorage, redirigiendo...");
      
      // Redirigir al dashboard después del login exitoso
      window.location.href = "/dashboard/dashboard";
    } catch (error: any) {
      console.error("[LOGIN] Error completo:", error);
      console.error("[LOGIN] Error response:", error.response);
      
      let errorMessage = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
      
      // Intentar extraer mensaje más específico del error
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error("[LOGIN] Mensaje de error mostrado:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const enviarFormularioRegistro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regName || !regEmail || !regPassword) {
      setError("Por favor completa nombre, email y contraseña.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      console.log("[REGISTER] Iniciando registro con email:", regEmail);

      const result = await registerRequest({
        name: regName,
        email: regEmail,
        password: regPassword,
      });

      console.log("[REGISTER] Respuesta exitosa del servidor:", result);

      // Tras registro correcto, regresar a pestaña de login
      setActiveTab("login");
      // Limpiar campos de registro
      setRegName("");
      setRegEmail("");
      setRegPassword("");
    } catch (error: any) {
      console.error("[REGISTER] Error completo:", error);
      console.error("[REGISTER] Error response:", error?.response);

      let errorMessage = "Error al registrarse. Verifica los datos.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* Left Section - Image */}
      <Box
        sx={{
          flex: { xs: 0, md: "1 1 50%" },
          display: { xs: "none", md: "flex" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={
            activeTab === "login"
              ? "/image/silla-madera-estudiante-vintage-retro-sala-clase_35380-2259.avif"
              : "/image/images (2).jpeg"
          }
          alt="Furniture showcase"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "0 24px 24px 0",
          }}
        />
        {/* Text Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: 40,
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              fontFamily: "sans-serif",
              marginBottom: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Bienvenidos al inicio de secion
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              fontFamily: "sans-serif",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            INICIO DE SESION
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Login Form */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAFAFA",
          padding: { xs: 3, md: 6 },
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="sm" sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              maxWidth: 520,
              width: "100%",
              margin: "0 auto",
              height: "100%",
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: { xs: "1.5rem", md: "1.75rem" },
                  fontWeight: 600,
                  color: "#1F2937",
                  fontFamily: "sans-serif",
                  marginBottom: 4,
                }}
              >
                INICIO DE SESION
              </Typography>

              {/* Tab Selector */}
              <Box
                sx={{
                  display: "flex",
                  gap: 0,
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  border: "1px solid #4ECDC4",
                  overflow: "hidden",
                  maxWidth: "300px",
                  margin: "0 auto",
                }}
              >
                <Button
                  onClick={() => setTab("login")}
                  sx={{
                    flex: 1,
                    backgroundColor:
                      activeTab === "login" ? "#4ECDC4" : "transparent",
                    color: activeTab === "login" ? "white" : "#4ECDC4",
                    borderRadius: "8px 0 0 8px",
                    paddingY: 1.5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor:
                        activeTab === "login" ? "#45b8b0" : "rgba(78, 205, 196, 0.1)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => setTab("register")}
                  sx={{
                    flex: 1,
                    backgroundColor:
                      activeTab === "register" ? "#4ECDC4" : "transparent",
                    color: activeTab === "register" ? "white" : "#4ECDC4",
                    borderRadius: "0 8px 8px 0",
                    paddingY: 1.5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor:
                        activeTab === "register"
                          ? "#45b8b0"
                          : "rgba(78, 205, 196, 0.1)",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>

              {/* Description Text */}
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#1F2937",
                  fontFamily: "sans-serif",
                  marginTop: 3,
                  textAlign: "center",
                }}
              >
                SEA BIENVENIDO........
                INIICIE SECION CON SUS DATOS
                SI NO TIENE UN USUARIO CREE UN CUENTA
              </Typography>
            </Box>

            {/* Error Message */}
            {error && (
              <Typography
                sx={{
                  color: "#EF4444",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {error}
              </Typography>
            )}

            {/* Login Form */}
            {activeTab === "login" && (
              <Box
                component="form"
                onSubmit={enviarFormulario}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  minHeight: 360,
                }}
              >
                {/* Username Field */}
                <Box>
                  <Typography
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        borderColor: "#4ECDC4",
                        "& fieldset": {
                          borderColor: "#4ECDC4",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4ECDC4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ECDC4",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box>
                  <Typography
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "#6B7280" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        borderColor: "#4ECDC4",
                        "& fieldset": {
                          borderColor: "#4ECDC4",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4ECDC4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ECDC4",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Remember Me and Forgot Password */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          color: "#4ECDC4",
                          "&.Mui-checked": {
                            color: "#4ECDC4",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#1F2937",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Remember me
                      </Typography>
                    }
                  />
                  <MuiLink
                    href="#"
                    sx={{
                      fontSize: "0.9rem",
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password?
                  </MuiLink>
                </Box>

                {/* Login Button */}
                <Box sx={{ mt: "auto" }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      backgroundColor: "#4ECDC4",
                      color: "white",
                      paddingY: 1.5,
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#45b8b0",
                      },
                      "&:disabled": {
                        backgroundColor: "#9CA3AF",
                      },
                    }}
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <Box
                component="form"
                onSubmit={enviarFormularioRegistro}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  minHeight: 360,
                }}
              >
                {/* Name Field */}
                <Box>
                  <Typography
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your Name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        borderColor: "#4ECDC4",
                        "& fieldset": {
                          borderColor: "#4ECDC4",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4ECDC4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ECDC4",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Email Field */}
                <Box>
                  <Typography
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Enter your Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        borderColor: "#4ECDC4",
                        "& fieldset": {
                          borderColor: "#4ECDC4",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4ECDC4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ECDC4",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Password Field */}
                <Box>
                  <Typography
                    component="label"
                    sx={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      color: "#1F2937",
                      fontFamily: "sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your Password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: "#6B7280" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        borderColor: "#4ECDC4",
                        "& fieldset": {
                          borderColor: "#4ECDC4",
                          borderWidth: "1px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#4ECDC4",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#4ECDC4",
                        },
                      },
                    }}
                  />
                </Box>

                {/* Register Button */}
                <Box sx={{ mt: "auto" }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      backgroundColor: "#4ECDC4",
                      color: "white",
                      paddingY: 1.5,
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      fontFamily: "sans-serif",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#45b8b0",
                      },
                      "&:disabled": {
                        backgroundColor: "#9CA3AF",
                      },
                    }}
                  >
                    {loading ? "Loading..." : "Register"}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
