import React from 'react'
import Navbar from '../components/Navbar'
import DriverSignupMain from '../components/DriverSignupMain'

const DriverSignup = () => {
  return (
    <div>
        <div className="login-container position-relative">
        <div className="login-overlay"></div>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center py-5">
            <DriverSignupMain />
        </div>
        </div>
    </div>
  )
}

export default DriverSignup
