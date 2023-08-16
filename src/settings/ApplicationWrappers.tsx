import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import { theme } from "./mui-theme";
import { Provider } from "react-redux";
import { store } from "../stores/store";

interface ApplicationWrappersProps {
  children: React.ReactNode;
}
export default function ApplicationWrappers({
  children,
}: ApplicationWrappersProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <>{children}</>
            <CssBaseline />
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </React.StrictMode>
  );
}
