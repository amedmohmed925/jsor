import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown, faChevronUp, faEnvelope, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const DriversComponent = () => {
  return (
    <div className="vehicles-content mt-2">
      <div className="shadow p-2 rounded-3">
        <h4 className="orders-title m-0">إدارة السائقين</h4>
        <div className="row mt-2">
            <div className="col-md-9 mb-2">
            <div className="position-relative">
  <input
    type="text"
    className="form-control form-input py-2"
    style={{paddingRight:'35px'}}
    placeholder="البحث عن السائق ..."
  />

  <span className="search-input-icon">
    <i className="fas fa-search"></i>
  </span>
</div>

            </div>
            <div className="col-md-3 mb-2">
            <div className="mb-3">
                                            <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3">
        <option value="كل الحالات">كل الحالات</option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                                        </div>
            </div>
        </div>
        <div className="card-order-details p-2 border rounded-3 mb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-start justify-content-between w-100'>
              <div className="d-flex gap-2 align-items-start">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                  </div>
                  <div className="new-order-badge py-1 px-2 rounded-2 text-nowrap">مدعو</div>
              </div>
              <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">السيارة المخصصة:</p>
                <h4 className="orders-card-title mb-0">دينا</h4>
                </div>
              <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">مدعو:</p>
                <h4 className="orders-card-title mb-0">2024-01-14</h4>
                </div>
              <div className="accepted-badge p-2 d-flex align-items-center gap-1 rounded-3 w-100"><FontAwesomeIcon icon={faEnvelope} /> تم إرسال الدعوة - ​​في انتظار الرد</div>
            </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div
                    className="contact-driver-button-2 w-100"
                  >
                    <p className='m-0'>الغاء</p>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                <button type='button' className="login-button text-decoration-none w-100">اعادة الارسال</button>

                </div>
              </div>
          </div>
        <div className="card-order-details p-2 border rounded-3 mb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-start justify-content-between w-100'>
              <div className="d-flex gap-2 align-items-start">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                  </div>
                  <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">نشط</div>
              </div>
              <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">السيارة المخصصة:</p>
                <h4 className="orders-card-title mb-0">دينا</h4>
                </div>
              <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">تصنيف:</p>
                <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                </div>
              <div className="warning-badge p-2 d-flex align-items-center gap-1 rounded-3 w-100"><FontAwesomeIcon icon={faTriangleExclamation} className='text-warning' /> ينتهي الترخيص في 2025-06-15</div>
            </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div
                    className="contact-driver-button-2 w-100"
                  >
                    <p className='m-0'>اتصال</p>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                <button type='button' className="login-button text-decoration-none w-100">تعيين</button>

                </div>
              </div>
          </div>
        <div className="card-order-details p-2 border rounded-3 mb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-start justify-content-between w-100'>
              <div className="d-flex gap-2 align-items-start">
                    <img src="../../assets/man.png" className='user-img' alt="user" />
                    <div>
                      <div className="d-flex gap-1 align-items-center">
                        <h6 className="user-name m-0">Omar alrajihi</h6>
                        <div className="new-order-badge p-1 rounded-2 text-nowrap">4,9 <img src="../../assets/star.svg" alt="" /></div>
                      </div>
                      <p className="user-desc m-0">سائق تريلا</p>
                    </div>
                  </div>
                  <div className="gray-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">غير نشط</div>
              </div>
              <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">السيارة المخصصة:</p>
                <h4 className="orders-card-title mb-0">دينا</h4>
                </div>
                <div className='d-flex gap-1 align-items-center'>
                <p className="user-desc m-0">آخر نشاط:</p>
                <h4 className="orders-card-title mb-0">2024-01-14</h4>
                </div>
            </div>
              <div className="row">
                <div className="col-12 mt-2">
                <button type='button' className="login-button text-decoration-none w-100">اعادة التنشيط</button>

                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default DriversComponent;