import { darkColor, ligthColor, marginBody } from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";
import type { CSSProperties } from "react";

export const styleSimpleCard: SxProps<Theme> = {
  width: 280,
  display: "flex",
  backgroundColor: ligthColor,
  padding: "15px",
  borderRadius: "20px",
  boxShadow: "0px 7px 12px 0px #8f8f8fff",
  gap: 2,
};

export const styleImageCard: CSSProperties = {
  width: 80,
  height: 80,
};
