import React from 'react'

const ProviderDocuments = () => {
  return (
    <section>
        <div className="container provider-documents rounded-5 my-5">
            <div className="row align-items-center">
                <div className="col-md-6 px-4">
                <h3 className='login-title'>الوثائق المطلوبة لإتمام التسجيل</h3>
                <p className='services-card-desc'>يرجى إرفاق الملفات التالية لتسريع معالجة الطلب:</p>
                    <div className='document-li'>ـ صورة الهوية أو الإقامة</div>
                    <div className='document-li'>ـ رخصة قيادة سارية</div>
                    <div className='document-li'>ـ استمارة الشاحنة</div>
                    <div className='document-li'>ـ وثيقة تأمين المركبة</div>
                    <div className='document-li'>ـ سجل تجاري (للشركات)</div>
                <button className="login-button mt-3">إرفاق الوثائق الآن</button>
                </div>
                <div className="col-md-6">
                    <img src="../assets/provider-document-img.png" className='img-fluid provider-document-img w-100' alt="truck" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProviderDocuments
