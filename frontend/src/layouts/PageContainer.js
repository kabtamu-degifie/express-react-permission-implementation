import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import MiniAppBar from "./MiniAppBar";
import MiniDrawer from "./MiniDrawer";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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
      </Box>
    </Box>
  );
}

export default React.memo(PageContainer);
