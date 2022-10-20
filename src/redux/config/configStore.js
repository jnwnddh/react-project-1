import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice"
import todo from "../modules/todoSlice"
import comment from "../modules/commentSlice";
import comments from "../modules/commentsSlice";
import user from "../modules/userSlice";
const store = configureStore({
    reducer: { 
        todos,
        todo,
        comment,
        comments,
        user,
    },
});
export default store;