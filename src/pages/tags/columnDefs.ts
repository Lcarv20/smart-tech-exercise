import { ColDef } from "ag-grid-community";

export const tagsColumnDefs: ColDef[] = [
  {
    field: "id",
    hide: true,
    editable: false,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 200,
  },
  {
    field: "name",
    editable: (params) => {
      return params.context.editMode
    }
  },
  {
    field: "posts",
    valueFormatter: (params) => {
      return params.value?.length ?? 0;
    },
    editable: false
  },
];
