import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (_, action: PayloadAction<User[]>) => {
      if (action.payload.length === 0) return
      return action.payload;
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state = state.filter((user) => user.id !== action.payload);
      return state
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state = state.filter((user) => user.id !== action.payload.id);
      state.push(action.payload)
    },
    createUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUsers } = usersSlice.actions

export default usersSlice.reducer
