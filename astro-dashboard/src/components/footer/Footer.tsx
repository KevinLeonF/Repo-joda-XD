import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <Box
      component="footer"
      aria-label="Footer"
      sx={{
        backgroundColor: "#282C3F",
        paddingY: { xs: 6, md: 8 },
        paddingX: { xs: 2, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        {/* Logo and Tagline Section */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: { xs: 6, md: 8 },
          }}
        >
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              marginBottom: 4,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="/image/logo.svg"
              alt="Logo"
              sx={{
                height: 40,
                width: 'auto',
                display: 'block',
              }}
            />

            {/* Vertical Divider */}
            <Box
              component="div"
              sx={{
                width: "1px",
                height: "24px",
                backgroundColor: "white",
                opacity: 0.3,
              }}
            />

            {/* Tagline */}
            <Typography
              component="p"
              sx={{
                color: "white",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontFamily: "sans-serif",
                fontWeight: 400,
              }}
            >
              Virtual Class for Zoom
            </Typography>
          </Box>

          {/* Newsletter Subscription Section */}
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <Typography
              component="h3"
              sx={{
                color: "white",
                fontSize: { xs: "1.1rem", md: "1.25rem" },
                fontWeight: 600,
                fontFamily: "sans-serif",
                textAlign: "center",
              }}
            >
              Subscribe to get our Newsletter
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                maxWidth: "500px",
                flexDirection: { xs: "column", sm: "row" },
              }}
              onSubmit={(e) => {
                e.preventDefault();
                // Handle subscription
              }}
            >
              <TextField
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    border: "1px solid white",
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                    "&::placeholder": {
                      color: "#9CA3AF",
                      opacity: 1,
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#9CA3AF",
                    opacity: 1,
                  },
                }}
                inputProps={{
                  style: {
                    color: "white",
                    fontFamily: "sans-serif",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#4ECDC4",
                  color: "white",
                  paddingX: { xs: 4, md: 5 },
                  paddingY: 1.5,
                  borderRadius: "8px",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: 600,
                  fontFamily: "sans-serif",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#45b8b0",
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Footer Links and Copyright */}
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            paddingTop: 4,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Footer Links */}
          <Box
            component="nav"
            aria-label="Footer navigation"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Typography
              component="a"
              href="#careers"
              sx={{
                color: "white",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontFamily: "sans-serif",
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Careers
            </Typography>

            <Box
              component="span"
              sx={{
                width: "1px",
                height: "16px",
                backgroundColor: "white",
                opacity: 0.3,
              }}
            />

            <Typography
              component="a"
              href="#privacy"
              sx={{
                color: "white",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontFamily: "sans-serif",
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Privacy Policy
            </Typography>

            <Box
              component="span"
              sx={{
                width: "1px",
                height: "16px",
                backgroundColor: "white",
                opacity: 0.3,
              }}
            />

            <Typography
              component="a"
              href="#terms"
              sx={{
                color: "white",
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontFamily: "sans-serif",
                textDecoration: "none",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Terms & Conditions
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography
            component="p"
            sx={{
              color: "white",
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              fontFamily: "sans-serif",
              textAlign: "center",
            }}
          >
            © 2021 Class Technologies Inc.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
