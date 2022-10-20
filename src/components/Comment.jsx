import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __updateComment,
  __deleteComment,
} from "../redux/modules/commentsSlice";
import { globalEditModeToggle } from "../redux/modules/commentSlice";
import { __getComment } from "../redux/modules/commentSlice";

const Comment = ({ comment }) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const [updatedComment, setUpdatedComment] = useState("");

  const { content } = useSelector((state) => state.comment.data);
  const { isGlobalEditmode } = useSelector((state) => state.comment);

  //수정
  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        todoId: id,
      })
    );
    setIsEdit(false);
    dispatch(globalEditModeToggle(false));
  };

  //삭제
  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제할꺼야?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  //수정한거 저장
  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
    dispatch(globalEditModeToggle(true));
  };

  //수정한거 취소
  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch();
    dispatch(globalEditModeToggle(false));
  };

  //수정 후 바뀐 댓글
  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);

  return (
    <StComment>
      {isEdit ? (
        <>
          <StInputWrapper>
            <input
              type="text"
              value={updatedComment}
              maxlength={100}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </StInputWrapper>
          <StControlGroup>
            <button onClick={onCancelButtonHandler}>
              <h3>취소</h3>
            </button>
            <button onClick={onUpdateButtonHandler}>
              <h3>저장</h3>
            </button>
          </StControlGroup>
        </>
      ) : (
        <>
          <StInputWrapper>
            <h4> 작성자:{comment.username}</h4>
            <h4>내용:{comment.content}</h4>
          </StInputWrapper>

          <StControlGroup>
            <button onClick={onChangeEditButtonHandler}>수정</button>

            <button onClick={onDeleteButtonHandler}>삭제</button>
          </StControlGroup>
        </>
      )}
    </StComment>
  );
};

export default Comment;

const StComment = styled.div`
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid #eee;
  height: 100px;
  padding: 0 12px;
`;

const StControlGroup = styled.div`
  flex-shrink: 0;
  gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StInputWrapper = styled.div`
  width: 70%;
`;
