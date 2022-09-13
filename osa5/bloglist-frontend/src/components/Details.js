import React from "react";

const Details = ({ blog, updateBlog, user }) => {
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
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <span>
          <button onClick={updateLikes}>like</button>
        </span>
      </p>
      <p>{user.name}</p>
    </div>
  );
};

export default Details;
