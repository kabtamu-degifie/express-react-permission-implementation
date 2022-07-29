import * as React from "react";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

const menuItems = [
  {
    id: 1,
    url: "/",
    text: "Dashboard",
    icon: <InboxIcon />,
  },

  {
    id: 2,
    text: "Accounts",
    icon: <InboxIcon />,
    children: [
      {
        id: 3,
        url: "/role",
        text: "Role",
        icon: <MailIcon />,
      },
      {
        id: 4,
        url: "/user",
        text: "User",
        icon: <MailIcon />,
      },
    ],
  },
];

export default function MiniDrawer({
  handleDrawerClose,
  open,
  drawerWidth,
  DrawerHeader,
}) {
  const [openMenu, setOpenMenu] = React.useState(true);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((menuItem) => {
          if (menuItem && menuItem.children) {
            return menuItem.children.map((child) => {
              return (
                <>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                    {openMenu ? <ExpandMore /> : <ChevronRightIcon />}
                  </ListItemButton>
                  <Collapse in={openMenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <StarBorderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              );
            });
          }
          return (
            <ListItem key={menuItem.id} disablePadding>
              <ListItemButton onClick={() => navigate(menuItem.url)}>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
