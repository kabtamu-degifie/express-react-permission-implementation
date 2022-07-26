import { createTheme } from "@mui/material/styles";

const appTheme = (theme) =>
  createTheme({
    ...(theme === "dark" ? {} : {}),
    palette: {
      mode: theme,
    },
  });

export default appTheme;
