import {
  Box,
  Button,
} from "@mui/material";
import React, { createContext, useMemo, useState } from "react";
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

interface FormDialogCtx {
  isOpen: boolean;
  close: () => void;
}

export const FormDialogContext = createContext<FormDialogCtx>({
  isOpen: false,
  close: () => null,
});

function FloatingForm({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormDialogContext.Provider
      value={{
        isOpen,
        close: () => setIsOpen(false),
      }}
    >
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
      {children}
    </FormDialogContext.Provider>
  );
}

Main.ActionBar = ActionBar;
Main.GridWrapper = GridWrapper;
Main.FloatingForm = FloatingForm;

export default Main;
