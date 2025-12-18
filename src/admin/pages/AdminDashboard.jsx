import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import DashboardMain from '../components/DashboardMain'
import Footer from '../../shared/components/Footer'
const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="container my-4">
      <DashboardMain />
      </div>
      <Footer />
    </div>
  )
}

export default AdminDashboard
