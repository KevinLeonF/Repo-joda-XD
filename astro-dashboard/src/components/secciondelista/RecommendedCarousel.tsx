import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../carouselMenu/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./recommendedCarousel.css";
import { Box, Card, CardContent, Typography, Avatar, Chip } from "@mui/material";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

interface IRecommendedCard {
  image: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  durationLabel: string;
  categoryLabel: string;
  oldPrice?: string;
  price: string;
}

const recommendedCards: IRecommendedCard[] = [
  {
    image: "/image/images (2).jpeg",
    title: "Sofá Modular Premium",
    description:
      "Combina confort y diseño contemporáneo. Tapizado resistente y módulos ajustables.",
    authorName: "Lina",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    durationLabel: "3 Meses",
    categoryLabel: "Diseño",
    oldPrice: "$120",
    price: "$80",
  },
  {
    image: "/image/images (1).jpeg",
    title: "Mesa de Centro Roble",
    description:
      "Madera maciza con acabado natural, ideal para salas modernas y acogedoras.",
    authorName: "Lina",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    durationLabel: "3 Meses",
    categoryLabel: "Diseño",
    oldPrice: "$110",
    price: "$80",
  },
  {
    image: "/image/images.jpeg",
    title: "Silla Ergonómica Studio",
    description:
      "Respaldar adaptable y espuma de alta densidad para jornadas cómodas.",
    authorName: "Lina",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    durationLabel: "3 Meses",
    categoryLabel: "Diseño",
    oldPrice: "$95",
    price: "$80",
  },
  {
    image: "/image/mueble4.svg",
    title: "Lámpara Minimal LED",
    description:
      "Iluminación cálida y eficiente con líneas limpias para ambientes elegantes.",
    authorName: "Lina",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    durationLabel: "3 Meses",
    categoryLabel: "Diseño",
    oldPrice: "$99",
    price: "$80",
  },
  {
    image: "/image/mueble31.svg",
    title: "Butaca Vintage",
    description:
      "Tapizado texturizado y estructura sólida. Un clásico que nunca pasa de moda.",
    authorName: "Lina",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    durationLabel: "3 Meses",
    categoryLabel: "Diseño",
    oldPrice: "$105",
    price: "$80",
  },
];

const RecommendedCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Box
      className="recommended-embla"
      component="section"
      aria-label="Recommended products section"
      sx={{
        backgroundColor: "#EFF6FF",
        paddingY: { xs: 6, md: 8 },
        paddingX: { xs: 2, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#111827",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Recommended for you
          </Typography>

          <Typography
            component="a"
            href="#"
            sx={{
              color: "#14B8A6",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            See all
          </Typography>
        </Box>

        {/* Viewport */}
        <Box className="recommended-embla__viewport" ref={emblaRef}>
          <Box className="recommended-embla__container">
            {recommendedCards.map((card, i) => (
              <Box key={`${card.title}-${i}`} className="recommended-embla__slide">
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow:
                      "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
                    },
                  }}
                >
                  {/* Image */}
                  <Box sx={{ width: "100%", height: 160, overflow: "hidden" }}>
                    <Box
                      component="img"
                      src={card.image}
                      alt={card.title}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      padding: { xs: 2, md: 2.5 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.25,
                      flex: 1,
                    }}
                  >
                    {/* Meta tags */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip label={card.categoryLabel} size="small" sx={{ backgroundColor: "#F3F4F6" }} />
                      <Chip label={card.durationLabel} size="small" sx={{ backgroundColor: "#F3F4F6" }} />
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h3"
                      variant="subtitle1"
                      sx={{
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
                      sx={{ color: "#6B7280" }}
                    >
                      {card.description}
                    </Typography>

                    {/* Author + Price */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar src={card.authorAvatar} alt={card.authorName} sx={{ width: 28, height: 28 }} />
                        <Typography component="span" sx={{ color: "#6B7280", fontSize: "0.875rem" }}>
                          {card.authorName}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                        {card.oldPrice && (
                          <Typography component="span" sx={{ color: "#9CA3AF", textDecoration: "line-through", fontSize: "0.8rem" }}>
                            {card.oldPrice}
                          </Typography>
                        )}
                        <Typography component="span" sx={{ color: "#10B981", fontWeight: 700 }}>
                          {card.price}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2, gap: 1 }}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedCarousel;

