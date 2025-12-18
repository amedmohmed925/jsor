import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const VehiclesComponent = () => {
  return (
    <div className="vehicles-content mt-2">
      <div className="shadow p-2 rounded-3">
        <h4 className="orders-title m-0">إدارة المركبات</h4>
        <div className="row mt-2">
            <div className="col-md-9 mb-2">
            <div className="position-relative">
  <input
    type="text"
    className="form-control form-input py-2"
    style={{paddingRight:'35px'}}
    placeholder="البحث عن مركبة ..."
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
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                <h4 className="orders-title mb-1">دينا</h4>
                <p className="user-desc m-0">شاحنة دينا (2022)</p>
                </div>
                <div className="cancelled-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">مرفوض</div>
              </div>
              <div className="d-flex gap-2 align-items-center mb-1">
              <p className="user-desc m-0">وثائق:</p>
              <div className="document-gray py-2 px-3 rounded-pill">تسجيل</div>
              <div className="document-gray py-2 px-3 rounded-pill">تأمين</div>
              <div className="document-blue py-2 px-3 rounded-pill">رخصة</div>
              </div>
              <div className="refused-badge p-2 rounded-3 w-100">سبب الرفض: عدم وجود وثائق التأمين</div>
            </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div
                    className="contact-driver-button-2 w-100"
                  >
                    <p className='m-0'>التفاصيل</p>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                <button type='button' className="login-button text-decoration-none w-100">تعديل</button>

                </div>
              </div>
          </div>
        <div className="card-order-details p-2 border rounded-3 mb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                <h4 className="orders-title mb-1">دينا</h4>
                <p className="user-desc m-0">شاحنة دينا (2022)</p>
                </div>
                <div className="charging-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">
                قيد الانتظار
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center mb-1">
              <p className="user-desc m-0">وثائق:</p>
              <div className="document-gray py-2 px-3 rounded-pill">تسجيل</div>
              <div className="document-gray py-2 px-3 rounded-pill">تأمين</div>
              <div className="document-blue py-2 px-3 rounded-pill">رخصة</div>
              </div>
            </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div
                    className="contact-driver-button-2 w-100"
                  >
                    <p className='m-0'>التفاصيل</p>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                <button type='button' className="login-button text-decoration-none w-100">تعديل</button>

                </div>
              </div>
          </div>
        <div className="card-order-details p-2 border rounded-3 mb-2">
            <div className="d-flex flex-column align-items-start gap-2 w-100">
              <div className='d-flex align-items-center justify-content-between w-100'>
                <div>
                <h4 className="orders-title mb-1">دينا</h4>
                <p className="user-desc m-0">شاحنة دينا (2022)</p>
                </div>
                <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الموافقة</div>

              </div>
              <div className="d-flex gap-2 align-items-center mb-1">
              <p className="user-desc m-0">وثائق:</p>
              <div className="document-gray py-2 px-3 rounded-pill">تسجيل</div>
              <div className="document-gray py-2 px-3 rounded-pill">تأمين</div>
              <div className="document-blue py-2 px-3 rounded-pill">رخصة</div>
              </div>
            </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <div
                    className="contact-driver-button-2 w-100"
                  >
                    <p className='m-0'>التفاصيل</p>
                  </div>
                </div>
                <div className="col-md-6 mt-3">
                <button type='button' className="login-button text-decoration-none w-100">تعديل</button>

                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default VehiclesComponent;