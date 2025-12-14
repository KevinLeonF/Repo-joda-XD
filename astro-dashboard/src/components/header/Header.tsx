import { Button } from "../button/Button";
import { Link } from "../link/Link";
import type { PropsLinks } from "../link/Link";
import {
  ShoppingBagOutlined,
  SearchOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import Logo from "../logo/Logo";
import { Box } from "@mui/material";
import { navStyle } from "./style";

const menu: PropsLinks[] = [
  { label: "Home", href: "#", isMenu: false },
  {
    label: "Menu",
    href: "#",
    isMenu: true,
    subMenu: [{ label: "Profile" }, { label: "About" }],
  },
  {
    label: "Services",
    href: "#",
    isMenu: true,
    subMenu: [
      { label: "Profile" },
      { label: "About" },
    ],
  },
  { label: "Offers", href: "#", isMenu: false },
];

export default function Header() {
  const goLoginUrl = () => {
     window.location.href = "/auth/login";
  };

  return (
    <Box sx={navStyle}>
      <Logo />
      <Box
        sx={{
          display: "flex",
          width: "40%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {menu.map((e, i) => {
          return (
            <Link
              key={`${e.label}-${i}`}
              label={e.label}
              href={e.href}
              isMenu={e.isMenu}
              subMenu={e.subMenu}
            />
          );
        })}
      </Box>
      <Box>
        <Button aloneIcon Icon={SearchOutlined} transparent={true} />
        <Button aloneIcon Icon={ShoppingBagOutlined} transparent />
        <Button
          text="Inicio de Sesion"
          Icon={PhoneOutlined}
          onClick={goLoginUrl}
        />
      </Box>
    </Box>
  );
}
