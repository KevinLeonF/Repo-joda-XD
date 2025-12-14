import {
  ligthColor,
  marginBody,
  primaryColor,
  subtitleColor,
} from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const styleSubTitle: SxProps<Theme> = {
  color: subtitleColor,
  textTransform: "uppercase",
  fontWeight: 600,
  letterSpacing: 3,
  marginBottom: 4,
};
