import { ColDef } from "ag-grid-community";

export const tagsColumnDefs: ColDef[] = [
  {
    field: "id",
  },
  {
    field: "name",
    editable: true,
  },
  {
    field: "posts",
    valueFormatter: (params) => {
      return params.value.length;
    }
  },
];
