import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { UserRes } from "../../utils/dataTypes";
import Main from "../../components/Coumpound/BodyCompound";
import { AgGridReact } from "ag-grid-react";
import React from "react";
import { withEnhancedGrid } from "../../components/AGGrid/withGrid";
import { userColumnDefs } from "./columnDefs";
import { ReqType, dataFetch } from "../../functions/requests";
import UserForm from "./UserForm";
import { ActionBar } from "../../components/ActionBar/ActionBar";

export default function UsersRoute() {
  const data = useLoaderData() as UserRes[];
  const [rowData] = useState(data);
  const [columnDefs] = useState(userColumnDefs);

  const EnhancedGrid = React.memo(withEnhancedGrid<UserRes>(AgGridReact));

  async function delUser(id: number) {
    return await dataFetch("Users", ReqType.del, { id }); 
  }

  async function updateUser(user: UserRes) {
    const res = await dataFetch("Users", ReqType.put, {
      id: user.id,
      name: user.username,
      email: user.email,
      postIds: user.posts?.map((post) => post.id) ?? [],
    })
    // return await dataFetch("Users", ReqType.put, {
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    // });
    console.log(res)
    return res
  }

  return (
    <Main>
    <Main.ActionBar>
      <ActionBar deleteHandler={delUser} updateHandler={updateUser} />
    </Main.ActionBar>

    <Main.GridWrapper>
      <EnhancedGrid rowData={rowData} columnDefs={columnDefs} />
    </Main.GridWrapper>

    <Main.FloatingForm>
      <UserForm></UserForm>
    </Main.FloatingForm>
  </Main>
  );
}
