import { Outlet } from "react-router-dom"
import { MenuHeader } from "../components/MenuHeader"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "../settings/mui-theme"

export const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <MenuHeader />
      <main>
        <Outlet />
      </main>
      <CssBaseline />
    </ThemeProvider>
  )
}
