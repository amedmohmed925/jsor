import React from 'react'
import Navbar from '../components/Navbar'
import LoginMain from '../components/LoginMain'
const Login = () => {
  return (
    <div>
        <div className="login-container position-relative">
        <div className="login-overlay"></div>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center login-padding">
        <LoginMain/>
        </div>
        </div>
    </div>
  )
}

export default Login
