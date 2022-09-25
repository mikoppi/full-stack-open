/* eslint-disable indent */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, createComment } from "../reducers/commentReducer";
import { useEffect, useState } from "react";

const Details = ({ blog, updateBlog, user }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  console.log(comments);

  useEffect(() => {
    dispatch(getAllComments(blog.id));
  }, [comment]);

  const updateLikes = () => {
    updateBlog(
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: user.id,
      },
      blog.id
    );
  };

  const addComment = (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
    };
    dispatch(createComment(blog.id, newComment));
    setComment("");
  };
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <span>
          <button id="like-button" onClick={updateLikes}>
            like
          </button>
        </span>
      </p>
      <p>added by {user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments === null
          ? null
          : comments
              .filter((comment) => comment.blogId === blog.id)
              .map((comment) => (
                <li key={comment.blogId}>{comment.comment}</li>
              ))}
      </ul>
    </div>
  );
};

export default Details;
