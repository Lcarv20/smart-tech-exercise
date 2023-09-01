import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { withEnhancedGrid } from "../../components/AGGrid/withGrid";
import { PostRes } from "../../utils/dataTypes";
import { postsColumnDefs } from "./columnDefs";
import { ActionBar } from "../../components/ActionBar/ActionBar";
import Main from "../../components/Coumpound/BodyCompound";
import { dataFetch, ReqType } from "../../functions/requests";
import PostForm from "./PostForm";

export default function PostsRoute() {
  const data = useLoaderData() as PostRes[];
  const [rowData] = useState(data);
  const [columnDefs] = useState(postsColumnDefs);

  const EnhancedGrid = React.memo(withEnhancedGrid<PostRes>(AgGridReact));

  async function delPost(id: number) {
    return await dataFetch("Posts", ReqType.del, { id });
  }

  async function updatePost(post: PostRes) {
    return await dataFetch("Posts", ReqType.put, {
      id: post.id,
      title: post.title,
      description: post.description,
      tagIds: post.tagIds,
    });
  }

  return (
    <>
      <Main>
        <Main.ActionBar>
          <ActionBar<PostRes>
            deleteHandler={delPost}
            updateHandler={updatePost}
          />
        </Main.ActionBar>

        <Main.GridWrapper>
          <EnhancedGrid rowData={rowData} columnDefs={columnDefs} />
        </Main.GridWrapper>

        <Main.FloatingForm>
          <PostForm></PostForm>
          {/* <CustomAutoComplete></CustomAutoComplete> */}
        </Main.FloatingForm>
      </Main>
    </>
  );
}
