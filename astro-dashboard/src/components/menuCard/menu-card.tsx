import { Favorite, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styleCard, styleFavorite, styleImageCard } from "./styles";
import { paragrahColor, secondayColor, subtitleColor } from "@/styles/global";

export interface IMenuCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  star: number;
}

const MenuCard = ({
  image,
  title,
  description,
  price,
  star,
}: IMenuCardProps) => {
  return (
    <Box sx={styleCard}>
      <Box sx={styleFavorite}>
        <Favorite />
      </Box>
      <img src={image} style={styleImageCard} />
      <Box sx={{ width: "100%", padding: "0px 40px" }}>
        <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: 1, fontWeight: "bold", color: paragrahColor }}
        >
          {description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} component="span">
            <Typography
              variant="body2"
              sx={{ color: subtitleColor }}
              component="span"
            >
              $
            </Typography>
            {price.toFixed(2)}
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Star color="warning" />
            <Typography
              variant="h6"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              {star.toFixed(1)}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default MenuCard;
