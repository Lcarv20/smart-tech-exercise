import { AgGridReact } from "ag-grid-react";
import { useContext, useMemo, useRef } from "react";
import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
} from "ag-grid-community";
import { GridCtx } from "./GridContext";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../../components/grid-styles.css";

interface GridProps<RowData> {
  rowData: RowData[];
  columnDefs: ColDef[];
}

export default function Grid<RowData>(props: GridProps<RowData>) {
  const { setGridRef } = useContext(GridCtx);
  const rowDataTracker = useRef<
    Record<number, Record<string, RowData>>
  >({});

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  function onGridReady(params: GridReadyEvent) {
    // Set ref to global provider
    setGridRef(params);
  }

  const context = {
    editedRows: rowDataTracker,
    setEditedRows: (params: CellValueChangedEvent) => {
      const { oldValue } = params;
      const rowId = params.rowIndex ?? 0;
      const colId = params.colDef.field ?? "";
      //Check if edited row exists or create
      if (!rowDataTracker.current[rowId]) {
        rowDataTracker.current[rowId] = {};
      }
      //set old and new values to edited column field
      rowDataTracker.current[rowId][colId] =  oldValue
    },
    /*
    //The data from the tracker looks like:
    {
      //where 0 is the ag grid row index
      0: {
        //where name refers to a column.field (see columns defenitions)
        name: "oldValue name" 
      }
    }
    */
    discardChanges: (gridRef: GridReadyEvent) => {
      let currTracker = rowDataTracker.current;
      Object.keys(currTracker).forEach(function (rowIdStr) {
        const node = gridRef.api.getRowNode(rowIdStr);
        const data = node!.data;
        const rowIdNum = Number(rowIdStr);

        Object.keys(currTracker[rowIdNum]).forEach(function (col) {
          data[col] = currTracker[rowIdNum][col]
        });

        node?.updateData(data);
      });
      currTracker = {};
    },
  };

  // Add Styles Wrapper
  return (
    <Box className="ag-theme-material" width={"100%"} height={"100%"}>
      <AgGridReact
        rowSelection="multiple"
        animateRows
        editType={"fullRow"}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        rowData={props.rowData}
        columnDefs={props.columnDefs}
        onCellValueChanged={(params) => {
          if (params.oldValue.toString() !== params.newValue.toString()) {
            params.context.setEditedRows(params);
          }
        }}
        context={context}
        enableCellChangeFlash
      />
    </Box>
  );
}
