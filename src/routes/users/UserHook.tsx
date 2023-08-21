import { useCallback, useEffect, useState } from "react";
import { RowData } from "./colDefs";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { UserRes } from "../../utils/dataTypes";

interface UserHookProps {
  gridRef: React.MutableRefObject<GridApi<RowData> | null>;
  data: UserRes[];
}

export function useUserHook({ gridRef, data }: UserHookProps) {
  const [rowData, setRowData] = useState<RowData[]>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log("Hook Data:", rowData);
  });

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      gridRef.current = params.api; // set the gridRef here
      setRowData(
        data,
      );
    },
    [data, gridRef],
  );

  return {
    rowData,
    onGridReady,
    setIsDialogOpen,
    isDialogOpen,
    setRowData,
  };
}
