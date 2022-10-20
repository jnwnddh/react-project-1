import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {__getOneTodoThunk,__updateTodoThunk,__getTodoThunk} from "../redux/modules/todosSlice";
import AddCommentForm from "../components/AddCommentForm";
import Comments from "../components/Comments";

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector((state) => state.todos.todo);
  const todos = useSelector((state) => state.todos.todos);
  const { id } = useParams();


  const [saveChange, setsaveChange] = useState(false);
  //true일 때 : 저장하기
  const [updatedTodo, setUpdatedTodo] = useState("");
  //useEffect -> mount될 때 dispatch(get),의존성배열 [dispatch, id]
  useEffect( () => {
    if(todos.length === 0){
         dispatch(__getTodoThunk());
    }else{
        dispatch(__getOneTodoThunk(id));
    }
  }, []);

  useEffect( () => {
    if(todos.length !== 0 && todo.id ===''){
         dispatch(__getOneTodoThunk(id));
    }
  }, [todos]);


  useEffect(() => {
    setUpdatedTodo(todo.body); //[0]
  }, [todo]);

  const onSaveButtonHandler = () => {
    if (updatedTodo.trim() === "") {
      return alert("내용을 입력해주세요");
    }
    dispatch(
      __updateTodoThunk({
        ...todo,
        body: updatedTodo,
      })
    );
    setsaveChange(false);
  };

  return (
    <div>
      <Header />
      <h1>상세페이지</h1>
      <St_box>
        <div>
          {saveChange ? (
            <div>
              <StBoxtop>
                <Stid>id:{todo.id}</Stid>
                <Stlink
                  onClick={() => {
                    navigate("/todos");
                  }}
                >
                  이전으로
                </Stlink>
              </StBoxtop>
              <St_h1> 📝 {todo.title} </St_h1>

              <St_textBox>
                <St_text
                  name="body"
                  rows="10"
                  styl
                  maxLength={200}
                  defaultValue={updatedTodo}
                  onChange={(e) => {
                    setUpdatedTodo(e.target.value);
                  }}
                ></St_text>
              </St_textBox>
            </div>
          ) : (
            <div>
              <StBoxtop>
                <Stid>id:{todo.id}</Stid>
                <Stlink
                  onClick={() => {
                    navigate("/todos");
                  }}
                >
                  이전으로
                </Stlink>
              </StBoxtop>

              <St_h1> 📝 {todo.title} </St_h1>
              <St_textBox>
                <St_h4> {todo.body} </St_h4>
              </St_textBox>
            </div>
          )}
        </div>
        <St_butdiv>
          {saveChange ? (
            <St_but onClick={onSaveButtonHandler}>저장하기</St_but>
          ) : (
            <St_but
              onClick={() => {
                console.log("수정하기");
                setsaveChange(true); //클릭하면 수정하기가 보임
              }}
            >
              수정하기
            </St_but>
          )}
        </St_butdiv>
      </St_box>
      <AddCommentForm />
      <Comments />
    </div>
  );
};

export default Todo;

const St_box = styled.div`
  box-sizing: border-box;
  padding: 12px;
  height: 700px;
  border: 1px solid #ddd;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  margin: 12px auto 12px auto;
  min-height: 850px;
`;
const StBoxtop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 10px 10px 10px 24px;
`;

const Stid = styled.div`
  font-size: 24px;
`;

const Stlink = styled.div`
  text-decoration: underline;
  color: #256d85;
  font-size: 24px;
  cursor: pointer;
`;

const St_h1 = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  padding: 0px 24px;
`;

const St_h4 = styled.h4`
  padding: 0px 24px;
  display: block;
`;
const St_butdiv = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  gap: 12px;
`;
const St_but = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  border: 3px solid rgb(238, 238, 238);
  background-color: rgb(255, 255, 255);
  height: 46px;
  border-radius: 8px;
  width: 100%;
  max-width: 930px;
  cursor: pointer;
`;
const St_text = styled.textarea`
  display: flex;
  width: 100%;
  border: 3px solid #256d85;
  padding: 12px;
  font-size: 14px;
  max-width: 870px;
  border-radius: 12px;
  box-sizing: border-box;
`;
const St_textBox = styled.div`
  padding: 12px;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  height: 600px;
  margin: 12px auto 12px auto;
`;
