import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";
import {
  CellValueChangedEvent,
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
  onFilterChanged 
}: GridProps<T>) {
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    };
  }, []);

  const tracker = useRef<Map<string,object>>(new Map<string,object>());
  
  const ref = useRef<AgGridReact>(null);
  
  return (
    <AgGridReact<T>
      animateRows
      editType={"fullRow"}
      rowData={rowData} 
      ref={ref}
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
      columnDefs={columnDefs}
      rowSelection="multiple"
      onFilterChanged={onFilterChanged}
      onRowValueChanged={onRowValueChanged}
      onCellValueChanged={(params) => { 
        const tracker = params.context.tracker as Map<string,object>
        const key = params.node.rowIndex?.toString() as string;  
        // This condition is used to check if the key has already been tracked.
        if(!Object.keys(tracker.get(key) || {}).includes(params.column.getColId() as string)){
          // The value is used to add the oldValue 
          const value = {
            ...tracker.get(key),
            [params.column.getColId() as string] : params.oldValue
          }; 
            
          tracker.set(key ,value)
        } 

        console.log("cell changed", params)
       
      }}
      context={{
        tracker : tracker.current, 
        foo: "bar",
        discardChange: () => { 
          ref.current?.api.stopEditing(true)
          if(tracker?.current)
          tracker.current?.forEach((curr,key)=>{
            const node = ref.current?.api.getRowNode(key);
            if(!!node)
            node?.setData({...node?.data,...curr});
            (ref.current?.context as any)?.tracker?.delete(key)  
          }) 
        } 
      }}
    />
  );
}
