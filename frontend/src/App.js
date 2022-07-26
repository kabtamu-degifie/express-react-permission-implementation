import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import appTheme from "./theme";

const App = () => {
  const { mode: theme } = useSelector((state) => state.theme);
  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline></CssBaseline>
    </ThemeProvider>
  );
};

export default App;
