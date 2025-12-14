import React from "react";
import type { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../carouselMenu/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import "./lessonCarousel.css";
import { Box, Card, CardContent, Typography, Avatar, LinearProgress } from "@mui/material";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

interface ILessonCard {
  image: string;
  title: string;
  instructorName: string;
  instructorAvatar: string;
  currentLesson: number;
  totalLessons: number;
  progress: number;
}

const lessonCards: ILessonCard[] = [
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
   {
    image: "/public/image/images (1).jpeg",
    title: "AWS Certified Solutions Architect",
    instructorName: "Lina",
    instructorAvatar: "https://i.pravatar.cc/150?img=5",
    currentLesson: 5,
    totalLessons: 7,
    progress: 71,
  },
];

const LessonCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <Box
      id="lesson-section"
      className="lesson-embla"
      component="section"
      aria-label="Lessons section"
      sx={{
        backgroundColor: "#EFF6FF",
        paddingY: { xs: 4, md: 8 },
        paddingX: { xs: 2, md: 6 },
        minHeight: "500px",
      }}
    >
      <Box sx={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
            paddingX: { xs: 1, md: 2 },
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontSize: { xs: "1.4rem", md: "1.75rem" },
              fontWeight: 700,
              color: "#1F2937",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Welcome back, ready for your next lesson?
          </Typography>
          <Typography
            component="a"
            href="#"
            sx={{
              fontSize: { xs: "0.875rem", md: "0.95rem" },
              color: "#14B8A6",
              fontFamily: "system-ui, -apple-system, sans-serif",
              textDecoration: "none",
              fontWeight: 600,
              whiteSpace: "nowrap",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            View history
          </Typography>
        </Box>

        {/* Carousel Viewport */}
        <Box className="lesson-embla__viewport" ref={emblaRef}>
          <Box className="lesson-embla__container">
            {lessonCards.map((card, i) => {
              return (
                <Box key={`${card.title}-${i}`} className="lesson-embla__slide">
                  <Card
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
                      },
                    }}
                  >
                    {/* Image Section */}
                    <Box
                      sx={{
                        width: "100%",
                        height: { xs: "180px", md: "200px" },
                        overflow: "hidden",
                        position: "relative",
                        backgroundColor: "#F3F4F6",
                      }}
                    >
                      <Box
                        component="img"
                        src={card.image}
                        alt={card.title}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        padding: { xs: 2, md: 2.5 },
                        paddingBottom: { xs: 2, md: 2.5 },
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {/* Title */}
                      <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                          fontWeight: 600,
                          color: "#111827",
                          fontFamily: "system-ui, -apple-system, sans-serif",
                          lineHeight: 1.3,
                          marginBottom: 0.5,
                        }}
                      >
                        {card.title}
                      </Typography>

                      {/* Instructor Info */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          marginBottom: 1,
                        }}
                      >
                        <Avatar
                          src={card.instructorAvatar}
                          alt={card.instructorName}
                          sx={{
                            width: 28,
                            height: 28,
                          }}
                        />
                        <Typography
                          component="span"
                          sx={{
                            fontSize: { xs: "0.8rem", md: "0.875rem" },
                            color: "#6B7280",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {card.instructorName}
                        </Typography>
                      </Box>

                      {/* Progress Section */}
                      <Box sx={{ marginTop: "auto" }}>
                        <LinearProgress
                          variant="determinate"
                          value={card.progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "#E0F2F1",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "#14B8A6",
                              borderRadius: 3,
                            },
                          }}
                        />
                        <Typography
                          component="p"
                          sx={{
                            fontSize: { xs: "0.7rem", md: "0.75rem" },
                            color: "#9CA3AF",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            marginTop: 0.75,
                            textAlign: "right",
                            fontWeight: 500,
                          }}
                        >
                          Lesson {card.currentLesson} of {card.totalLessons}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 3,
            gap: 1,
            paddingX: { xs: 1, md: 2 },
          }}
        >
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
    </Box>
  );
};

export default LessonCarousel;
