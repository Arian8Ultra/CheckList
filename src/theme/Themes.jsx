import { createTheme } from "@mui/material/styles";
import { background, primary, secondary, secondaryDark, secondaryLight } from "./Colors";

export const theme = createTheme({
  typography: {
    fontFamily: "Shabnam-Light,sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark,
    },
    background: {
      default: background,
      paper: "#ffffff",
    },
  },
  direction: "rtl",
});

export const borderRadiuos = "25px"; /* 4 */
export const borderRadiuosMenu = 4; /* 4 */
export const borderRadiuosTextField = 5; /* 50 */
export const borderRadiuosButton = "15px"; /* ' 20px 50px 50px 20px' */
