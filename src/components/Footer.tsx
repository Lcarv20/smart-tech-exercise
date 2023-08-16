import { AppBar } from "@mui/material";

export const Footer = () => {
  return (
    <AppBar
      position="static"
      elevation={3}
      sx={{ borderRadius: "20px 20px 0px 0px", bgcolor: "primary.main" }}
    >
      <h4 style={{ textAlign: "center" }}>Crafted by lcarv 🧶🔥</h4>
    </AppBar>
  );
};
