import { useState, useEffect, useRef } from "react";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import User from "./components/User";
import Blog from "./components/Blog";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from "./reducers/blogReducer";
import { getUserInfo, deleteUser } from "./reducers/userReducer";
import Users from "./components/Users";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const blogs = [...useSelector((state) => state.blogs)];
  const { user } = useSelector((state) => state.user);
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
    <Container
      style={{
        backgroundColor: "magenta",
        height: "100vh",
        margin: "0",
        padding: "0",
      }}
    >
      <div>
        {user === null ? (
          <>
            <Notification />
            <Login
              handleLogin={handleLogin}
              username={username}
              password={password}
              handleNameChange={handleNameChange}
              handlePasswordChange={handlePasswordChange}
            />
          </>
        ) : (
          <>
            <>
              <NavBar user={user} handleLogout={handleLogout} />
              <Notification />
              <Routes>
                <Route
                  path="/blogs"
                  element={
                    <Blogs
                      blogs={blogs}
                      user={user}
                      updateBlog={updateBlog}
                      removeBlog={removeBlog}
                      addBlog={addBlog}
                      ref={blogFormRef}
                    />
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route
                  path="/blogs/:id"
                  element={<Blog user={user} updateBlog={updateBlog} />}
                />
              </Routes>
            </>
          </>
        )}
      </div>
    </Container>
  );
};

export default App;
