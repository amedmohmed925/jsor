import React from 'react'
import Navbar from '../components/Navbar'
import RegisterMain from '../components/RegisterMain'
const Register = () => {
  return (
    <div>
        <div className="login-container position-relative">
        <div className="login-overlay"></div>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center py-5">
        <RegisterMain/>
        </div>
        </div>
    </div>
  )
}

export default Register
