import React from 'react';

// Import Material Icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';

const RequestMechanism = () => {
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
    },
    {
      id: 5,
      icon: <PhoneOutlinedIcon className='fs-1' />,
      title: 'ادخل رقم مسؤول التحمیل والاستلام',
      description: 'لتسهيل التنسيق، أدخل بيانات التواصل مع المسؤول في موقع التحميل والتسليم.'
    }
  ];

  return (
    <section className='request-mechanism py-5'>
        <div className="container">
            <div className="row align-items-end">
                <div className="col-md-7 text-center mt-3">
                    <h2 className="section-title">آلية الطلب</h2>
                    <p className="section-desc">اطلب شاحنتك خلال دقائق! خطوات بسيطة وسريعة تضمن لك تجربة شحن مريحة وآمنة من البداية حتى التوصيل.</p>
                    <div className="flow-chart">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flow-step">
                                {/* Left box for even steps (starting with index 0) */}
                                {index % 2 === 0 && (
                                    <div className="step-box left-box">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                )}
                                
                                {/* Empty space for odd steps */}
                                {index % 2 !== 0 && <div className="empty-space"></div>}
                                
                                {/* Center icon with line */}
                                <div className="step-icon-container">
                                    <div className="step-icon">{step.icon}</div>
                                    {index < steps.length - 1 && <div className="step-line"></div>}
                                </div>
                                
                                {/* Right box for odd steps */}
                                {index % 2 !== 0 && (
                                    <div className="step-box right-box">
                                        <h3>{step.title}</h3>
                                        <p>{step.description}</p>
                                    </div>
                                )}
                                
                                {/* Empty space for even steps */}
                                {index % 2 === 0 && <div className="empty-space"></div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-5 text-center mt-3">
                    <img src="../assets/iPhone.png" className='img-fluid' alt="iphone" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default RequestMechanism;