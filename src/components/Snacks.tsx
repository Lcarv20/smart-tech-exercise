import { closeSnackbar } from "../stores/snackbarReducer";
import { RootState } from "../stores/store";
import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

export default function Snacks() {
  const { open, severity, message } = useAppSelector(
    (state: RootState) => state.snackbar,
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
