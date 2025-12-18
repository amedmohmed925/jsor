import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AddDriverComponent from '../components/AddDriverComponent'
import Footer from '../../shared/components/Footer'
const AddDriver = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="container my-4">
      <AddDriverComponent />
      </div>
      <Footer />
    </div>
  )
}

export default AddDriver
