import { Box } from "@mui/material";

export default function Form({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      // autoComplete="off"
    >
      {children}
    </Box>
  );
}
