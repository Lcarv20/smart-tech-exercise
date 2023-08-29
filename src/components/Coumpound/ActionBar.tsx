import {
  Box,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { GridCtx } from "../AGGrid/GridContext";

export function ActionBar() {
  const [open, toggle] = React.useState(false);
  const [hasFilter, setHasFilter] = React.useState(false);
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
      onClick: () =>
        gridRef?.api.applyTransaction({
          add: [
            {
              id: 1,
              name: "Morcielago",
              posts: [],
            },
          ],
        }),
    },
    {
      icon: <CheckIcon />,
      name: "Save",
      color: theme.palette.success.main,
      //   onClick: async () => {

      //     await updateRows()

      //     agGridRef.current?.api.stopEditing()

      //     const ctx = agGridRef.current?.context as any
      //     if(!!ctx.tracker)
      //       ctx?.tracker.clear();

      //     changeMode(false);
      //     setOpen(false);
      //   },

      // Through the grid.api save selected rows
      // the saving process is to get the edited rows
      // from the grid.context.editedRows object,
      // and submit to the the provided api
      onClick: () => console.log("save"),
    },
  ];

  function cancelEdit() {
    // const editedRows = gridRef?.context?.editedRows;
    // console.log(editedRows);
    gridRef?.context.discardChanges(gridRef)
  }

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
          onClick: () => {
            toggle(!open);
            if (open) cancelEdit();
          },
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
    </Box>
  );
}
