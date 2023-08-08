import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./routes/layout";
import Users from "./routes/users";
import Posts from "./routes/posts";
import Tags from "./routes/tags";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/tags",
        element: <Tags />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
