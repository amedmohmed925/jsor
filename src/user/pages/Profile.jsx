import React from 'react'
import UserNavbar from '../components/UserNavbar'
import UserSidebar from '../components/UserSidebar'
import ProfileMain from '../components/ProfileMain'
import Footer from '../../shared/components/Footer'
const Profile = () => {
  return (
    <>
    <UserNavbar />
    <div className="container mb-5">
    <div className='row mt-5'>
      <div className="col-md-3">
        <UserSidebar />
      </div>
      <div className="col-md-9">
        <ProfileMain />
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Profile