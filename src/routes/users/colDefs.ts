import { ColDef, ValueSetterParams } from "ag-grid-community";
import { mailSchema, nameSchema } from "./schemas";
import { Severity, openSnackbar } from "../../stores/snackbarReducer";
import { useAppDispatch } from "../../stores/hooks";
import { useState } from "react";
import { PostRes } from "../../utils/dataTypes";

export interface RowData {
  id: number;
  username: string;
  email: string;
  posts: PostRes[];
}

export function useCollumnDeffenition() {
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);

  const sBar = (message: string, severity: Severity) => {
    dispatch(
      openSnackbar({
        open: true,
        message,
        severity,
      }),
    );
  };

  const isEditMode = (mode: boolean) => {
    setEditMode(mode);
  };

  const columnDefs: ColDef<RowData>[] = [
    {
      field: "id",
      editable: false,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 60,
      hide: !editMode,
    },
    {
      field: "username",
      editable: editMode,
      valueSetter: (params: ValueSetterParams<RowData>) => {
        const value = nameSchema.safeParse(params.newValue);
        if (!value.success) {
          // use snackbar
          sBar("Invalid name", Severity.error);
          return false;
        }
        // sBar("Success", Severity.success);
        params.data.username = params.newValue;
        return true;
      },
    },
    {
      field: "email",
      editable: editMode,
      valueSetter: (params: ValueSetterParams) => {
        const value = mailSchema.safeParse(params.newValue);
        if (!value.success) {
          sBar("Invalid email", Severity.error);
          return false;
        }
        // sBar("Success", Severity.success);
        params.data.email = params.newValue;
        return true;
      },
    },
    {
      field: "posts",
      editable: false,
      valueFormatter: (params) => params.value.length,
    },
  ];

  return { columnDefs, isEditMode };
}
