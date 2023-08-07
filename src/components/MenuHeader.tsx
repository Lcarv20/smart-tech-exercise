import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from "@mui/material"
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import SellIcon from '@mui/icons-material/Sell';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { useState, MouseEvent } from "react";
import { useLocation, Link } from "react-router-dom";
import ComputerIcon from '@mui/icons-material/Computer';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';

export const MenuHeader = () => {

  const location = useLocation()

  const pages = [
    { label: 'Users', href: '/users', icon: <PeopleAltIcon /> },
    { label: 'Posts', href: '/posts', icon: <TextSnippetIcon /> },
    { label: 'Tags', href: '/tags', icon: <SellIcon /> },
  ]

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      sx={{ borderRadius: "0px 0px 20px 20px", backgroundColor: "primary" }}
    >
      <Container maxWidth="xl" >
        <Toolbar>
          <Link to="/">
            <Button>
              <Typography color="secondary.contrastText" sx={{ textDecoration: "none" }} fontWeight="bold" variant="h6" component="div" >
                LOGO
              </Typography>
            </Button>
          </Link>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', paddingX: 10 }}>
            {pages.map(({ label, href, icon }) => (
              <Link key={label} to={href}>
                <Button
                  key={label}
                  disableElevation
                  sx={{ color: "secondary.contrastText",  mx: 2, textDecoration: location.pathname === href ? 'underline' : 'normal' }}
                  startIcon={icon}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
          <ThemeMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}


function ThemeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme()
  const themeMode = theme.palette.mode

  const ThemeOptions = [
    { label: 'System', icon: <ComputerIcon /> },
    { label: 'Light', icon: <LightModeIcon /> },
    { label: 'Dark', icon: <ModeNightIcon /> },
  ]

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        aria-label="delete"
        sx={{color: "secondary.contrastText"}}
        // color="secondary.contrastText"
      >
        <FormatPaintIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {ThemeOptions.map(({ label, icon }) => (
          <MenuItem
            selected={themeMode === label}
            sx={{ display: "flex", gap: 2, color: themeMode === label.toLowerCase() ? theme.palette.primary.main : "inherit" }}
            key={label} onClick={handleClose}
          >
            {icon} {label}
          </MenuItem>
        ))}

      </Menu>
    </div>
  );
}
