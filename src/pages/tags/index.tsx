import { useLoaderData } from "react-router-dom";
import { TagRes } from "../../utils/dataTypes";
import React, { useState } from "react";
import { tagsColumnDefs } from "./columnDefs.ts";
import { withEnhancedGrid } from "../../components/AGGrid/withGrid.tsx";
import { AgGridReact } from "ag-grid-react";
import Main from "../../components/Coumpound/BodyCompound.tsx";
import { ActionBar } from "../../components/ActionBar/ActionBar.tsx";
import TagForm from "./TagForm.tsx";
import { ReqType, dataFetch } from "../../functions/requests.ts";

export default function TagsRoute() {
  const data = useLoaderData() as TagRes[];
  const [rowData] = useState(data);
  const [columnDefs] = useState(tagsColumnDefs);

  const EnhancedGrid = React.memo(withEnhancedGrid<TagRes>(AgGridReact));

  async function delTag(id: number) {
    return await dataFetch("Tags", ReqType.del, { id });
  }

  async function updateTag(tag: TagRes) {
    return await dataFetch("Tags", ReqType.put, {
      id: tag.id,
      name: tag.name,
      postIds: tag.posts?.map((post) => post.id) ?? [],
    });
  }

  return (
    <Main>
      <Main.ActionBar>
        <ActionBar deleteHandler={delTag} updateHandler={updateTag} />
      </Main.ActionBar>

      <Main.GridWrapper>
        <EnhancedGrid rowData={rowData} columnDefs={columnDefs} />
      </Main.GridWrapper>

      <Main.FloatingForm>
        <TagForm></TagForm>
      </Main.FloatingForm>
    </Main>
  );
}
