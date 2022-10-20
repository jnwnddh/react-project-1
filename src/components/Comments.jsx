import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";
import Comment from "./Comment";



const Comments = ({comment}) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.comments.commentsByTodoId);

  useEffect(() => {
    dispatch(__getCommnetsByTodoId(id));
  }, [dispatch, id]);
  

  return (
    <div>
      <div className="comment">
        {data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
