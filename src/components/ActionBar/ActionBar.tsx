import {
  Box,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { GridCtx } from "../AGGrid/GridContext";
import { deleteRows, updateRows } from "./ActionFunctions";

interface ActionBarProps<T> {
  deleteHandler: (id: number) => Promise<void>;
  updateHandler: (data: T) => Promise<void>;
}

export function ActionBar<T>({
  deleteHandler,
  updateHandler,
}: ActionBarProps<T>) {
  const [isModalOpen, toggle] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const { gridRef } = useContext(GridCtx);
  const theme = useTheme();

  const resetFilter = () => {
    gridRef?.api.setFilterModel(null);
    setHasFilter(false);
  };

  const actions = [
    {
      icon: <DeleteIcon />,
      name: "Delete",
      color: theme.palette.error.main,
      onClick: () => deleteRows(gridRef!, deleteHandler),
    },
    {
      icon: <CheckIcon />,
      name: "Save",
      color: theme.palette.success.main,
      onClick: () => updateRows(gridRef!, updateHandler),
    },
  ];

  useEffect(() => {
    gridRef?.context.setEditMode(isModalOpen);
    gridRef?.columnApi.setColumnVisible("id", isModalOpen);
    gridRef?.api.deselectAll();

    // Discard changes
    if (!isModalOpen) gridRef?.context.discardChanges(gridRef);
    gridRef?.api.stopEditing(true);
  }, [isModalOpen, gridRef]);

  return (
    <Box
      borderColor="divider"
      minHeight={"3rem"}
      display={"flex"}
      justifyContent={"end"}
      alignItems={"center"}
    >
      {/* Clear Filter Button */}
      {hasFilter && (
        <IconButton
          color="primary"
          sx={{ mb: 1, mr: "auto" }}
          onClick={resetFilter}
        >
          <FilterListOffIcon />
        </IconButton>
      )}

      {/* Edit Menu */}
      <SpeedDial
        ariaLabel="Delete and Save actions"
        direction="left"
        icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon />} />}
        sx={{ boxShadow: "none", mb: 1 }}
        FabProps={{
          size: "small",
          onClick: () => toggle(!isModalOpen),
        }}
        open={isModalOpen}
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
    </Box>
  );
}
