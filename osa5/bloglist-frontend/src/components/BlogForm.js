import React from "react";
import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState();
  const [newAuthor, setNewAuthor] = useState();
  const [newUrl, setNewUrl] = useState();

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title:
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        <label>
          author:
          <input
            type="text"
            id="author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
        <label>
          url:
          <input
            type="text"
            id="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
        <input type='submit' value='submit'/>
      </form>
    </div>
  );
};

export default BlogForm;
