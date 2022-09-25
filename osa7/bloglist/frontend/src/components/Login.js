import React from "react";
import PropTypes from "prop-types";

const Login = ({
  handleLogin,
  username,
  password,
  handleNameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleNameChange}
          />
        </label>
        <label>
          password
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <input type="submit" value="login" id="login-button" />
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
