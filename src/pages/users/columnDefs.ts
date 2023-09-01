import { ColDef } from "ag-grid-community";
import { mailSchema, nameSchema } from "./schemas";
import { Severity } from "../../stores/snackbarReducer";

export const userColumnDefs: ColDef[] = [
  {
    field: "id",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    hide: true,
  },
  {
    field: "username",
    editable: (params) => params.context.editMode,
    valueSetter: (params) => {
      const value = nameSchema.safeParse(params.newValue);
      if (!value.success) {
        params.context.snack("Invalid name", Severity.error);
        return false;
      }
      params.data.username = params.newValue;
      return true;
    },
  },
  {
    field: "email",
    editable: (params) => params.context.editMode,
    valueSetter: (params) => {
      const value = mailSchema.safeParse(params.newValue);
      if (!value.success) {
        params.context.snack("Invalid email", Severity.error);
        return false;
      }
      params.data.email = params.newValue;
      return true;
    },
  },
  {
    field: "posts",
    editable: false,
    valueFormatter: (params) => params.value?.length ?? 0,
  },
];
