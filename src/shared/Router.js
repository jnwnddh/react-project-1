import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "../pages/Todo";
import Todos from "../pages/Todos";
import Home from "../pages/Home";
import ADDTodo from '../pages/ADDTodo'

const Router =() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/add' element={<ADDTodo />}/>
                <Route path="/todos" element={<Todos/>}/>
                <Route path='/todo/:id' element={<Todo />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router