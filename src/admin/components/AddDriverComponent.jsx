import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddDriverComponent = () => {
  const [licenseFile, setLicenseFile] = useState("");
  const [insuranceFile, setInsuranceFile] = useState("");
  const [formFile, setFormFile] = useState("");

  return (
    <div className="settings-content">
      <h4 className="orders-title m-0">لوحة معلومات المالك</h4>

      <div className="p-3 mt-2 shadow rounded-2">
        <div className="d-flex gap-1 align-items-center mb-2">
          <img src="../assets/user-add.svg" alt="truck" />
          <h4 className="orders-title m-0">دعوة سائق جديد</h4>
        </div>

        <p className="months-filter-item m-0 mb-2">
        أدخل معلومات السائق لإرسال دعوة للانضمام إلى أسطولك
        </p>

        <div className="row">
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">الاسم الكامل</label>
              <input type="text" className="form-control form-input py-2" placeholder="الاسم الكامل" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">البريد الإلكتروني</label>
              <input type="email" className="form-control form-input py-2" placeholder="البريد الإلكتروني" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">رقم الهاتف</label>
              <input type="text" className="form-control form-input py-2" placeholder="رقم الهاتف" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label mb-1">رقم الرخصة</label>
              <input type="text" className="form-control form-input py-2" placeholder="رقم الرخصة" />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label mb-1">سنوات الخبرة</label>
              <input type="text" className="form-control form-input py-2" placeholder="سنوات الخبرة" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">العنوان</label>
              <input type="text" className="form-control form-input py-2" placeholder="العنوان" />
            </div>
          </div>


          {/* License */}
          <div className="col-md-2 mb-2">
            <div className="btn btn-outline-light border w-100">الغاء</div>
          </div>
          <div className="col-md-10 mb-2">
          <button className="login-button w-100">
           <FontAwesomeIcon icon={faPlus} /> اضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriverComponent;
