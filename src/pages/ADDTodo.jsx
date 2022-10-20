import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { __addTodoThunk } from "../redux/modules/todosSlice";

export const Formepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [todo,setTodo] = useState();
  const goToListpage = () => {
    navigate("/todos");
  };
  const goToHomepage = () => {
    navigate("/");
  };
  const onSubmitHandler = (todo) => {
    dispatch(__addTodoThunk(todo));
    navigate('/todos');
  };

  return (
    <Stlayout>
      <Header />
      <form
        onSubmit={(e) => {
          onSubmitHandler(todo);
          goToListpage(e);
        }}
      >
        <h1>작성자</h1>
        <St_input
          placeholder = "작성자의 이름을 입력해주세요. (5자 이내)"
          type="text"
          required
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              user: value,
            });
          }}
        />
        <h1>제목</h1>
        <St_input
          placeholder="제목을 입력해주세요. (50자 이내)"
          type="text"
          required
          title="제목을 5글자 이상입력하세요"
          pattern=".{5,50}"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <h1>내용</h1>
        <St_text
          placeholder="내용을 입력해주세요. (200자 이내)"
          cols="100"
          rows="10"
          type="text"
          required
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              body: value,
            });
          }}
        />
        <St_butdiv>
          <St_but onClick={goToHomepage}>
            이전으로
          </St_but>
          <St_but
            disabled={todo?.body === "" ? true : false}
          >
            추가하기
          </St_but>
        </St_butdiv>

        
      </form>
    </Stlayout>
  );
};

export default Formepage;

const Stlayout = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  min-width: 800px;
`
const St_input = styled.input`
    width: 100%;
    border: 1px solid rgb(238, 238, 238);;
    padding: 12px;
    font-size: 14px;
    max-width : 980px;
    border-radius: 12px;
`

const St_text = styled.textarea`
    width: 100%;
    border: 1px solid rgb(238, 238, 238);;
    padding: 12px;
    font-size: 14px;
    max-width : 980px;
    border-radius: 12px;
`
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
    max-width : 100px;
    cursor: pointer;
    margin-top: 12px;
`

const St_butdiv = styled.div`
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: right;
    flex-direction: row;
    gap: 12px;
`

