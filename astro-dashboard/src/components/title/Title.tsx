import { primaryColor } from "@/styles/global";
import { Box, Typography } from "@mui/material";
import { styleSubTitle } from "./style";
interface propsTitle {
  subtitle?: string;
  title: string;
  colorLastLetters?: boolean;
  widthBox?: string;
}

const Title = ({
  subtitle,
  title,
  colorLastLetters,
  widthBox = "100%",
}: propsTitle) => {
  const titleTextAll = title.trim().split(" ");
  const lastLetters = titleTextAll.pop();
  return (
    <Box sx={{ width: widthBox }}>
      {subtitle && (
        <Typography variant="subtitle1" sx={styleSubTitle}>
          {subtitle}
        </Typography>
      )}
      {!colorLastLetters ? (
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>{title}</Typography>
      ) : (
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {titleTextAll.map((e, i) => {
            return `${e} `;
          })}
          <Typography
            sx={{ color: primaryColor }}
            component="span"
            variant="inherit"
          >
            {lastLetters}
          </Typography>
        </Typography>
      )}
    </Box>
  );
};
export default Title;
