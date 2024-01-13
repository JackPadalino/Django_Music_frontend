import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./style.css";

// imports for nav bar
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

const Nav = () => {
  const { storeStyles } = useSelector((state) => state.style);

  // drawer variables and toggle
  const [menuState, setMenuState] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuState({ ...menuState, ["left"]: open });
  };

  // mobile menu
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="menuDrawer"
    >
      <List sx={{ backgroundColor: "black" }}>
        <ListItem>
          <ListItemButton>
            <Link
              to="/"
              className="navLink"
              style={{
                color: `${storeStyles.nav_style.link_font_color}`,
                fontFamily: `${storeStyles.nav_style.link_font_family}`,
                fontSize: `${storeStyles.nav_style.link_font_size}px`,
              }}
            >
              <b>Snerdy</b>
            </Link>
            <MusicNoteIcon
              sx={{
                color: `${storeStyles.nav_style.link_font_color}`,
                fontSize: "30px",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Box>
          <ListItem>
            <ListItemButton>
              <Link
                to="/catalog"
                className="navLink"
                style={{
                  color: `${storeStyles.nav_style.link_font_color}`,
                  fontFamily: `${storeStyles.nav_style.link_font_family}`,
                  fontSize: `${storeStyles.nav_style.link_font_size}px`,
                }}
              >
                Catalog
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link
                to="#"
                className="navLink"
                style={{
                  color: `${storeStyles.nav_style.link_font_color}`,
                  fontFamily: `${storeStyles.nav_style.link_font_family}`,
                  fontSize: `${storeStyles.nav_style.link_font_size}px`,
                }}
              >
                DJ Tools
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <AccountCircleIcon
                sx={{
                  color: `${storeStyles.nav_style.link_font_color}`,
                  fontSize: `${storeStyles.nav_style.profile_cart_icon_size}px`,
                }}
              />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton>
              <ShoppingCartIcon
                sx={{
                  color: `${storeStyles.nav_style.link_font_color}`,
                  fontSize: `${storeStyles.nav_style.profile_cart_icon_size}px`,
                }}
              />
            </IconButton>
          </ListItem>
        </Box>
      </List>
    </Box>
  );

  return (
    <>
      <Box className="navMobileContainer">
        <IconButton color="error" onClick={toggleDrawer("left", true)}>
          <DensityMediumIcon
            sx={{ color: `${storeStyles.nav_style.link_font_color}` }}
          />
        </IconButton>
        <Drawer
          anchor={"left"}
          open={menuState["left"]}
          onClose={toggleDrawer("left", false)}
          PaperProps={{
            style: {
              backgroundColor: "black",
              opacity: 1,
            },
          }}
        >
          {list("left")}
        </Drawer>
        <Link
          to="/"
          className="navLink"
          style={{
            color: `${storeStyles.nav_style.link_font_color}`,
            fontFamily: `${storeStyles.nav_style.link_font_family}`,
            fontSize: `${storeStyles.nav_style.link_font_size}px`,
          }}
        >
          <b>Snerdy</b>
        </Link>
        <MusicNoteIcon
          sx={{
            color: `${storeStyles.nav_style.link_font_color}`,
            fontSize: "30px",
          }}
        />
      </Box>

      <div
        className="navDesktopContainer"
        style={{
          height: `${storeStyles.nav_style.height}px`,
          backgroundColor: `${storeStyles.nav_style.background_color}`,
        }}
      >
        <div>
          <Link
            to="/"
            className="navLink"
            style={{
              color: `${storeStyles.nav_style.link_font_color}`,
              fontFamily: `${storeStyles.nav_style.link_font_family}`,
              fontSize: `${storeStyles.nav_style.link_font_size}px`,
            }}
          >
            <b>Snerdy</b>
          </Link>
          <MusicNoteIcon
            sx={{
              color: `${storeStyles.nav_style.link_font_color}`,
              fontSize: `${storeStyles.nav_style.logo_size}px`,
            }}
          />
          <Link
            to="/catalog"
            className="navLink"
            style={{
              color: `${storeStyles.nav_style.link_font_color}`,
              fontFamily: `${storeStyles.nav_style.link_font_family}`,
              fontSize: `${storeStyles.nav_style.link_font_size}px`,
            }}
          >
            Catalog
          </Link>
          <Link
            to="#"
            className="navLink"
            style={{
              color: `${storeStyles.nav_style.link_font_color}`,
              fontFamily: `${storeStyles.nav_style.link_font_family}`,
              fontSize: `${storeStyles.nav_style.link_font_size}px`,
            }}
          >
            DJ Tools
          </Link>
        </div>
        <div>
          <IconButton>
            <AccountCircleIcon
              sx={{
                color: `${storeStyles.nav_style.link_font_color}`,
                fontSize: `${storeStyles.nav_style.profile_cart_icon_size}`,
              }}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartIcon
              sx={{
                color: `${storeStyles.nav_style.link_font_color}`,
                fontSize: `${storeStyles.nav_style.profile_cart_icon_size}`,
              }}
            />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Nav;
