import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    height: "100vh",
  },
  whiteText: {
    color: theme.palette.primary.main,
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  blueText: {
    color: theme.palette.secondary.main,
    fontFamily: `${theme.typography.fontFamily} !important`,
  },
  button: {
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
    width: "314px",
    height: "50px",
    borderRadius: "30px !important",
    alignSelf: "center",
    fontSize: "24px !important",
    fontWeight: "400 !important",
    fontFamily: "Inter !important",
    textTransform: "none !important",
  },
  textfield: {
    width: "314px",
    height: "62px",
    marginTop: "1rem",
    color: `${theme.palette.primary.contrastText} !important`,
    backgroundColor: `${theme.palette.primary.main} !important`,
    borderRadius: "30px",
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      underline: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      underline: "none",
    },
  },
  error: {
    fontSize: "small",
    color: "red",
  },
  hidden: {
    visibility: "hidden",
  },
}));

export default useStyles;
