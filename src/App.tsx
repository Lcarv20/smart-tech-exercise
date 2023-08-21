import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./routes/layout";
import UsersRoute from "./routes/users";
import PostsRoute from "./routes/posts";
import TagsRoute from "./routes/tags";
import { dataFetch } from "./functions/requests";
import Home from "./routes/home";

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
