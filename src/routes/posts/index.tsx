import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { withEnhancedGrid } from "../../components/AGGrid/withGrid";
import { PostRes } from "../../utils/dataTypes";
import { postsColumnDefs } from "./columnDefs";
import { ActionBar } from "../../components/Coumpound/ActionBar";
import Main from "../../components/AGGrid/GridContainer";

export default function PostsRoute() {
  const data = useLoaderData() as PostRes[];
  const [rowData] = useState(data);
  const [columnDefs] = useState(postsColumnDefs);

  const EnhancedGrid = React.memo(withEnhancedGrid<PostRes>(AgGridReact));

  return (
    <>
      <Main>
        <Main.ActionBar>
          <ActionBar />
        </Main.ActionBar>

        <Main.GridWrapper>
          <EnhancedGrid rowData={rowData} columnDefs={columnDefs} />
        </Main.GridWrapper>

        {/* <Main.FloatingForm>
         
        </Main.FloatingForm> */}
      </Main>
    </>
  );
}
