import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import ProtectedRoute from "../ProtectedRoute";
import Dashboard from "../pages/dashboard";
import Role from "../pages/role";

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
          <Route path="/" element={<Dashboard />} />
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

export default React.memo(PageContainer);
