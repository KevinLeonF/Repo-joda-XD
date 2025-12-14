import { primaryColor } from "@/styles/global";
import { Box } from "@mui/material";

const ImagePeople = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 500,
        height: 550,
      }}
    >
      <Box
        sx={{
          backgroundImage: `url('/image/image.webp')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "-15px",
          width: "100%",
          height: "100%",
          position: "absolute",
          bottom: 0,
        }}
      ></Box>
      <Box
        sx={{
          background: primaryColor,
          width: "85%",
          height: "76%",
          borderRadius: "50%",
          position: "absolute",
          bottom: "-1px",
          left: "10%",
          zIndex: "-1",
        }}
      ></Box>
    </Box>
  );
};
export default ImagePeople;
