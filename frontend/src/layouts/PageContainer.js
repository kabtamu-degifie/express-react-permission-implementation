import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./NavBar";

function PageContainer() {
  return (
    <>
      <NavBar />
      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        sx={{ pt: 2, pb: 6 }}
      >
        <Outlet />
      </Container>
    </>
  );
}

export default React.memo(PageContainer);
