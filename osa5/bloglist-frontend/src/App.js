import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(true);

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
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setSuccess(true);
      setErrorMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    });
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
          <BlogForm createBlog={addBlog} />
        </>
      )}
      {user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
