import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardBackspace } from "@mui/icons-material";
import { getDecodedToken } from "../../libs/local-storage";

function PageNotFound() {
  const link = getDecodedToken() ? "dashboard" : "login";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h2">404! Page Not Found</Typography>
      <Button
        startIcon={<KeyboardBackspace />}
        variant="outlined"
        sx={{ textTransform: "capitalize" }}
        LinkComponent={Link}
        to={link}
      >
        Back to {link}
      </Button>
    </Box>
  );
}

export default PageNotFound;
