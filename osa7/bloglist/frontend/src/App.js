import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";
import { getUserInfo, deleteUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = [...useSelector((state) => state.blogs)];
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(getUserInfo(user, user.token));
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
      dispatch(getUserInfo(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    dispatch(deleteUser());
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    try {
      await dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          5
        )
      );
    } catch (error) {
      dispatch(setNotification("missing title or url", 5));
    }
  };

  const updateBlog = (blogObject, id) => {
    dispatch(likeBlog(blogObject, id));
  };

  const removeBlog = (id) => {
    const blogToRemove = blogs.find((n) => n.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      dispatch(deleteBlog(id));
      dispatch(
        setNotification(
          `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
          5
        )
      );
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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
