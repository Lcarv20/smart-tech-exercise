import { ColDef, EditableCallbackParams } from "ag-grid-community";

const editable = (params: EditableCallbackParams) => params.context.editMode

export const postsColumnDefs: ColDef[] = [
  {
    field: "id",
    hide: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 200,
  },
  {
    field: "title",
    editable
  },
  {
    field: "description",
    editable
  },
  {
    field: "postedDate",
    valueFormatter: (params) => {
      return params.value.split("T")[0];
    }
  },
  {
    field: "user.username",
    headerName: "Author"
    // valueFormatter: (params) => {
    //   return params.value.username;
    // },
  },
  {
    field: "tagIds",
    headerName: "Tags",
    valueFormatter: (params) => {
      return params.value?.length ?? "No tags";
    },
  },
];
