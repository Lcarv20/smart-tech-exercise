import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import {
  ColDef,
  FilterChangedEvent,
  GridReadyEvent,
  RowValueChangedEvent,
} from "ag-grid-community";
import "../../components/grid-styles.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

interface GridProps<RowData> {
  rowData: RowData[] | undefined;
  columnDefs: ColDef<RowData>[];
  onGridReady: (ev: GridReadyEvent) => void;
  onRowValueChanged: (event: RowValueChangedEvent<RowData>) => void;
  onFilterChanged: (event: FilterChangedEvent) => void;
}

export default function Grid<T>({
  rowData,
  columnDefs,
  onGridReady,
  onRowValueChanged,
  onFilterChanged,
}: GridProps<T>) {
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);

  return (
    <AgGridReact<T>
      animateRows
      editType={"fullRow"}
      rowData={rowData}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
      columnDefs={columnDefs}
      rowSelection="multiple"
      onFilterChanged={onFilterChanged}
      onRowValueChanged={onRowValueChanged}
      onCellValueChanged={(params) => {
        console.log("cell changed", params)
      }}
    />
  );
}
