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

export default function ActionBar({ fn }: { fn: (isEdit: boolean) => void }) {
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
    { icon: <DeleteIcon />, name: "Delete", color: theme.palette.error.main },
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
          onClick={() => console.log("Icooooon")}
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
