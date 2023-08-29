import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { TagRes } from "../../utils/dataTypes";
import { tagsColumnDefs } from "./columnDefs";

export function useGridData() {
  const data = useLoaderData() as TagRes[];
  const [rowData, setRowData] = useState(data);
  const [columnDefs, setColumnDefs] = useState(tagsColumnDefs);

  return { rowData, setRowData, columnDefs, setColumnDefs };
}
