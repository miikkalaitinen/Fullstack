import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNotifications } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { Routes, Route, Link } from "react-router-dom";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import loginService from "./services/loginService";
import blogService from "./services/blogsService";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const Main = () => {
  return (
    <>
      <Blogs />
      <Togglable buttonLabel={"New note"}>
        <BlogForm />
      </Togglable>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("bloguser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, type, seconds = 3) => {
    dispatch(setNotifications(message, type, seconds * 1000));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("bloguser", JSON.stringify(response));

      setUser(response);
      setUsername("");
      setPassword("");
      notify(`Logged in as ${response.username}`, true);
    } catch (err) {
      notify("Failed to log in", false, 5);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("bloguser");
    setUser(null);
    notify("Logged out", true);
  };

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <p>
            Logged in as <Link to="/users">{user.username}</Link>{" "}
            <button onClick={handleLogout}> Logout </button>{" "}
          </p>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Main />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
