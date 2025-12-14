import { darkColor, marginBody } from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const navStyle: SxProps<Theme> = {
  padding: "20px 0px",
  margin: marginBody,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
