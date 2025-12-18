import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const WorksMain = () => {
  return (
    <section className=''>
      <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6 mt-4 order-2 order-md-1">
            <div className="shadow p-3 rounded-4 h-100">
            <h2 className='services-card-title mb-3'>اختر الخدمة</h2>
                <div className="row">
                    <div className="col-12">
                    <div className="mb-3">
                    <label className="form-label mb-1">الاسم</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="الاسم"
                />
                </div>
                    </div>
                    <div className="col-12">
                    <div className="mb-3">
                    <label className="form-label mb-1">رقم الجوال</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="رقم الجوال*"
                />
                </div>
                    </div>
                    <div className="col-12">
                <div className="mb-3">
                    <label className="form-label mb-1">الخدمة المطلوبة</label>
                    <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3">
        <option value="طلب تعاقد ">طلب تعاقد </option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                </div>

                    </div>
                    <div className="col-12">
                <div className="mb-3">
                    <div className="works-note">
                        <h3 className='footer-link-title'>ملاحظة</h3>
                        <p className='footer-link m-0'>قد تتلقى الرد خلال 48 ساعة</p>
                    </div>
                </div>

                    </div>
                    <div className="col-12 text-start">
                {/* Login Button */}
                <button className="login-button py-2 rounded-3">
                ارسال الطلب
                </button>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-md-6 mt-4 order-1 order-md-2">
                <div className='h-100 position-relative'>
                    <div className="works-overlay rounded-4"></div>
                    <div className="works-img-texts px-4">
                        <img src="../assets/logo.png" alt="" />
                        <h5>ما هي خدمة الأعمال؟</h5>
                        <h6>خدمة مخصصة للجهات والشركات التي تحتاج إلى شاحنات بعقود ثابتة أو عمل بالساعة، مع إدارة كاملة من قبل فريقنا المختص لضمان الالتزام والجودة.</h6>
                    </div>
                    <img src="../assets/works-main-img.png" className='img-fluid w-100 rounded-4 works-main-img' alt="contact" />
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default WorksMain
