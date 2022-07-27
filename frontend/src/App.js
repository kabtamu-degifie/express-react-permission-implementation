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
import PageNotFound from "./pages/404";
import Unauthorized from "./pages/unuthorized";

const App = () => {
  const { mode: theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Home />} />

            {/* we want to protect these routes */}
            <Route element={<PageContainer />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route element={<ProtectedRoute permissions={["view_role"]} />}>
                <Route path="role" element={<Role />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="unauthorized" element={<Unauthorized />} />
              </Route>
            </Route>

            {/* catch all */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default App;
