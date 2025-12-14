import { useState } from "react";
import { registerRequest } from "@/lib/service.auth";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor completa nombre, email y contraseña.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const resp = await registerRequest({ name, email, password });
      console.log("[REGISTER] Respuesta exitosa:", resp);
      // Tras registro, dirigimos al login
      window.location.href = "/auth/login";
    } catch (error: any) {
      let errorMessage = "Error al registrar. Inténtalo nuevamente.";
      if (error?.message) errorMessage = error.message;
      else if (error?.data?.message) errorMessage = error.data.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#FAFAFA",
      }}
    >
      {/* Sección Izquierda - Imagen */}
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
          src="/image/images (2).jpeg"
          alt="Furniture showcase"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "0 24px 24px 0",
          }}
        />
        {/* Texto sobre imagen */}
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
            Lorem Ipsum is simply
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              fontFamily: "sans-serif",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Lorem Ipsum is simply
          </Typography>
        </Box>
      </Box>

      {/* Sección Derecha - Formulario */}
      <Box sx={{ flex: { xs: 1, md: "1 1 50%" }, display: "flex", alignItems: "center" }}>
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: "white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
              borderRadius: "12px",
              padding: 4,
              marginTop: 6,
            }}
          >
            {/* Encabezado y Tabs simulados */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 0,
                  border: "1px solid #4ECDC4",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Button
                  component="a"
                  href="/auth/login"
                  sx={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: "#4ECDC4",
                    borderRadius: "8px 0 0 8px",
                    paddingY: 1.5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(78, 205, 196, 0.1)",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  disabled
                  sx={{
                    flex: 1,
                    backgroundColor: "#4ECDC4",
                    color: "white",
                    borderRadius: "0 8px 8px 0",
                    paddingY: 1.5,
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    fontFamily: "sans-serif",
                    textTransform: "none",
                  }}
                >
                  Register
                </Button>
              </Box>

              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#1F2937",
                  fontFamily: "sans-serif",
                  marginTop: 3,
                  textAlign: "center",
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Typography>
            </Box>

            {/* Mensaje de error */}
            {error && (
              <Typography sx={{ color: "#EF4444", fontSize: "0.9rem", textAlign: "center" }}>
                {error}
              </Typography>
            )}

            {/* Formulario de registro */}
            <Box component="form" onSubmit={enviarFormulario} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Nombre */}
              <Box>
                <Typography component="label" sx={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#1F2937", fontFamily: "sans-serif", marginBottom: 1 }}>
                  Name
                </Typography>
                <TextField
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      borderColor: "#4ECDC4",
                      "& fieldset": { borderColor: "#4ECDC4", borderWidth: "1px" },
                      "&:hover fieldset": { borderColor: "#4ECDC4" },
                      "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                    },
                  }}
                />
              </Box>

              {/* Email */}
              <Box>
                <Typography component="label" sx={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#1F2937", fontFamily: "sans-serif", marginBottom: 1 }}>
                  Email address
                </Typography>
                <TextField
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      borderColor: "#4ECDC4",
                      "& fieldset": { borderColor: "#4ECDC4", borderWidth: "1px" },
                      "&:hover fieldset": { borderColor: "#4ECDC4" },
                      "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                    },
                  }}
                />
              </Box>

              {/* Password */}
              <Box>
                <Typography component="label" sx={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#1F2937", fontFamily: "sans-serif", marginBottom: 1 }}>
                  Password
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#6B7280" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      borderColor: "#4ECDC4",
                      "& fieldset": { borderColor: "#4ECDC4", borderWidth: "1px" },
                      "&:hover fieldset": { borderColor: "#4ECDC4" },
                      "&.Mui-focused fieldset": { borderColor: "#4ECDC4" },
                    },
                  }}
                />
              </Box>

              {/* Botón Registrar */}
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
                  "&:hover": { backgroundColor: "#45b8b0" },
                  "&:disabled": { backgroundColor: "#9CA3AF" },
                }}
              >
                {loading ? "Loading..." : "Register"}
              </Button>

              {/* Ya tiene cuenta */}
              <Typography sx={{ textAlign: "center", fontSize: "0.9rem", color: "#1F2937", fontFamily: "sans-serif" }}>
                ¿Ya tienes una cuenta?{" "}
                <MuiLink href="/auth/login" sx={{ color: "#4ECDC4", textDecoration: "none", fontWeight: 600 }}>
                  Inicia sesión
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Register;
