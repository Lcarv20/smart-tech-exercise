import { Outlet } from "react-router-dom"
import { MenuHeader } from "../components/MenuHeader"

export const Layout = () => {
  return (
    <>
      <MenuHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
