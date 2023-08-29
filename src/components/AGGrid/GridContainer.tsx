import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      position={"relative"}
    >
      {children}
    </Box>
  );
}

function ActionBar({ children }: { children: React.ReactNode }) {
  return (
    <Box
      borderColor="divider"
      minHeight={"3rem"}
      display={"flex"}
      justifyContent={"end"}
      alignItems={"center"}
    >
      {children}
    </Box>
  );
}

function GridWrapper({ children }: { children: React.ReactNode }) {
  const gridStyle = useMemo(
    () => ({
      flexGrow: 1,
      borderRadius: "20px",
      border: "1px solid black",
      overflow: "hidden",
    }),
    []
  );

  return (
    <div style={gridStyle} className="ag-theme-material">
      {children}
    </div>
  );
}

function FloatingForm({
  handleSubmit,
  children,
  title,
}: {
  children: React.ReactNode;
  handleSubmit: () => Promise<void>;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        sx={{
          width: "fit-content",
          mt: 1,
          ml: "auto",
          "&:hover svg": {
            transform: "rotate(180deg)",
            transition: "all 500ms ease-in-out",
          },
        }}
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
      >
        Add record
      </Button>

      <Dialog
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
        open={isOpen}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="text" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Main.ActionBar = ActionBar;
Main.GridWrapper = GridWrapper;
Main.FloatingForm = FloatingForm;

export default Main;
