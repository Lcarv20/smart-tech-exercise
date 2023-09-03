import { GridReadyEvent } from "ag-grid-community";
import { Severity } from "../../stores/snackbarReducer";

type UpdateHandler<T> = (tag: T) => Promise<void>;
type DeleteHandler = (id: number) => Promise<void>;

export async function updateRows<T>(
  gridRef: GridReadyEvent,
  updateHandler: UpdateHandler<T>
) {
  const ctxData = gridRef?.context.editedRows.current;
  const nodeIds = Object.keys(ctxData);
  const data = nodeIds.map((id: string) => gridRef?.api.getRowNode(id)?.data);
  if (data) {
    await Promise.allSettled(
      data.map((row) => {
        console.log("updating", row);
        updateHandler(row);
      })
    );
    gridRef!.context.editedRows.current = {};
    gridRef.context.snack("Updated " + data.length + " rows", Severity.success);
  }
}

export async function deleteRows(
  gridRef: GridReadyEvent,
  // sBar: SBar,
  deleteHandler: DeleteHandler
) {
  const rows = gridRef?.api.getSelectedRows();

  if (rows) {
    const results = await Promise.allSettled(
      rows.map((row) => deleteHandler(row.id))
    );
    console.log(results);
  }
  gridRef.context.snack("Deleted " + rows?.length + " rows", Severity.info);

  gridRef?.api.applyTransactionAsync({
    remove: gridRef?.api.getSelectedRows(),
  });
}
