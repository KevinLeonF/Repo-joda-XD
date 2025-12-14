import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./style.css";
import { Box, Card, CardContent, Typography } from "@mui/material";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

interface IFeatureCard {
  icon: string;
  iconBgColor: string;
  title: string;
  description: string;
}

const featureCards: IFeatureCard[] = [
  {
    icon: "/image/muebel1.svg",
    iconBgColor: "#3B82F6",
    title: "Colección de Sala Moderna",
    description:
      "Muebles de sala elegantes y confortables para transformar tu hogar con estilo premium.",
  },
  {
    icon: "/image/mueble21.svg",
    iconBgColor: "#10B981",
    title: "Soluciones para Oficina",
    description:
      "Amoblamiento profesional que combina funcionalidad y diseño moderno para espacios productivos.",
  },
  {
    icon: "/image/mueble31.svg",
    iconBgColor: "#06B6D4",
    title: "Dormitorios Completos",
    description:
      "Crea tu refugio ideal con juegos de dormitorio de alta calidad y diseño elegante.",
  },
  {
    icon: "/image/mueble4.svg",
    iconBgColor: "#8B5CF6",
    title: "Esenciales de Comedor",
    description:
      "Mesas y sillas para reuniones inolvidables. Todo lo que necesitas para tu comedor.",
  },
  {
    icon: "/image/620358e6a32c5efadeab2536a4655581.jpg",
    iconBgColor: "#F59E0B",
    title: "Selección Premium",
    description:
      "Piezas seleccionadas que elevan la decoración de tu hogar con materiales de primera.",
  },
  {
    icon: "/image/df256f422a8ab20ad9f4c78652f25255.jpg",
    iconBgColor: "#EF4444",
    title: "Colección Contemporánea",
    description:
      "Diseños actuales que reflejan las últimas tendencias en mobiliario y decoración.",
  },
  {
    icon: "/image/images (1).jpeg",
    iconBgColor: "#14B8A6",
    title: "Amoblamiento de Lujo",
    description:
      "Colecciones de alta gama con acabados finos y atención al detalle.",
  },
  {
    icon: "/image/images (2).jpeg",
    iconBgColor: "#4ECDC4",
    title: "Soluciones Compactas",
    description:
      "Diseños inteligentes que optimizan espacios pequeños sin sacrificar estilo ni funcionalidad.",
  },
  {
    icon: "/image/images (3).jpeg",
    iconBgColor: "#EC4899",
    title: "Muebles Eco‑amigables",
    description:
      "Opciones sostenibles fabricadas con materiales responsables y procesos respetuosos con el ambiente.",
  },
  {
    icon: "/image/images (4).jpeg",
    iconBgColor: "#6366F1",
    title: "Diseño a Medida",
    description:
      "Soluciones personalizadas para crear piezas únicas junto a nuestros diseñadores.",
  },
  {
    icon: "/image/images.jpeg",
    iconBgColor: "#F97316",
    title: "Colección Exterior",
    description:
      "Mobiliario resistente y con estilo para patio, jardín o balcón, preparado para el clima.",
  },
  {
    icon: "/image/pngtree-outdoor-furniture-black-and-white-furniture-png-image_13419578.png",
    iconBgColor: "#8B5CF6",
    title: "Diseño Minimalista",
    description:
      "Líneas limpias y estética simple que aporta serenidad y sofisticación a cualquier espacio.",
  },
  {
    icon: "/image/silla-madera-estudiante-vintage-retro-sala-clase_35380-2259.avif",
    iconBgColor: "#10B981",
    title: "Vintage y Retro",
    description:
      "Piezas atemporales con carácter, que combinan la esencia clásica con el confort actual.",
  },
];

const CarouselMenu: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Box
      className="embla"
      component="section"
      aria-label="Features section"
      sx={{
        backgroundColor: "white",
        paddingY: { xs: 6, md: 10 },
        paddingX: { xs: 2, md: 0 },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 3,
          }}
        >
          <Box sx={{ flex: 1 }} />
          <Box className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </Box>
        </Box>

        <Box className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </Box>
      </Box>
      <Box className="embla__viewport" ref={emblaRef}>
        <Box className="embla__container">
          {featureCards.map((card, i) => {
            return (
              <Box key={`${card.title}-${i}`} className="embla__slide">
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: { xs: 3, md: 4 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      padding: "0 !important",
                      width: "100%",
                    }}
                  >
                    {/* Full Image */}
                    <Box
                      sx={{
                        width: "100%",
                        height: { xs: "200px", md: "250px" },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 1,
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        component="img"
                        src={card.icon}
                        alt={`${card.title} image`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
                    </Box>

                    {/* Title */}
                    <Typography
                      component="h3"
                      variant="h5"
                      sx={{
                        fontSize: { xs: "1.1rem", md: "1.25rem" },
                        fontWeight: 700,
                        color: "#1F2937",
                        fontFamily: "sans-serif",
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      component="p"
                      variant="body1"
                      sx={{
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        color: "#6B7280",
                        fontFamily: "sans-serif",
                        lineHeight: 1.6,
                        maxWidth: "100%",
                      }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselMenu;
