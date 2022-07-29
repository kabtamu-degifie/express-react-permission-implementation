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
import ExpandMore from "@mui/icons-material/ExpandMore";
import MuiDrawer from "@mui/material/Drawer";
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
  {
    id: 5,
    text: "Accounts 1",
    icon: <InboxIcon />,
    children: [
      {
        id: 6,
        url: "/role",
        text: "Role 1",
        icon: <MailIcon />,
      },
      {
        id: 7,
        url: "/user",
        text: "User 1",
        icon: <MailIcon />,
      },
    ],
  },
];

export default function Drawer({
  handleDrawerClose,
  open,
  drawerWidth,
  DrawerHeader,
}) {
  const [openMenu, setOpenMenu] = React.useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (menu) => {
    const menus = [...openMenu];
    const index = menus.indexOf(menu.id);
    if (index !== -1) {
      menus.splice(index, 1);
    } else {
      menus.push(menu.id);
    }
    setOpenMenu(menus);
  };

  const isSelectedMenu = (menu) => {
    return openMenu.indexOf(menu.id) !== -1;
  };

  return (
    <MuiDrawer
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
            return (
              <React.Fragment key={menuItem.id}>
                <ListItemButton dense onClick={() => handleClick(menuItem)}>
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.text} />
                  {isSelectedMenu(menuItem) ? (
                    <ExpandMore />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </ListItemButton>
                <Collapse
                  in={isSelectedMenu(menuItem)}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {menuItem.children.map((childMenuItem) => {
                      return (
                        <ListItemButton
                          dense
                          onClick={() => navigate(childMenuItem.url)}
                          key={childMenuItem.id}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{childMenuItem.icon}</ListItemIcon>
                          <ListItemText primary={childMenuItem.text} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }
          return (
            <ListItemButton
              dense
              key={menuItem.id}
              disablePadding
              onClick={() => navigate(menuItem.url)}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          );
        })}
      </List>
    </MuiDrawer>
  );
}
