import { CssBaseline, ThemeProvider } from "@mui/material"
import React from "react"
import { theme } from "./settings/mui-theme"
import { Provider } from "react-redux"
import { store } from "./stores"

interface ApplicationWrappersProps {
  children: React.ReactNode
}
export default function ApplicationWrappers({ children }: ApplicationWrappersProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      </Provider>
      <CssBaseline />
    </React.StrictMode>
  )
}
