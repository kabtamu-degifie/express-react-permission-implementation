import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import MiniAppBar from "./MiniAppBar";
import MiniDrawer from "./MiniDrawer";

function PageContainer() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <MiniAppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <MiniDrawer handleDrawerClose={handleDrawerClose} open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default React.memo(PageContainer);
