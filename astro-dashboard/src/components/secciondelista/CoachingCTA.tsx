import React from "react";
import { Box, Typography, Button } from "@mui/material";

const CoachingCTA: React.FC = () => {
  return (
    <Box
      component="section"
      aria-label="Coaching CTA section"
      sx={{ backgroundColor: "white", paddingY: { xs: 4, md: 6 }, paddingX: { xs: 2, md: 6 } }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Box
          sx={{
            backgroundColor: "#1F2937",
            color: "white",
            borderRadius: "16px",
            paddingY: { xs: 4, md: 6 },
            paddingX: { xs: 3, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            component="h3"
            variant="h5"
            sx={{ fontWeight: 700, marginBottom: 2 }}
          >
            Online coaching lessons for remote learning.
          </Typography>
          <Typography
            component="p"
            variant="body1"
            sx={{
              color: "#D1D5DB",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: 3,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempors Lorem ipsum dolor
            sitamet, consectetur adipiscing elit, sed do eiusmod tempor
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#14B8A6",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "10px",
              paddingX: 3,
            }}
          >
            Start learning now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CoachingCTA;

