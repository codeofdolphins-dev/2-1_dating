import React from 'react';
import LogInNav from './Components/LogInNav';
import LoginForm from './Components/LoginForm';

const Login = () => {
  return (
    <>
    <div style={{backgroundColor: "#212529"}}>
    <LogInNav/>
    <LoginForm/>
    </div>
    </>
  );
};

export default Login;
