import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ICategory } from "../interfaces/category";
import { IUnit } from "../interfaces/unit";
import { IIngredient } from "../interfaces/ingredient";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { defaultContext } from "../App";

const Navbar: React.FC = () => {
    // const { cartIngreds } =
    //     useContext(defaultContext);
    const navigate = useNavigate();
    const navigateToContacts = () => {
        // 👇️ navigate to /contacts
        navigate("/cart");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        The Restaurant
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={navigateToContacts}
                    >
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
