import React from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Badge,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";

import useStyles from "./styles";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src="" alt="My Duka" height="25px" className={classes.image} />
          </Typography>
          <div className={classes.grow}>
            <div className={classes.button}>
              <IconButton aria-label="Show Cart Items" color="inherit">
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
