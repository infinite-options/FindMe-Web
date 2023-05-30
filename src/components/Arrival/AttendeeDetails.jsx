import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(
  () => `
      width: 200px;
      align-self: center;
    `
);

const AttendeeDetails = () => {
  const location = useLocation();
  const attendee = location.state;
  const navigate = useNavigate();

  const columns = [
    { field: "col1", width: 250 },
    { field: "col2", width: 250 },
  ];

  const handleGridRows = () => {
    let rows = [];
    Object.entries(attendee).forEach((e, i) => {
      rows.push({ id: i, col1: e[0], col2: e[1] });
    });
    return rows;
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {"Attendee details"}
        </Typography>
        <DataGrid
          columns={columns}
          slots={{ columnHeaders: () => null }}
          rows={handleGridRows()}
          hideFooter
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", my: 4 }}>
        <StyledButton
          variant="contained"
          align="center"
          onClick={() => navigate(-1)}
        >
          {"Save card"}
        </StyledButton>
      </Box>
    </Container>
  );
};

export default AttendeeDetails;
