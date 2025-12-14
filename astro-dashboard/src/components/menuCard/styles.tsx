import {
  darkColor,
  ligthColor,
  marginBody,
  primaryColor,
} from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";
import type { CSSProperties } from "react";

export const styleCard: SxProps<Theme> = {
  width: 380,
  height: 500,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  margin:"0px 20px",
  boxShadow: "0px 17px 22px 0px #c8c8c8ff",
  borderRadius: "25px",
};

export const styleImageCard: CSSProperties = {
  width: 250,
  height: 250,
};

export const styleFavorite: SxProps<Theme> = {
  backgroundColor: primaryColor,
  width: 75,
  height: 60,
  position: "absolute",
  top: 0,
  right: "-28px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0px 25px 0px 25px",
};
