import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./routes/layout";
import Users from "./routes/users";
import Posts from "./routes/posts";
import Tags from "./routes/tags";
import { User } from "./stores/types";
import { fakeFetch } from "./moking/fakeFetch";

async function dataFetch(endpoint: string) {
  try {
    const data = await fetch("http://localhost:5050/api/" + endpoint)
    return await data.json()
  } catch (error) {
    // Check error
    // display error crumb
    console.error(error)
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "/users",
        element: <Users />,
        loader: async (): Promise<User[]> => {
          return dataFetch("Users")
        }
        // loader: () => fakeFetch("users")
      },
      {
        path: "/posts",
        element: <Posts />,
        loader: async () => {
          return dataFetch("Posts")
        }
        // loader: () => fakeFetch("posts")
      },
      {
        path: "/tags",
        element: <Tags />,
        loader: async () => {
          return dataFetch("Tags")
        }
        // loader: () => fakeFetch("tags")
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
