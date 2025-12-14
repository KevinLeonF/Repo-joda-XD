import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface ICategoryCard {
  title: string;
  description: string;
  image: string;
}

const categoryCards: ICategoryCard[] = [
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
  {
    title: "Design",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/public/image/images (1).jpeg",
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "white",
        paddingY: { xs: 6, md: 10 },
        paddingX: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Title */}
        <Typography
          component="h2"
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", md: "1.875rem" },
            fontWeight: 700,
            color: "#111827",
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: { xs: 4, md: 6 },
            paddingX: { xs: 1, md: 2 },
          }}
        >
          Choice favourite course from top category
        </Typography>

        {/* Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {categoryCards.map((card, index) => (
            <Box key={`${card.title}-${index}`}>
              <Card
                sx={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    padding: { xs: 2.5, md: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 2,
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 80,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={card.image}
                      alt={`${card.title} icon`}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.125rem" },
                      fontWeight: 700,
                      color: "#111827",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    component="p"
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.8rem", md: "0.875rem" },
                      color: "#6B7280",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryGrid;
