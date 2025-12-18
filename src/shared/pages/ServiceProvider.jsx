import React from 'react'
import Navbar from '../components/Navbar'
import ProviderFeatures from '../components/ProviderFeatures'
import ProviderMechanism from '../components/ProviderMechanism'
import ProviderDocuments from '../components/ProviderDocuments'
import Footer from '../components/Footer'
const ServiceProvider = () => {
  return (
    <div>
        <Navbar />
      <div className="provider-container position-relative d-flex justify-content-center align-items-center">
        <div className="provider-overlay"></div>
        <div className="position-relative d-flex flex-column align-items-center">
        <h2 className='provider-main-title text-center'>انضم كمزود خدمة وابدأ في استقبال الطلبات مباشرة</h2>
        <p className='provider-main-desc text-center'>إذا كنت تمتلك شاحنة أو تدير شركة نقل، منصة جسور تمنحك الفرصة لتحقيق دخل ثابت من خلال تلقي الطلبات وتشغيل أسطولك بكفاءة عالية.</p>
        </div>
      </div>
        <ProviderFeatures />
        <ProviderMechanism />
        <ProviderDocuments />
        <Footer isProviderPage={true} />
    </div>
  )
}

export default ServiceProvider
