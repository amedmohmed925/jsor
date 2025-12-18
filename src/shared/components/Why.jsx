import React from 'react'

const Why = () => {
  return (
    <section className='my-5'>
      <div className="container text-center">
        <h2 className="section-title">لماذا نحن</h2>
        <p className="section-desc">نعمل على تقديم تجربة شحن موثوقة وآمنة ترتكز على راحة العميل، من خلال مزايا تضمن لك حماية
 البضائع وسهولة المتابعة على مدار الساعة.</p>
      <div className="row">
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <div className="card-img-container p-2 rounded-circle">
                    <img src="../assets/why-icon-1.svg" alt="icon" />
                </div>
                <h5 className='why-card-title m-0'>تأمين على البضائع</h5>
                <p className='why-card-desc m-0'>نتعاون مع شركة تأمين معروفة وموثوقة لضمان حماية بضائعك طوال فترة النقل، مما يعزز من سلامة عملياتك التجارية.</p>
            </div>
        </div>
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <div className="card-img-container p-2 rounded-circle">
                    <img src="../assets/why-icon-2.svg" alt="icon" />
                </div>
                <h5 className='why-card-title m-0'>خدمة عملاء على مدار الساعة</h5>
                <p className='why-card-desc m-0'>فريق دعم متواجد 24/7 لمساعدتك والإجابة على استفساراتك في أي وقت.</p>
            </div>
        </div>
        <div className="col-md-4 mt-4">
            <div className="why-card h-100 p-4 d-flex flex-column align-items-center justify-content-start gap-2">
                <div className="card-img-container p-2 rounded-circle">
                    <img src="../assets/why-icon-3.svg" alt="icon" />
                </div>
                <h5 className='why-card-title m-0'>نظام تتبع دقيق</h5>
                <p className='why-card-desc m-0'>تابع موقع شاحنتك لحظيًا عبر التطبيق أو الموقع الإلكتروني، واعرف موقع بضائعك في كل لحظة.</p>
            </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Why
