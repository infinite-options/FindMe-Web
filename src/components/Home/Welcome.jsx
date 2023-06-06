import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useStyles from "../../theming/styles";

export default function Welcome() {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="flex-start">
        <Typography variant="h1" className={classes.whiteText}>
          {"biz"}
        </Typography>
        <Typography variant="h1" className={classes.blueText}>
          {"buz"}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="flex-end">
        <Typography variant="h3" className={classes.blueText}>
          {"by"}&nbsp;
        </Typography>
        <Typography variant="h3" className={classes.whiteText}>
          {"design"}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 12 }}
      >
        <Button
          className={classes.button}
          onClick={() => navigate("/pre-registration")}
        >
          {"Register for an event"}
        </Button>
        <Button
          className={classes.button}
          onClick={() => navigate("/find-event")}
        >
          {"Find an Event"}
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (
              document.cookie !== "" &&
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn=")) !== undefined
            ) {
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn="))
                .split("=")[1] === "true"
                ? navigate("/currentEvents", {
                    state: {
                      email: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_email="))
                        .split("=")[1],
                      user: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_details="))
                        .split("=")[1],
                    },
                  })
                : navigate("/login", {
                    state: { path: "/currentEvents" },
                  });
            } else {
              navigate("/login", {
                state: { path: "/currentEvents" },
              });
            }
          }}
        >
          {"Attend an Event"}
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            if (
              document.cookie !== "" &&
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn=")) !== undefined
            ) {
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("loggedIn="))
                .split("=")[1] === "true"
                ? navigate("/organizerEventList", {
                    state: {
                      email: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_email="))
                        .split("=")[1],
                      user: document.cookie
                        .split("; ")
                        .find((row) => row.startsWith("user_details="))
                        .split("=")[1],
                    },
                  })
                : navigate("/login", {
                    state: { path: "/organizerEventList" },
                  });
            } else {
              navigate("/login", {
                state: { path: "/organizerEventList" },
              });
            }
          }}
        >
          {"Create/Edit an Event"}
        </Button>
      </Stack>
      <Typography
        variant="h6"
        align="center"
        className={classes.whiteText}
        sx={{ mt: 10 }}
      >
        {"We use cookies!"}
      </Typography>
      <Typography
        variant="h3"
        align="center"
        className={classes.blueText}
        sx={{ mt: 10 }}
      >
        {"bizbuz.design"}
      </Typography>
    </Box>
  );
}
