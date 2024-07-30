import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <Container sx={{ margin: "16px 0px", textAlign: "center" }}>
      <Typography variant="h4">Something went wrong 😢</Typography>
      <Typography variant="overline" color="red">
        {error.data || error.message}
      </Typography>
      {/* <p>%MESSAGE%</p> */}
      <Box>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          &larr; Go back
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
