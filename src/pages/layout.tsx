import { Outlet } from "react-router-dom";
import { MenuBar } from "../components/MenuBar";
import { Container, Paper } from "@mui/material";
import { Footer } from "../components/Footer";
import React from "react";

export const Layout = () => {
  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          gap: 4,
        }}
      >
        <MenuBar />

        <Paper elevation={3} sx={{ flexGrow: 1, p: 1, overflow: "scroll" }}>
          <Outlet />
        </Paper>

        <Footer />
      </Container>
    </React.Fragment>
  );
};
