import { CssBaseline, ThemeProvider } from "@mui/material"
import { theme } from "./settings/mui-theme"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css"
import { MenuHeader } from "./components/MenuHeader";
import { Root } from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/users",
        element: <div>Hello Users page!</div>
      },
      {
        path: "/posts",
        element: <div>Hello Posts page!</div>,
      },
      {
        path: "/tags",
        element: <div>Hello Tag page!</div>,
      }
    ],
  },
]);

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <MenuHeader />
//       <RouterProvider router={router} />
//         <CssBaseline />
//     </ThemeProvider>
//   )
// }

function App() {
  return <RouterProvider router={router} />
}

export default App
