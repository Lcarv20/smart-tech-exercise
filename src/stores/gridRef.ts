import { createSlice } from "@reduxjs/toolkit";

const gridRefReducer = createSlice({
    name: "gridRef",
    initialState: {
        gridRef: null,
    },
    reducers: {
        setGridRef: (state, action) => {
            state.gridRef = action.payload;
        },
    },
})

export const { setGridRef } = gridRefReducer.actions;

export default gridRefReducer.reducer