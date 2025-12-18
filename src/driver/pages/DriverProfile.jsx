import React from 'react'
import DriverNavbar from '../components/DriverNavbar'
import DriverSidebar from '../components/DriverSidebar'
import DriverProfileMain from '../components/DriverProfileMain'
import Footer from '../../shared/components/Footer'
const DriverProfile = () => {
  return (
    <>
    <DriverNavbar />
    <div className="container mb-5">
    <div className='row mt-5'>
      <div className="col-md-3">
        <DriverSidebar />
      </div>
      <div className="col-md-9">
        <DriverProfileMain />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default DriverProfile