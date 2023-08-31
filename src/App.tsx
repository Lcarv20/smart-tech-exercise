import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./pages/layout";
import UsersRoute from "./pages/users";
import PostsRoute from "./pages/posts";
import TagsRoute from "./pages/tags";
import { dataFetch } from "./functions/requests";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    // Display proper error page V
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <UsersRoute />,
        loader: async () => {
          return await dataFetch("Users");
        },
      },
      {
        path: "/posts",
        element: <PostsRoute />,
        loader: async () => {
          return await dataFetch("Posts");
        },
      },
      {
        path: "/tags",
        element: <TagsRoute />,
        loader: async () => {
          return await dataFetch("Tags");
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
