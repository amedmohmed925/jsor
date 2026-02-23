import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import VehicleDetailsComponent from '../components/VehicleDetailsComponent'
import Footer from '../../shared/components/Footer'
import { useParams } from 'react-router-dom'

const VehicleDetails = () => {
    const { id } = useParams();
    
    return (
        <div>
            <AdminNavbar />
            <div className="container my-4">
                <VehicleDetailsComponent vehicleId={id} />
            </div>
            <Footer />
        </div>
    )
}

export default VehicleDetails
