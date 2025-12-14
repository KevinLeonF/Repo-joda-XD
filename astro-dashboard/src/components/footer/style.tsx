import { ligthColor, marginBody, primaryColor } from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const styleFooter: SxProps<Theme> = {
  margin: marginBody,
  padding: "40px 0px 0px 0px",
  height: 400,
  display: "grid",
  gridTemplateColumns: "30% 70%",
};

export const styleDescriptionFinal: SxProps<Theme> = {
  width: "50%",
  marginTop: 5,
};

export const styleLinksFooter: SxProps<Theme> = {
  display: "flex",
  justifyContent: "flex-start",
  gap: "150px",
};

export const styleSocialBtn: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
};

export const styleCopyright: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
};
