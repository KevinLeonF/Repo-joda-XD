import { darkColor, primaryColor } from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const linkStyle: SxProps<Theme> = {
  fontSize: 15,
  textDecoration: "none",
  color: darkColor,
  "&:hover": {
    color: primaryColor,
  },
  fontWeight: "600",
};
