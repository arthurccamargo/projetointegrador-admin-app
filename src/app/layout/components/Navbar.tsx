import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Building2, UsersIcon } from "lucide-react";

type NavbarProps = {
  drawerWidth: number;
};

const Navbar: React.FC<NavbarProps> = ({ drawerWidth }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#22223b",
            color: "#fff",
            borderRight: 0,
          },
        }}
        PaperProps={{
          elevation: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontWeight: "bold",
              color: theme.palette.background.default,
            }}
          >
            Admin HelpHub
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/ongs")}>
                <Building2 size={24} style={{ marginRight: 16 }} />
                <ListItemText
                  primary="Ongs"
                  sx={{ color: theme.palette.text.secondary }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/volunteers")}>
                <UsersIcon size={24} style={{ marginRight: 16 }} />
                <ListItemText primary="Voluntários" sx={{ color: "#fff" }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
