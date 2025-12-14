import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import { darkColor, primaryColor } from "@/styles/global";
import type { ISubMenu } from "../link/Link";

interface IMenuProps {
  text?: string;
  menu: ISubMenu[];
}

export default function BasicMenu({ text, menu }: IMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        sx={{
          fontSize: 15,
          color: darkColor,
          fontWeight: "600",
          textTransform: "capitalize",
          padding: 0,
        }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={
          <KeyboardArrowDown
            fontSize="medium"
            sx={{ fill: primaryColor, margin: 0 }}
          />
        }
      >
        {text}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {menu.map((e, i) => {
          return (
            <MenuItem key={`${e.label}-${i}`} onClick={handleClose}>
              {e.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
