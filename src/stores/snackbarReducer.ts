import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  open?: boolean;
  message: string;
  severity: Severity;
}

export enum Severity {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
}

const initialState: SnackbarState = {
  open: false,
  message: "Default message",
  severity: Severity.info,
};

const postsSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.open = true
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = postsSlice.actions;
export default postsSlice.reducer;
