import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const { userList } = useSelector((state) => state.user);
  if (!userList) {
    return null;
  }
  const user = userList.find((u) => u.id === id);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
