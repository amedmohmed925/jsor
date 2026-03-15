import React from 'react';
import Navbar from '../components/Navbar';
import CompanySignupMain from '../components/CompanySignupMain';

const CompanySignup = () => {
  return (
    <div>
      <div className="login-container position-relative">
        <div className="login-overlay" />
        <Navbar />
        <div className="d-flex justify-content-center align-items-center py-5">
          <CompanySignupMain />
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;
