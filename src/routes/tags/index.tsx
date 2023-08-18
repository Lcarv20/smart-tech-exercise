import { useLoaderData } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useEffect } from "react";
import { getTags } from "../../stores/tagsReducer";
import { Button } from "@mui/material";
import { TagRes } from "../../utils/dataTypes";

export default function TagsRoute() {
  const tags = useLoaderData() as TagRes[];
  const dispatch = useAppDispatch();
  const tagsState = useAppSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getTags(tags));
    // console.log("tags", tags)
    console.log("state:", tagsState);
  }, [tags, dispatch, tagsState]);

  return (
    <div>
      <h1>Hello Tags Component!</h1>
      <Button onClick={() => console.log(tagsState)}>Log Tags</Button>
      {tagsState.map((tag) => (
        <p key={tag.id + tag.name}>#{tag.name}</p>
      ))}
    </div>
  );
}
