import { useLoaderData } from "react-router-dom";
import { User } from "../../stores/types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { colDef } from "./colDefs";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../../components/grid-styles.css";
import AddUserForm from "./AddUserForm";
import ActionBar from "../../components/AGGrid/ActionBar";

interface RowData {
  id: number;
  username: string;
  email: string;
  posts: number;
}

export default function Users() {
  const data = useLoaderData() as User[];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData, setRowData] = useState<RowData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(colDef(isEdit));

  const gridStyle = useMemo(
    () => ({
      flexGrow: 1,
      borderRadius: "20px",
      border: "1px solid black",
      overflow: "hidden",
    }),
    [],
  );
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      // editable: true,
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      gridRef.current = params.api; // set the gridRef here
      setRowData(
        data.map((user) => {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
            posts: user.posts.length,
          };
        }),
      );
    },
    [data],
  );

  const gridRef = useRef<GridApi<RowData> | null>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    setColumnDefs(colDef(isEdit));
  }, [isEdit]);

  const handleEditing = (isEditing: boolean) => {
    setIsEdit(isEditing);
    if (gridRef.current) {
      gridRef.current.deselectAll();
    }
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      height={"100%"}
      position={"relative"}
    >
      {/* Action Bar (edit, delete, ...) */}
      <Box
        borderColor="divider"
        minHeight={"3rem"}
        display={"flex"}
        justifyContent={"end"}
        alignItems={"center"}
      >
        <ActionBar fn={handleEditing} />
      </Box>

      {/* Grid */}
      <div style={gridStyle} className="ag-theme-material">
        <AgGridReact<RowData>
          animateRows
          editType={"fullRow"}
          rowData={rowData}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowSelection="multiple"
        />
      </div>

      {/* Add Record action bar*/}
      <Button
        sx={{
          width: "fit-content",
          mt: 1,
          ml: "auto",
          "&:hover svg": {
            transform: "rotate(180deg)",
            transition: "all 500ms ease-in-out",
          },
        }}
        onClick={handleOpenDialog}
        startIcon={<AddIcon />}
      >
        Add record
      </Button>

      {/* Add Entries Modal */}
      <AddUserForm
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        handleSubmit={() => {
          setIsDialogOpen(false);
        }}
      />
    </Box>
  );
}
