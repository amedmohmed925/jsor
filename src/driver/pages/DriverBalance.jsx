import React from 'react'
import DriverNavbar from '../components/DriverNavbar'
import DriverSidebar from '../components/DriverSidebar'
import DriverBalanceMain from '../components/DriverBalanceMain'
import Footer from '../../shared/components/Footer'
const DriverBalance = () => {
  return (
    <>
    <DriverNavbar />
    <div className="container mb-5">
    <div className='row mt-5'>
      <div className="col-md-3">
        <DriverSidebar />
      </div>
      <div className="col-md-9">
        <DriverBalanceMain />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default DriverBalance