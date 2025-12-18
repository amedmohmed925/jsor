import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <section className='my-5'>
      <div className="container">
        <h2 className="section-title text-center">خدماتنا</h2>
        <p className="section-desc text-center">نوفّر حلول شحن ذكية ومرنة تلبي احتياجات الشركات والأفراد، ونمكّن مقدمي الخدمات 
من الوصول إلى فرص عمل موثوقة.</p>
      <div className="row">
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-start justify-content-center gap-2">
                <div className="services-img-container mb-1 w-100">
                    <img src="../assets/services-img-1.png" alt="services" />
                </div>
                <h5 className='services-card-title m-0'>شحن للشركات</h5>
                <p className='services-card-desc m-0'>نقدم حلول شحن احترافية للشركات والمؤسسات مع خيارات جدولة، وفواتير مفصلة، وتغطية شاملة داخل وخارج المدن.</p>
                <Link to='/login' className="services-btn text-decoration-none">اطلب الآن</Link>
            </div>
        </div>
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-start justify-content-center gap-2">
                <div className="services-img-container mb-1 w-100">
                    <img src="../assets/services-img-2.png" alt="services" />
                </div>
                <h5 className='services-card-title m-0'>شحن للأفراد</h5>
                <p className='services-card-desc m-0'>سواء كنت تنقل أثاثًا أو شحنة خاصة، نوفر لك خدمة شحن آمنة وسريعة عبر تطبيق سهل الاستخدام.</p>
                <Link to='/login' className="services-btn text-decoration-none">اطلب الآن</Link>
            </div>
        </div>
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-start justify-content-center gap-2">
                <div className="services-img-container mb-1 w-100">
                    <img src="../assets/services-img-3.png" className='w-100' alt="services" />
                </div>
                <h5 className='services-card-title m-0'>مقدمي الخدمة</h5>
                <p className='services-card-desc m-0'>نوفر لك كصاحب شاحنة أو شركة نقل منصة موثوقة لاستقبال الطلبات، وزيادة دخلك مع دعم فني وتسوية مالية مضمونة.</p>
                <Link to='/login' className="services-btn text-decoration-none">اطلب الآن</Link>
            </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Services
