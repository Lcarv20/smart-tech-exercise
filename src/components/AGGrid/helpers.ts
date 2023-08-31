import { CellValueChangedEvent, GridReadyEvent } from "ag-grid-community";

declare module "ag-grid-community/dist/lib/gridApi" {
  interface GridApi {
    editedRows: React.MutableRefObject<Record<number, Record<string, object>>>;
    setEditedRows: (params: CellValueChangedEvent) => void;
    discardChanges: (gridRef: GridReadyEvent) => void;
  }
}

declare module "ag-grid-community/dist/lib/context/context" {
  interface Context {
    testir : () => void
  }
}
