import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "./types";

const initialState : Post[] = []


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action: PayloadAction<Post[]>) => {
      state = action.payload
      return state
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.push(action.payload);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state = state.filter((post) => post.id !== action.payload);
      return state
    },
  }
})

export const { getPosts, addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
