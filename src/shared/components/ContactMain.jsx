import React from 'react'

const ContactMain = () => {
  return (
    <section className='pt-md-5 pb-5'>
      <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6 mt-4">
                <h2 className='contact-main-title'>تواصل معنا</h2>
                <p className='contact-main-desc'>هل لديك استفسارات؟ لا تتردد في التواصل معنا للحصول على الدعم أو المزيد من المعلومات حول QaymPlus. فريقنا جاهز للإجابة على جميع استفساراتك.</p>
                <div className="row">
                    <div className="col-md-6">
                    <div className="mb-3">
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="الاسم الأول"
                />
                </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-3">
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="رقم الجوال*"
                />
                </div>
                    </div>
                    <div className="col-12">
                <div className="mb-3">
                <input
                    type="email"
                    className="form-control form-input py-2"
                    placeholder="عنوان البريد الإلكتروني*"
                />
                </div>

                    </div>
                    <div className="col-12">
                <div className="mb-3">
                    <textarea rows="5" className="form-control form-input" placeholder="شاركنا مشاكلك أو استفساراتك هنا"></textarea>
                </div>

                    </div>
                    <div className="col-12">
                {/* Login Button */}
                <button className="login-button w-100 py-2 rounded-3">
                إرسال
                </button>
                    </div>
                </div>


            </div>
            <div className="col-md-6 mt-4">
                <img src="../assets/contact-man-img.png" className='img-fluid w-100 contact-man-img' alt="contact" />
            </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMain
