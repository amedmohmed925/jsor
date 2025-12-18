import React from 'react'
import DriverNavbar from '../components/DriverNavbar'
import DriverSidebar from '../components/DriverSidebar'
import DriverOrdersMain from '../components/DriverOrdersMain'
import Footer from '../../shared/components/Footer'
const DriverOrders = () => {
  return (
    <>
    <DriverNavbar />
    <div className="container mb-5">
    <div className='row mt-5'>
      <div className="col-md-3">
        <DriverSidebar />
      </div>
      <div className="col-md-9">
        <DriverOrdersMain />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default DriverOrders