import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import AddTruckComponent from '../components/AddTruckComponent'
import Footer from '../../shared/components/Footer'
const AddTruck = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="container my-4">
      <AddTruckComponent />
      </div>
      <Footer />
    </div>
  )
}

export default AddTruck
