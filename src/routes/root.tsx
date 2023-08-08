import { Outlet } from "react-router-dom"
import { MenuHeader } from "../components/MenuHeader"

export const Root = () => {
  return (
    <>
      <MenuHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
