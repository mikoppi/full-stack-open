import React from "react";
import Details from "./Details";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Blog = ({ updateBlog, user }) => {
  const id = useParams().id;
  const blogs = [...useSelector((state) => state.blogs)];
  const blog = blogs.find((b) => b.id === id);
  return (
    <div id="blog-item">
      <h2 id="blog">
        {blog.title} {blog.author}
      </h2>
      <Details blog={blog} updateBlog={updateBlog} user={user} />
    </div>
  );
};

export default Blog;
