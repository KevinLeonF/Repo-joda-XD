import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styleImageCard, styleSimpleCard } from "./styles";
import Rating from "@mui/material/Rating";

interface ISimpleCardProps {
  image: string;
  title: string;
  price: number;
  star: number;
}

const SimpleCard = ({ image, title, price, star }: ISimpleCardProps) => {
  return (
    <Box sx={styleSimpleCard}>
      <img src={image} style={styleImageCard} />
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Rating
          name="simple-uncontrolled"
          defaultValue={star}
        />
        <Typography variant="body2" component="span">
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};
export default SimpleCard;
