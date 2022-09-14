import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setSuccess(false);
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setSuccess(true);
        setErrorMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      })
      .catch(() => {
        setSuccess(false);
        setErrorMessage("missing title or url");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  };

  const updateBlog = (blogObject, id) => {
    blogService.update(blogObject, id).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) =>
          blog.title !== returnedBlog.title ? blog : returnedBlog
        )
      );
    });
  };

  const removeBlog = (id) => {
    const blogToRemove = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setSuccess(true);
        setErrorMessage(
          `blog ${blogToRemove.title} by ${blogToRemove.author} removed`
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} success={success} />
      {user === null ? (
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleNameChange={handleNameChange}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <>
          <Logout name={user.name} handleLogout={handleLogout} />
          <Togglable
            buttonLabel="create new blog"
            buttonLabel2="cancel"
            ref={blogFormRef}
          >
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </>
      )}
      <div className="blogs">
        {user !== null &&
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
                user={user}
              />
            ))}
      </div>
    </div>
  );
};

export default App;
