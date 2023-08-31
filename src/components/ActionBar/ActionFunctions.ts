import { GridReadyEvent } from "ag-grid-community";
import { Severity } from "../../stores/snackbarReducer";
import { TagRes } from "../../utils/dataTypes";

type SBar = (s: string, severity: Severity) => void;
type UpdateHandler = (tag: TagRes) => Promise<void>;
type DeleteHandler = (id: number) => Promise<void>;

export async function updateRows(
  gridRef:GridReadyEvent,
  sBar: SBar,
  updateHandler: UpdateHandler
) {
  const ctxData = gridRef?.context.editedRows.current;
  const nodeIds = Object.keys(ctxData);
  const data = nodeIds.map(
    (id: string) => gridRef?.api.getRowNode(nodeIds[+id])?.data
  );

  if (data) {
    await Promise.allSettled(data.map((row) => updateHandler(row)));
    gridRef!.context.editedRows.current = {};
    sBar("Updated " + data.length + " rows", Severity.success);
  }
}

export async function deleteRows(
  gridRef: GridReadyEvent,
  sBar: SBar,
  deleteHandler: DeleteHandler
) {
  const rows = gridRef?.api.getSelectedRows();

  if (rows) {
    const results = await Promise.allSettled(
      rows.map((row) => deleteHandler(row.id))
    );
    console.log(results);
  }
  sBar("Deleted " + rows?.length + " rows", Severity.info);

  gridRef?.api.applyTransactionAsync({
    remove: gridRef?.api.getSelectedRows(),
  });
}
