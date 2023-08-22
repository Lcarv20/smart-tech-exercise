import { useLoaderData } from "react-router-dom";
import { useRef, useState } from "react";
import { RowData, useCollumnDeffenition } from "./colDefs";
import { GridApi } from "ag-grid-community";
import { Button, IconButton } from "@mui/material";
import ActionBar from "../../components/AGGrid/ActionBar";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { UserRes } from "../../utils/dataTypes";
import { useUserHook } from "./UserHook";
import Main from "../../components/AGGrid/GridContainer";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../../components/grid-styles.css";
import AddUserForm from "./AddUserForm";
import { dataFetch } from "../../functions/requests";
import Grid from "../../components/AGGrid/Grid";
import { Severity, openSnackbar } from "../../stores/snackbarReducer";
import { useAppDispatch } from "../../stores/hooks";
import { AgGridReact } from "ag-grid-react";

export default function UsersRoute() {
  const data = useLoaderData() as UserRes[];

  const dispatch = useAppDispatch();

  const [hasFilter, setHasFilter] = useState(false);


  // This data will bu updated to the API later
  const [editedRows, setEditedRows] = useState<RowData[]>([]); 

  const { columnDefs, isEditMode } = useCollumnDeffenition();
  
  const gridRef = useRef<AgGridReact<RowData> | null>(null);
    
  const { rowData, onGridReady, setIsDialogOpen, isDialogOpen, setRowData } =
    useUserHook({ data, gridRef });
 

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleIsEditMode = (isEditing: boolean) => {
    isEditMode(isEditing);
    if (gridRef.current) {
      gridRef.current.api.deselectAll();
      gridRef.current.api.stopEditing();
    }
    setEditedRows([]);
    // gridRef.current?.setRowData(rowData ?? []);
    console.log("state:", rowData);
  };

  const resetFilter = () => {
    gridRef.current?.api.setFilterModel(null);
    setHasFilter(false);
  };

  const delRows = async () => {
    const rowsToDelete = gridRef.current!.api.getSelectedRows();
    setRowData((state) => {
      const idsToDelete = rowsToDelete.map((row) => row.id);
      return state!.filter((row) => !idsToDelete.includes(row.id));
    });

    // TODO: Change to a loop instead of promise.allSet to be able to
    // fallback on error
    const results = await Promise.allSettled(
      rowsToDelete.map((row) => dataFetch("Users", "DELETE", { id: row.id })),
    );
 
    console.log(results);
  };

  const updateRows = async () => { 
    if(editedRows.length > 0){
      const res = await Promise.allSettled(editedRows.map(
        (row) => {
          console.log("ROW:", row);
          const body = {
            id: row.id,
            name: row.username,
            email: row.email,
            postIds: row.posts?.map((post) => post.id) ?? [],
          }
          dataFetch("Users", "PUT", body)
        }
      ));
      setEditedRows([]);  
    
      dispatch(openSnackbar({
        message: "Users updated",
        severity: Severity.success,
      }));
    }else gridRef.current?.api.stopEditing(true)
    
  };
  
  return (
    <Main>
      {/* Action Bar (edit, delete, ...) */}
      <Main.ActionBar>
        {hasFilter && (
          <IconButton
            color="primary"
            sx={{ mb: 1, mr: "auto" }}
            onClick={resetFilter}
          >
            <FilterListOffIcon />
          </IconButton>
        )}
        <ActionBar
          changeMode={handleIsEditMode}
          delRows={delRows}
          updateRows={updateRows}
          agGridRef={gridRef}  
        />
      </Main.ActionBar>
 
      {/* Grid */}
      <Main.GridWrapper>
        <Grid<RowData>
          rowData={rowData}
          onFilterChanged={(params) => {
            if (Object.keys(params.api.getFilterModel()).length > 0) {
              setHasFilter(true);
            } else {
              setHasFilter(false);
            }
          }} 
          columnDefs={columnDefs}
          onGridReady={onGridReady} 
          onRowValueChanged={(params) => {  
            if (params.data) {  
              setEditedRows([...editedRows, params.data]);  
            }
          }}
        />
      </Main.GridWrapper>

      {/* Add Record action bar*/}
      <Main.FloatingForm
        onClick={handleOpenDialog}
        formChildren={
          <>
          <Button onClick={() => console.log("state", rowData)}>state</Button>
          <AddUserForm
            open={isDialogOpen}
            closeHandler={() => {
              setIsDialogOpen(false);
            }}
            updateStateHandler={setRowData}
          />
          </>
        }
      />
    </Main>
  );
}
