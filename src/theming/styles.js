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
  textfieldMulti: {
    width: "314px",
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
  eventContainer: {
    display: "flex",
    width: "100%",
    padding: "10px",
    overflow: "hidden",
  },
  events: {
    postion: "relative",
    width: "314px",
    height: "116px",
    background: "#FFFFFF",
    borderRadius: "30px",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px 20px 20px 40px",
  },
  eventText: {
    fontfamily: "Inter",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "29px",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    textAlign: "center",
    color: " #000000",
  },
  ellipse: {
    background: "#D9D9D9",
    zIndex: 10,
    float: "right",
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginLeft: "-50px",
    marginTop: "8px",
  },
}));

export default useStyles;
