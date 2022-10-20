import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

    //GET thunk
    export const __getTodoThunk = createAsyncThunk(
        "GET_TODO", //action value
        async (payload, thunkAPI) => { //콜백
            try{
                const data = await axios.get("http://localhost:3001/todos");
                
                return thunkAPI.fulfillWithValue(data.data);
            }catch (error) {
                return thunkAPI.rejectWithValue(error);
            }}
        );
    
    //Add thunk
    export const __addTodoThunk = createAsyncThunk(
        "ADD_TODO", //action value
        async (payload, thunkAPI) => { //콜백
            try{
                const todoList = await axios.post("http://localhost:3001/todos", payload);
                return thunkAPI.fulfillWithValue(todoList.data);
            }catch (error) {
                return thunkAPI.rejectWithValue(error);
            }}
        );
        
    //DELETE thunk
    export const __deleteTodoThunk = createAsyncThunk(
        "DELETE_TODO",
        async (payload, thunkAPI) => {
            try {
                await axios.delete(`http://localhost:3001/todos/${payload}`);
                return thunkAPI.fulfillWithValue(payload);
            } catch (error) {
                return thunkAPI.rejectWithValue(error);
            }}
        );

    export const __getOneTodoThunk = createAsyncThunk(
        "GET_ONE_TODO",
        async (payload, thunkAPI) => {
            try {
                const getOneTodo = thunkAPI.getState().todos.todos.filter((v)=> {
                    return Number(v.id) === Number(payload);
                })[0];
                return thunkAPI.fulfillWithValue(getOneTodo);
            } catch (error) {
                return thunkAPI.rejectWithValue(error);
            }}
        );

    export const __updateTodoThunk = createAsyncThunk(
        "UPDATE_TODO", //action value
        async (payload, thunkAPI) => { //콜백
            try{
                const test = await axios.patch(`http://localhost:3001/todos/${payload.id}`,payload);  //patch (Update)
                return thunkAPI.fulfillWithValue(test.data);
                
            }catch(error){
                return thunkAPI.rejectWithValue(error);
            }}
    );
    const initialState = {
        todos: [],
        todo : {
            id : '',
            title : '',
            body : '',
        },
        isLoading: false,
        isSuccess: false,
        error: null,
    };

    export const todosSlice = createSlice({
        name: "todos", //모듈의 이름
        initialState,
        reducers: {}, //action value + action creator
        extraReducers : {
            [__getTodoThunk.pending]: (state) => {
                state.isLoading = true;
            },
            [__getTodoThunk.rejected]: (state, action) => {
                state.isLoading = false; 
                state.error = action.payload;
            },
            [__getTodoThunk.fulfilled]: (state, action) => {
                state.isLoading = false; 
                state.error = action.payload;
                state.todos = [...action.payload];
            },

            [__getOneTodoThunk.fulfilled]: (state, action) => {
                state.isLoading = false; 
                state.todo = {...action.payload};
            },

            [__addTodoThunk.pending]: (state) => {
                state.isLoading = true; 
            },
            [__addTodoThunk.fulfilled]: (state, action) => {
                state.isLoading = false; 
                state.error = action.payload;
                state.todos = [...state.todos, action.payload]; 
            },
            [__addTodoThunk.rejected]: (state, action) => {
                state.isLoading = false; 
            },

            [__deleteTodoThunk.pending]: (state) => {
                state.isLoading = true; 
            },
            [__deleteTodoThunk.fulfilled]: (state, action) => {
                state.isLoading = false; 
                state.todos = state.todos.filter((todo) => todo.id !== action.payload); // Store에 있는 todos에 서버에서 가져온 todos를 filter
            },
            [__deleteTodoThunk.rejected]: (state, action) => {
                state.isLoading = false; 
                state.error = action.payload; 
            },


            [__updateTodoThunk.fulfilled]: (state, action) => {
                state.isLoading = false;
                const id = action.payload.id;
                state.todo = action.payload;
                state.todos = [...state.todos.filter((v)=>v.id !== action.payload.id),action.payload];
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



    // const todos = (state = initialState, action) => {
    //     switch (action.type) {
    //         case DEL_TODO:
    //             return{
    //                 ...state,
    //                 todos:[...state.todos.filter((todo) => todo.id !== action.payload.id)]
    //             };
    //             default:
    //                 return state;
    //     };
    // };
    // export default todos;

export const {} = todosSlice.actions;
export default todosSlice.reducer;