import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { LightMode, Nightlight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../services/theme/slice";
import { logout } from "../services/auth/slice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);

  const toggleThemeMode = () => {
    dispatch(setTheme(mode === "light" ? "dark" : "light"));
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Node Express Permission Implementation
          </Typography>

          <nav>
            <NavLink to="/role">Roles</NavLink>
          </nav>

          <IconButton onClick={toggleThemeMode} aria-label="add an alarm">
            {mode === "light" ? <Nightlight /> : <LightMode />}
          </IconButton>
          <Button
            onClick={logoutHandler}
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default React.memo(NavBar);
