import React from "react";
import Togglable from "./Togglable";
import Details from "./Details";

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const remove = () => {
    removeBlog(blog.id);
  };

  return (
    <div style={blogStyle} id="">
      <div id="blog">
        {blog.title} {blog.author}
      </div>
      <div id="blog-details">
        <Togglable buttonLabel="view" buttonLabel2="hide" >
          <Details blog={blog} updateBlog={updateBlog} user={user} />
          <button onClick={remove}>remove</button>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
