import { ColDef } from "ag-grid-community";
import { tagSchema } from "./schemas";
import { Severity } from "../../stores/snackbarReducer";

export const tagsColumnDefs: ColDef[] = [
  {
    field: "id",
    hide: true,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    maxWidth: 200,
  },
  {
    field: "name",
    editable: (params) => {
      return params.context.editMode;
    },
    valueSetter: (params) => {
      const value = tagSchema.safeParse(params.newValue);
      if (!value.success) {
        params.context.snack("Invalid tag name", Severity.error);
        return false;
      }
      params.data.name = params.newValue;
      return true;
    },
  },
  {
    field: "posts",
    valueFormatter: (params) => {
      return params.value?.length ?? 0;
    },
  },
];
