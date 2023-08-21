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

interface ActionBarProps {
  changeMode: (isEdit: boolean) => void;
  delRows: () => Promise<void>;
  updateRows: () => Promise<void>;
}

export default function ActionBar({
  changeMode,
  delRows,
  updateRows,
}: ActionBarProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    changeMode(true);

    setOpen(true);
  };
  const handleClose = () => {
    changeMode(false);
    setOpen(false);
  };

  const actions = [
    {
      icon: <DeleteIcon />,
      name: "Delete",
      color: theme.palette.error.main,
      onClick: () => delRows(),
    },
    {
      icon: <CheckIcon />,
      name: "Save",
      color: theme.palette.success.main,
      onClick: () => updateRows(),
    },
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
          onClick={action.onClick}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
