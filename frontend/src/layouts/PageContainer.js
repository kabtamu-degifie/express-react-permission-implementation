import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Role from "../pages/role";
import NavBar from "./NavBar";
import { Container } from "@mui/material";

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
        <Routes>
          <Route
            path="role"
            element={
              <ProtectedRoute>
                <Role />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </>
  );
}

export default PageContainer;
