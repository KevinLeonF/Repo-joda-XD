import { Link as MLink } from "@mui/material";
import { linkStyle } from "./style";
import { useState } from "react";
import BasicMenu from "../menu/Menu";

export interface ISubMenu {
  label: string;
  href?: string;
}
export type PropsLinks = {
  label: string;
  href: string;
  isMenu: boolean;
  subMenu?: ISubMenu[];
};
export const Link = (props: PropsLinks) => {
  return props.isMenu && props.subMenu ? (
    <BasicMenu text={props.label} menu={props.subMenu} />
  ) : (
    <MLink sx={linkStyle} href={props.href}>
      {props.label}
    </MLink>
  );
};
