import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../../hooks/useAuth.js";
import AddProduct from "../AddProduct/AddProduct.js";
import AddReview from "../AddReview/AddReview.js";
import MakeAdmin from "../MakeAdmin/MakeAdmin.js";
import ManageAllOrders from "../ManageAllOrders/ManageAllOrders.js";
import ManageProducts from "../ManageProducts/ManageProducts.js";
import MyOrders from "../MyOrders/MyOrders.js";
import Payment from "../Payment/Payment.js";
import PrivateAdmin from "../PrivateAdmin/PrivateAdmin.js";

import PrivateUser from "../PrivateUser/PrivateUser";
import UserInfo from "../UserInfo/UserInfo";

const drawerWidth = 240;

const Sidebar = (props) => {
  const { logOut, admin } = useAuth();
  let { path, url } = useRouteMatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navStyle = {
    textDecoration: "none",
    marginLeft: "10px",
    fontSize: "20px",
    color: "#96B332",
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {admin ? (
          <>
            <Box>
              <NavLink to={`/home`} style={navStyle}>
                Home
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}/addProduct`} style={navStyle}>
                Add a Product
              </NavLink>
            </Box>
           
            <Box>
              <NavLink to={`${url}/manageAllProducts`} style={navStyle}>
                Manage All Products
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}/manageAllOrders`} style={navStyle}>
                Manage All Orders
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}/makeAdmin`} style={navStyle}>
                Make Admin
              </NavLink>
            </Box>
          </>
        ) : (
            <>
              <Box>
                <NavLink to={`/home`} style={navStyle}>
                  Home
                </NavLink>
              </Box>
            <Box>
              <NavLink to={"/products"} style={navStyle}>
                All Product
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}`} style={navStyle}>
                Dashboard
              </NavLink>
            </Box>

            <Box>
              <NavLink to={`${url}/myOrders`} style={navStyle}>
                My Orders
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}/addreview`} style={navStyle}>
                Add Review
              </NavLink>
            </Box>
            <Box>
              <NavLink to={`${url}/payment`} style={navStyle}>
                Payment
              </NavLink>
            </Box>
          </>
        )}
        <Box>
          <Button color="error" onClick={logOut}>
            Logout
          </Button>
        </Box>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <UserInfo />
          </Route>
          <PrivateAdmin path={`${path}/addProduct`}>
            <AddProduct/>
          </PrivateAdmin>
          <PrivateAdmin path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </PrivateAdmin>
          <Route path={`${path}/myOrders`}>
          <MyOrders></MyOrders>
          </Route>
          <PrivateUser path={`${path}/addreview`}>
            <AddReview />
          </PrivateUser>
          <PrivateUser path={`${path}/payment`}>
            <Payment />
          </PrivateUser>
          <PrivateAdmin path={`${path}/manageAllOrders`}>
            <ManageAllOrders/>
          </PrivateAdmin>
          <PrivateAdmin path={`${path}/manageAllProducts`}>
            <ManageProducts />
          </PrivateAdmin>
        </Switch>
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
