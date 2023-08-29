import { ColDef } from "ag-grid-community";

export const postsColumnDefs: ColDef[] = [
  {
    field: "id",
  },
  {
    field: "title",
    editable: true,
  },
  {
    field: "description",
    editable: true,
  },
  {
    field: "postedDate",
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
      const str = params.value ?? [];
      // Fetch all tags here
      // and display in a nice component
      return str ?? 0
    },
  },
];
