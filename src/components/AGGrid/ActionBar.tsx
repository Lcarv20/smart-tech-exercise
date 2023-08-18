import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { GridApi } from "ag-grid-community";
import { RowData } from "../../routes/users";
import { DataFetch, dataFetch } from "../../functions/requests";

interface ActionBarProps {
  fn: (isEdit: boolean) => void;
  api: GridApi<RowData> | null;
}

export default function ActionBar({ fn, api }: ActionBarProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    fn(true);
    setOpen(true);
  };
  const handleClose = () => {
    fn(false);
    setOpen(false);
  };

  const actions = [
    { icon: <DeleteIcon />, name: "Delete", color: theme.palette.error.main, onClick: () => deleteRow(api, dataFetch) },
    { icon: <CheckIcon />, name: "Save", color: theme.palette.success.main },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      direction="left"
      icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon />} />}
      sx={{ boxShadow: "none", mb: 1 }}
      FabProps={{
        size: "small",
        onClick: open ? handleClose : handleOpen,
      }}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          FabProps={{
            size: "small",
          }}
          sx={{ color: action.color as unknown as string }}
          onClick={action?.onClick ?? undefined}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}


async function deleteRow(api: GridApi<RowData> | null, deleteFn: DataFetch) {
  const selectedData = api!.getSelectedRows();

  api!.applyTransaction({
    remove: selectedData,
  })!;

  console.log(selectedData);
  // TODO: Change to a loop instead of promise.allSet to be able to catch bad 
  // requests and display that to the user
  const results = await Promise.allSettled(selectedData.map(
    (row) => deleteFn("Users", "DELETE", { id: row.id })
  ));
  console.log(results);
}
