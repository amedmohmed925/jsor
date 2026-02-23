import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import UpdateVehicleComponent from '../components/UpdateVehicleComponent'
import Footer from '../../shared/components/Footer'
import { useParams } from 'react-router-dom'

const UpdateVehicle = () => {
    const { id } = useParams();
    
    return (
        <div>
            <AdminNavbar />
            <div className="container my-4">
                <UpdateVehicleComponent vehicleId={id} />
            </div>
            <Footer />
        </div>
    )
}

export default UpdateVehicle
