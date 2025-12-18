import React from 'react'

const ProviderFeatures = () => {
  return (
    <section className='my-5'>
      <div className="container">
        <h2 className="section-title">مميزات الانضمام كمزود خدمة</h2>
        <p className="contact-main-desc">استفد من الطلبات المتكررة للشحنات اليومية في مناطقك.</p>
      <div className="row">
        <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <img src="../assets/provider-features-icon-1.svg" className='img-fluid provider-features-icon' alt="icon" />
                <h5 className='why-card-title m-0'>تأمين على البضائع</h5>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <img src="../assets/provider-features-icon-2.svg" className='img-fluid provider-features-icon' alt="icon" />
                <h5 className='why-card-title m-0'>طلبات يومية مستمرة</h5>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <img src="../assets/provider-features-icon-3.svg" className='img-fluid provider-features-icon' alt="icon" />
                <h5 className='why-card-title m-0'>إدارة سهلة من التطبيق</h5>
            </div>
        </div>
        <div className="col-lg-3 col-md-6 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <img src="../assets/provider-features-icon-4.svg" className='img-fluid provider-features-icon' alt="icon" />
                <h5 className='why-card-title m-0'>دعم مباشر من الباك أوفيس</h5>
            </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default ProviderFeatures
