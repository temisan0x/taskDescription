import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todo: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        reset:(state)=> initialState
    }
})

export const { reset } = todoSlice.actions;
export default todoSlice.reducer