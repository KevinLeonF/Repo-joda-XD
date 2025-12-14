import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const read = () =>
      document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setMode(read());
    const obs = new MutationObserver(() => setMode(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  const theme = React.useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
