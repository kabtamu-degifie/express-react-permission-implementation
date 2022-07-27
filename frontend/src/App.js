import React from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import appTheme from "./theme";

import PageContainer from "./layouts/PageContainer";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./pages/login";
import Register from "./pages/user";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Role from "./pages/role";

const App = () => {
  const { mode: theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" index element={<Home />} />
            <Route path="/" element={<PageContainer />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="role"
                element={
                  <ProtectedRoute permissions={["view_role"]}>
                    <Role />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<h1>404! Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
