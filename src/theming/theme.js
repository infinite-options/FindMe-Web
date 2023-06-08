import { createTheme } from "@material-ui/core/styles";
import drKabelotf from "./DrKabel.otf";
import interRegularotf from "./InterRegular.otf";

const drKabel = {
  fontFamily: '"Dr Kabel"',
  src: `
    local('"Dr Kabel"'),
    url(${drKabelotf}) format('opentype')
  `,
};
const inter = {
  fontFamily: '"Inter"',
  src: `
    local('"Inter"'),
    url(${interRegularotf}) format('opentype')
  `,
};

const theme = createTheme({
  palette: {
    background: {
      default: "#0A23A6",
    },
    primary: {
      main: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#07B8DF",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: [
      '"Dr Kabel"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      "Inter",
    ].join(","),
  },
  caption: {
    fontFamily: inter,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [drKabel],
      },
    },
  },
});

export default theme;
