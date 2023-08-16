import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Tag } from "./types";

const initialState: Tag[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    getTags: (state, action: PayloadAction<Tag[]>) => {
      state = action.payload;
      return state;
    },
    addTag: (state, action: PayloadAction<Tag>) => {
      state.push(action.payload);
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      state = state.filter((tag) => tag.id !== action.payload);
      return state;
    },
  },
});

export const { getTags, addTag, deleteTag } = tagsSlice.actions;

export default tagsSlice.reducer;
