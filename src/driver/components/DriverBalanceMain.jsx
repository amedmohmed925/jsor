import React from 'react'

const DriverBalanceMain = () => {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-4 border-bottom">
        <div>
          <h6 className='user-desc'>الرصيد الكلي</h6>
          <h2 className='contact-main-title m-0'> $ 1,450.99 </h2>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button type='button' className="login-button text-decoration-none">شحن الرصيد</button>
          <div className="orange-btn d-flex align-items-center justify-content-center gap-2">سحب الارباح</div>
        </div>
      </div>
      <h3 className='orders-card-title m-0 py-3'>المعاملات المالية</h3>
      <div className="d-flex justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center gap-2">
          <img src="../../assets/arrow-square-down.svg" alt="arrow" />
          <p className='checkbox-label m-0'>الربح من اكمال خدمة </p>
          <p className='orders-card-title m-0'>طلب توصيل أثاث منمزلي</p>
          <p className='footer-main-sublabel m-0'>03 - 06 - 2025</p>
        </div>
        <h3 className='orders-card-title m-0'> $ 120 +</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center gap-2">
          <img src="../../assets/arrow-square-down.svg" alt="arrow" />
          <p className='checkbox-label m-0'>الربح من اكمال خدمة </p>
          <p className='orders-card-title m-0'>طلب توصيل أثاث منمزلي</p>
          <p className='footer-main-sublabel m-0'>03 - 06 - 2025</p>
        </div>
        <h3 className='orders-card-title m-0'> $ 120 +</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center gap-2">
          <img src="../../assets/arrow-square-up.svg" alt="arrow" />
          <p className='checkbox-label m-0'>سحب الارباح</p>
          <p className='orders-card-title m-0'>بواسطة حوالة بنكية</p>
          <p className='footer-main-sublabel m-0'>03 - 06 - 2025</p>
        </div>
        <h3 className='orders-card-title m-0'> $ 120 +</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center gap-2">
          <img src="../../assets/arrow-square-down.svg" alt="arrow" />
          <p className='checkbox-label m-0'>الربح من اكمال خدمة </p>
          <p className='orders-card-title m-0'>طلب توصيل أثاث منمزلي</p>
          <p className='footer-main-sublabel m-0'>03 - 06 - 2025</p>
        </div>
        <h3 className='orders-card-title m-0'> $ 120 +</h3>
      </div>
      <div className="d-flex justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center gap-2">
          <img src="../../assets/arrow-square-up.svg" alt="arrow" />
          <p className='checkbox-label m-0'>سحب الارباح</p>
          <p className='orders-card-title m-0'>بواسطة حوالة بنكية</p>
          <p className='footer-main-sublabel m-0'>03 - 06 - 2025</p>
        </div>
        <h3 className='orders-card-title m-0'> $ 120 +</h3>
      </div>
    </section>
  )
}

export default DriverBalanceMain