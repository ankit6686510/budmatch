import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { Search, ShoppingCart, AccountCircle } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar>
        {/* Logo */}
        // Create public/logo.png or update the path
        <img src="/logo.png" alt="BudMatch" style={{ height: "40px" }} />
        {/* Search Bar */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            background: "#f5f5f6",
            borderRadius: "4px",
          }}
        >
          <InputBase
            placeholder="Search for products..."
            sx={{ ml: 2, flexGrow: 1 }}
            startAdornment={<Search sx={{ color: "gray", mr: 1 }} />}
          />
        </div>
        {/* Actions */}
        <Button color="inherit" startIcon={<AccountCircle />} sx={{ mx: 2 }}>
          Login
        </Button>
        <IconButton>
          <Badge badgeContent={2} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
