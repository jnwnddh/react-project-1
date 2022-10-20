import React,{useEffect} from "react";
import Card from "../components/Card";
import { useSelector, useDispatch} from "react-redux";
import {__getTodoThunk} from "../redux/modules/todosSlice" 


const TodoList = () =>{
    const todos = useSelector((state) => state.todos.todos);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(__getTodoThunk());
    }, [dispatch]);

    if (todos.length === 0)
        return(
            <div>
                할일 없음
            </div>
        );
    else{
      return(
        <div>
            <div>
            {todos.map((todo) =>(
              <Card key ={todo.id} todo ={todo}/>
              ))}
            </div>
        </div>
    )
  }
}

export default TodoList;
