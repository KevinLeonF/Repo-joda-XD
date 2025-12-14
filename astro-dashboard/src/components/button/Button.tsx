import { IconButton, Button as MButton } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import type { MouseEventHandler } from "react"; //esto es para agregar eventos de click

import {
  bgPrimaryButton,
  bgSecondaryButton,
  bgShadownNormalButton,
  bgShadownPrimaryButton,
  bgTransparentButton,
  btnButton,
} from "./style";
type SvgIconComponent = typeof SvgIcon;

interface propsButton {
  text?: string;
  aloneIcon?: boolean;
  Icon?: SvgIconComponent;
  primary?: boolean;
  secondary?: boolean;
  transparent?: boolean;
  shadowNormal?: boolean;
  shadowPrimary?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  text,
  aloneIcon = false,
  Icon,
  secondary,
  transparent,
  shadowNormal,
  shadowPrimary,
  onClick,
}: propsButton) => {
  let sxStyles = {};
  //////DETERMINAR QUE COLOR VA EL BOTON////
  switch (true) {
    case secondary: {
      sxStyles = { ...btnButton, ...bgSecondaryButton };
      break;
    }
    case transparent: {
      sxStyles = { ...btnButton, ...bgTransparentButton };
      break;
    }
    default: {
      sxStyles = { ...btnButton, ...bgPrimaryButton };
      break;
    }
  }
  /////.................................////
  //////DETERMINAR QUE DISENIO VA EL BOTON////
  const designButton = {
    normal: {
      padding: "10px 30px",
    },
    aloneIcon: {
      padding: "10px 10px",
    },
  };
  sxStyles = {
    ...sxStyles,
    ...designButton[`${aloneIcon ? "aloneIcon" : "normal"}`],
  };
  const designShadownButton = {
    normal: bgShadownNormalButton,
    primary: bgShadownPrimaryButton,
  };
  if (shadowNormal || shadowPrimary) {
    sxStyles = {
      ...sxStyles,
      ...designShadownButton[shadowNormal ? "normal" : "primary"],
    };
  }
  /////.................................////
  const ButtonIcon = (
    <MButton variant="contained" startIcon={Icon && <Icon />} sx={sxStyles} onClick={onClick}> 
      {text}
    </MButton>
  );
  const ButtonAlone = (
    <MButton variant="contained" sx={sxStyles} onClick={onClick}>
      {text}
    </MButton>
  );
  return aloneIcon ? (
    <IconButton aria-label="delete" size="large" sx={sxStyles} onClick={onClick}>
      {Icon && <Icon />}
    </IconButton>
  ) : Icon ? (
    ButtonIcon
  ) : (
    ButtonAlone
  );
};
