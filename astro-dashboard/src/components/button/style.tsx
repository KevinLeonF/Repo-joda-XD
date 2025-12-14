import { ligthColor, primaryColor } from "@/styles/global";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export const bgPrimaryButton: SxProps<Theme> = {
  backgroundColor: primaryColor,
};

export const bgSecondaryButton: SxProps<Theme> = {
  backgroundColor: ligthColor,
};

export const bgTransparentButton: SxProps<Theme> = {
  backgroundColor: "transparent",
};

export const bgShadownPrimaryButton: SxProps<Theme> = {
  boxShadow: `0px 7px 12px 0px ${primaryColor}`,
};

export const bgShadownNormalButton: SxProps<Theme> = {
  boxShadow: "0px 7px 12px 0px #6a6a6a",
};

export const btnButton: SxProps<Theme> = {
  borderRadius: "25px",
  textTransform: "capitalize",
};
