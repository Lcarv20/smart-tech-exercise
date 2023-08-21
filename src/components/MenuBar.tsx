import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import SellIcon from "@mui/icons-material/Sell";
import { useLocation, Link } from "react-router-dom";
import { Logo } from "./logo";

export const MenuBar = () => {
  const location = useLocation();

  const pages = [
    { label: "Users", href: "/users", icon: <PeopleAltIcon /> },
    { label: "Posts", href: "/posts", icon: <TextSnippetIcon /> },
    { label: "Tags", href: "/tags", icon: <SellIcon /> },
  ];

  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{ borderRadius: "0px 0px 20px 20px", bgcolor: "primary.main" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <Link to="/">
            <Button
              sx={{
                transition: "all 0.2s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            >
              <Logo />
            </Button>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              paddingX: 10,
            }}
          >
            {pages.map(({ label, href, icon }) => (
              <Link key={label} to={href}>
                <Button
                  key={label}
                  disableElevation
                  sx={{
                    fontWeight: 900,
                    color: "primary.contrastText",
                    mx: 2,
                    textDecoration:
                      location.pathname === href ? "underline" : "normal",
                  }}
                  startIcon={icon}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
          {/* <ThemeMenu /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
