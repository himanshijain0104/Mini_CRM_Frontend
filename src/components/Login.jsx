import React from 'react';
import '../CSS/Login.css'; 

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Backend OAuth route
  };

  return (
    <div className="login-container">
      <h1 className='loginText'>Login</h1>
      <button className='button' onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
