import React from 'react'
import UserNavbar from '../components/UserNavbar'
import UserSidebar from '../components/UserSidebar'
import BalanceMain from '../components/BalanceMain'
import Footer from '../../shared/components/Footer'
const Balance = () => {
  return (
    <>
    <UserNavbar />
    <div className="container mb-5">
    <div className='row mt-5'>
      <div className="col-md-3">
        <UserSidebar />
      </div>
      <div className="col-md-9">
        <BalanceMain />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Balance