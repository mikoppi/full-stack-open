import React from "react";

const Login = ({handleLogin, username, password, handleNameChange, handlePasswordChange}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>
          username
          <input type="text" id="username" value={username} onChange={handleNameChange}/>
        </label>
        <label>
          password
          <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
        </label>
        <input type='submit' value='login'/>
      </form>
    </div>
  );
};

export default Login;
