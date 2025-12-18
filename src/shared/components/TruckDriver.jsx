import React from 'react'
import { Link } from 'react-router-dom'

const TruckDriver = () => {
  return (
    <section className="container-fluid">
        <div className='truck-driver'>
            <div className="truck-overlay"></div>
            <div className="py-5 position-relative">
                <h3 className='driver-title text-center mb-3'>سائقي الشركات</h3>
                <p className='driver-desc text-center'>وفّرنا لك كصاحب شاحنة أو شركة نقل منصة احترافية لاستقبال الطلبات، وزيادة دخلك بكل سهولة وموثوقية.</p>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mt-3">
                            <div className="driver-card h-100 d-flex flex-column align-items-start gap-2">
                                <img src="../assets/driver-icon-1.svg" alt="icon" />
                                <h4 className='driver-card-title m-0'>التسجيل وإنشاء الحساب</h4>
                                <p className='driver-card-desc m-0'>قم بإنشاء حسابك كمزود خدمة، وأضف معلومات السائق والشاحنات المملوكة لك.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-3">
                            <div className="driver-card h-100 d-flex flex-column align-items-start gap-2">
                                <img src="../assets/driver-icon-2.svg" alt="icon" />
                                <h4 className='driver-card-title m-0'>استلام الطلبات المناسبة</h4>
                                <p className='driver-card-desc m-0'>تتلقى إشعارات بالطلبات المتاحة في منطقتك، ويمكنك قبول الطلب بضغطة واحدة.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-3">
                            <div className="driver-card h-100 d-flex flex-column align-items-start gap-2">
                                <img src="../assets/driver-icon-3.svg" alt="icon" />
                                <h4 className='driver-card-title m-0'>تنفيذ المهمة والتسليم</h4>
                                <p className='driver-card-desc m-0'>توجّه لموقع التحميل، نفّذ المهمة حسب المعلومات المدخلة، وقم بالتوصيل للعميل.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 mt-3">
                            <div className="driver-card h-100 d-flex flex-column align-items-start gap-2">
                                <img src="../assets/driver-icon-4.svg" alt="icon" />
                                <h4 className='driver-card-title m-0'>استلام المستحقات</h4>
                                <p className='driver-card-desc m-0'>بعد تأكيد التسليم، تُحول المستحقات إلى محفظتك تلقائيًا.</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <Link to='/login'>
                        <button className="login-button mt-4">انضم الينا الان</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TruckDriver