import { ActionBar } from "../../components/Coumpound/ActionBar.tsx";
import { Form, useLoaderData } from "react-router-dom";
import { TagRes } from "../../utils/dataTypes";
import React, { useState } from "react";
import { tagsColumnDefs } from "./columnDefs.ts";
import { withEnhancedGrid } from "../../components/AGGrid/withGrid.tsx";

import { AgGridReact } from "ag-grid-react";
import Main from "../../components/AGGrid/GridContainer.tsx";
import { Stack, TextField } from "@mui/material";

export default function TagsRoute() {
  const data = useLoaderData() as TagRes[];
  const [rowData] = useState(data);
  const [columnDefs] = useState(tagsColumnDefs);

  const EnhancedGrid = React.memo(withEnhancedGrid<TagRes>(AgGridReact));

  return (
    <Main>
      <Main.ActionBar>
        <ActionBar />
      </Main.ActionBar>
      <Main.GridWrapper>
        <EnhancedGrid rowData={rowData} columnDefs={columnDefs} />
      </Main.GridWrapper>
      <Main.FloatingForm
      title="Add New Tag"
        handleSubmit={() =>
          new Promise((resolve) => {
            console.log("works")
            resolve();
          })
        }
      >
         <Form>
          <Stack>
            <TextField
              id="standard-basic"
              type="text"
              label="name"
              variant="standard"
              value={name}
            />
            <TextField
              id="standard-basic"
              type="email"
              label="email"
              variant="standard"
            />
          </Stack>
        </Form>
      </Main.FloatingForm>
    </Main>
  );
}
