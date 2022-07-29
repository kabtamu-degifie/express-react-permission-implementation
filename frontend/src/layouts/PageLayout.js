import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import AppBar from "./AppBar";
import AppDrawer from "./AppDrawer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function PageLayout() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        drawerwidth={drawerWidth}
      />
      <AppDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        drawerwidth={drawerWidth}
        DrawerHeader={DrawerHeader}
      />

      <Main open={open}>
        <DrawerHeader />
        <Box
          sx={{
            border: "1px dashed grey",
            flexGrow: 1,
            maxHeight: "100vh",
            overflow: "auto",
            borderRadius: 1,
          }}
        >
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}

export default React.memo(PageLayout);
