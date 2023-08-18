import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { getPosts } from "../../stores/postsReducer";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { PostRes } from "../../utils/dataTypes";

export default function PostsRoute() {
  const posts = useLoaderData() as PostRes[];
  const dispatch = useAppDispatch();
  const postsState = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts(posts));
    console.log("state:", postsState);
  }, [posts, dispatch, postsState]);

  return (
    <div>
      <h1>Hello Posts Component!</h1>
      <Button onClick={() => console.log(postsState)}>Log Posts</Button>

      {postsState.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
