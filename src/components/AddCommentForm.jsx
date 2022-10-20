import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __addComment } from "../redux/modules/commentsSlice";

const AddCommentForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    username: "",
    content: "",
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (comment.content.trim() === "" || comment.username.trim() === "") {
      return alert("모든항목을 입력해라");
    }

    dispatch(__addComment({ todoId: id, ...comment }));
    setComment({
      username: "",
      content: "",
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };
  return (
    <Stlayout>
      <form onSubmit={onSubmitHandler} className="COMMENT-GROUP">
        <StNameInput>
          <input
            className="input-box"
            placeholder="이름 (5자 이내)"
            value={comment.username}
            type="text"
            name="username"
            onChange={onChangeHandler}
            maxLength={5}
          />
        </StNameInput>
        <input
          className="input-box"
          placeholder="댓글을 추가하세요. (100자 이내)"
          value={comment.content}
          name="content"
          type="text"
          onChange={onChangeHandler}
          maxLength={100}
        />
        <button
          type="submit"
          onClick={onSubmitHandler}
          disabled={comment?.content === "" ? true : false}
        >
          추가하기
        </button>
      </form>
    </Stlayout>
  );
};

export default AddCommentForm;

const Stlayout = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  min-width: 800px;
`;
const StNameInput = styled.div`
  width: 150px;
`;
