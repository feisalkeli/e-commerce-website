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
import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const Navbar = ({ totalItems }) => {
  return (
    <>
      <AppBar position="fixed" color="inherit" sx={{ mb: 5 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            My Duka
          </Typography>
          {/* <Link component={RouterLink} to="/cart">
          
          </Link> */}

          <div>
            <div
              className="flex justify-end"
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <IconButton
                aria-label="Show Cart Items"
                color="inherit"
                className=""
                display="flex"
                justify-content="flex-end"
                // component={Link}
                // to="/cart"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  {/* Used a tag to prevent useContext bug */}
                  <a href="/cart">
                    <ShoppingCartIcon />
                  </a>
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
