import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./snackbarReducer";
import gridRefReducer from "./gridRef";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    gridRef: gridRefReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
