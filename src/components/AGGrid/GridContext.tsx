import { GridReadyEvent } from "ag-grid-community";
import { createContext, useState } from "react";

interface CtxProps {
  gridRef: GridReadyEvent | null;
  setGridRef: React.Dispatch<React.SetStateAction<GridReadyEvent | null>>;
}

export const GridCtx = createContext<CtxProps>({
  gridRef: null,
  setGridRef: () => null,
});

export default function GridCtxProvider(props: { children: React.ReactNode }) {
  const [gridRef, setGridRef] = useState<GridReadyEvent | null>(null);
  return (
    <GridCtx.Provider
      value={{
        gridRef,
        setGridRef,
      }}
    >
      {props.children}
    </GridCtx.Provider>
  );
}
