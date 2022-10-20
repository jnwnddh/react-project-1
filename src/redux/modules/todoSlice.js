import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodoThunk = createAsyncThunk(
    "GET_TODO", //action value
    async (payload, thunkAPI) => { //콜백
        try{
            const data = await axios.get(`http://localhost:3001/todos${payload}`);
            console.log(data)
            return thunkAPI.fulfillWithValue(data.data);
            
        }catch (error) {
            return thunkAPI.rejectWithValue(error);
        }}
    );

export const __updateTodoThunk = createAsyncThunk(
    "UPDATE_TODO", //action value
    async (payload, thunkAPI) => { //콜백
        try{
            console.log('payload',payload);
            const test = await axios.patch(`http://localhost:3001/todos/${payload.id}`,payload);  //patch (Update)
            console.log(test);
            return thunkAPI.fulfillWithValue(test.data);
            
        }catch(error){
            return thunkAPI.rejectWithValue(error);
        }}
);

const initialState = {
    todos: [],
    isLoading: false,
    isSuccess: false,
    error: null,
};

export const todoSlice = createSlice({
    name: "todos", //모듈
    initialState,
    reducers: {}, //action value + action creator
    extraReducers:{
        [__getTodoThunk.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.todo = action.payload;
            state.todos = [...action.payload]
            
        },
        [__getTodoThunk.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__getTodoThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [__updateTodoThunk.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload, " <<<<");
            console.log(state);
            const id = action.payload.id;
            const filterData = state.todos.filter((v)=>v.id !== action.payload.id);
            console.log(filterData);
        },
        [__updateTodoThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [__updateTodoThunk.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;