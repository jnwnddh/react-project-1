import React from "react";
import TodoList from "../todo/TodoList";
import Header from "../components/Header";
import styled from "styled-components";

const Todos = () =>{
    
    return (
        <Stlayout> 
            <Header/>
            <h1>Todo List</h1>
            <TodoList/>
        </Stlayout>
    )
}

export default Todos;

const Stlayout = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  min-width: 800px;
  height: 2000px;
 `
