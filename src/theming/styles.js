import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    minHeight: "100vh",
  },
  box: {
    minHeight: "90vh",
    marginTop: "16px",
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
}));

export default useStyles;
