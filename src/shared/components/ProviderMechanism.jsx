import React from 'react';

// Import Material Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const ProviderMechanism = () => {
  const steps = [
    {
      id: 1,
      icon: <LocationOnOutlinedIcon className='fs-1' />,
      title: 'حدد موقع التحمیل',
      description: 'اختر المكان الذي سيتم تحميل الشحنة منه بدقة لسهولة وصول السائق.'
    },
    {
      id: 2,
      icon: <FullscreenOutlinedIcon className='fs-1' />,
      title: 'اختر حجم الشاحنة ونوعھا',
      description: 'اختر الشاحنة المناسبة حسب نوع الحمولة (ثلاجة، سطحه، دينا...).'
    },
    {
      id: 3,
      icon: <PaidOutlinedIcon className='fs-1' />,
      title: 'ادخل قیمة الحمولة المراد التامین علیھا',
      description: 'لحماية شحنتك، أدخل القيمة لتفعيل التأمين المناسب ضد المخاطر.'
    },
    {
      id: 4,
      icon: <ScheduleOutlinedIcon className='fs-1' />,
      title: 'حدد موقع التسلیم',
      description: 'حدّد الوجهة النهائية لتوصيل الشحنة بدقة على الخريطة.'
    }
  ];

  return (
    <div className="container">
      <section className='request-mechanism rounded-5 py-5'>
        <h2 className="services-card-title text-center">آلية الانضمام بخطوات بسيطة</h2>
        <p className="login-desc text-center">استفد من الطلبات المتكررة للشحنات اليومية في مناطقك.</p>
        <div className="row align-items-center">
          <div className="col-md-7 text-center mt-3">
            <div className="flow-chart">
              <div className="flow-content mx-auto">
                {/* Icons Column */}
                <div className="icons-column">
                  {steps.map((step, index) => (
                    <div key={step.id} className="step-icon-container">
                      <div className="step-icon">{step.icon}</div>
                      {index < steps.length - 1 && <div className="step-line"></div>}
                    </div>
                  ))}
                </div>
                
                {/* Content Column */}
                <div className="content-column">
                  {steps.map((step) => (
                    <div key={step.id} className="provider-step-box">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center mt-3">
            <img src="../assets/iPhone.png" className='img-fluid' style={{maxHeight:"500px"}} alt="iphone" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProviderMechanism;