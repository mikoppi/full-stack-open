import React, { forwardRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const Blogs = forwardRef(({ user, blogs, addBlog }, ref) => {
  if (!user) return null;
  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new blog" buttonLabel2="cancel" ref={ref}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div className="blogs">
        <TableContainer>
          <Table>
            <TableBody>
              {user !== null &&
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                      </TableCell>
                      <TableCell>{blog.author}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
});

Blogs.displayName = "Blogs";

export default Blogs;
