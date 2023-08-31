import React, { useContext, useMemo, useRef, useState } from "react";
import { AgGridReactProps } from "ag-grid-react";
import { CellValueChangedEvent, GridReadyEvent } from "ag-grid-community";
import { GridCtx } from "./GridContext";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../../components/grid-styles.css";
import { Box } from "@mui/material";

export function withEnhancedGrid<RowDataType>(
  WrappedGrid: React.ComponentType<AgGridReactProps<RowDataType>>
) {
  const ComponentWithExtraInfo = (props: AgGridReactProps<RowDataType>) => {
    const {gridRef, setGridRef } = useContext(GridCtx);
    const rowDataTracker = useRef<Record<number, Record<string, RowDataType>>>({});
    const [editMode, setEditMode] = useState(false)

    const defaultColDef = useMemo(
      () => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      }),
      []
    );

    const context = {
      editMode: editMode,
      setEditMode: (mode: boolean) => setEditMode(mode),
      editedRows: rowDataTracker,
      setEditedRows: (params: CellValueChangedEvent) => {
        const { oldValue } = params;
        const rowId = params.rowIndex;
        const colId = params.colDef.field;

        // rowId is being verified against null because rows have 0 index
        // so the verification if(!row) wouldn't work
        if(rowId  === null || !colId) {
          console.log(rowId, colId)
          console.error('rowId and colId are required');
          return;
        }

        //Check if edited row exists or create
        if (!rowDataTracker.current[rowId]) {
          rowDataTracker.current[rowId] = {};
        }
        rowDataTracker.current[rowId][colId] = oldValue;
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
        const currTracker = rowDataTracker.current;
        Object.keys(currTracker).forEach(function (rowIdStr) {
          const node = gridRef.api.getRowNode(rowIdStr);
          const data = node!.data;
          const rowIdNum = Number(rowIdStr);

          Object.keys(currTracker[rowIdNum]).forEach(function (col) {
            data[col] = currTracker[rowIdNum][col];
          });

          node?.updateData(data);
        });
        rowDataTracker.current= {};
      },
    };

    function onGridReady(params: GridReadyEvent) {
      // Set grid ref to global provider
      setGridRef(params);
    }
    return (
    <Box className="ag-theme-material" width={"100%"} height={"100%"}>
      <WrappedGrid
        {...props}
        rowSelection="multiple"
        animateRows
        editType={"fullRow"}
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        onCellValueChanged={(params) => {
          console.log('Row edited')
          if (params.oldValue.toString() !== params.newValue.toString()) {
            params.context.setEditedRows(params);
          }
        }}
        context={context}
        enableCellChangeFlash 
      />
      <button onClick={() => {console.log(gridRef?.context.editedRows)}}>btn</button>
      </Box>
    );
  };
  return ComponentWithExtraInfo;
}
