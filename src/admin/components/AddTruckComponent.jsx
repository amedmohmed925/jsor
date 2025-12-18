import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddTruckComponent = () => {
  const [licenseFile, setLicenseFile] = useState("");
  const [insuranceFile, setInsuranceFile] = useState("");
  const [formFile, setFormFile] = useState("");

  return (
    <div className="settings-content">
      <h4 className="orders-title m-0">لوحة معلومات المالك</h4>

      <div className="p-3 mt-2 shadow rounded-2">
        <div className="d-flex gap-1 align-items-center mb-2">
          <img src="../../assets/truck-icon.svg" alt="truck" />
          <h4 className="orders-title m-0">إضافة مركبة جديدة</h4>
        </div>

        <p className="months-filter-item m-0 mb-2">
          أدخل تفاصيل المركبة وقم بتحميل الوثائق المطلوبة
        </p>

        <h6 className="form-label mb-2">المعلومات الأساسية</h6>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label mb-1">نوع المركبة</label>
              <div className="select-wrapper position-relative">
                <select className="form-select form-input py-2 pe-3">
                  <option>نوع المركبة</option>
                </select>
                <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
                  <ExpandMoreIcon />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label mb-1">رقم اللوحة</label>
              <input type="text" className="form-control form-input py-2" placeholder="رقم اللوحة" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">رقم الهاتف</label>
              <input type="text" className="form-control form-input py-2" placeholder="رقم الهاتف" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label mb-1">الموديل</label>
              <input type="text" className="form-control form-input py-2" placeholder="الموديل" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label mb-1">سنة الصنع</label>
              <input type="text" className="form-control form-input py-2" placeholder="سنة الصنع" />
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label mb-1">اللون</label>
              <input type="text" className="form-control form-input py-2" placeholder="اللون" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">سعة التحميل (كغم)</label>
              <input type="text" className="form-control form-input py-2" placeholder="سعة التحميل (كغم)" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label className="form-label mb-1">وصف إضافي</label>
              <textarea
                className="form-control form-input"
                placeholder="اي معلومات اضافية ..."
                rows="4"
              />
            </div>
          </div>

          {/* Documents */}
          <h6 className="form-label mb-1">الوثائق المطلوبة</h6>

          {/* License */}
          <div className="col-md-4 mt-2">
            <label className="form-label mb-1">رخصة القيادة</label>
            <div className="card p-2 rounded-4">
              <label className="upload-box">
                <input
                  type="file"
                  hidden
                  onChange={(e) => setLicenseFile(e.target.files[0]?.name)}
                />
                <div className="upload-content">
                  <img src="../../assets/export.svg" alt="upload" />
                  <p className="m-0 user-desc">اضغط لتحميل الملف</p>
                </div>
              </label>
            </div>
            <p className="m-0 document-li text-center mt-1">{licenseFile}</p>
          </div>

          {/* Insurance */}
          <div className="col-md-4 mt-2">
            <label className="form-label mb-1">التأمين</label>
            <div className="card p-2 rounded-4">
              <label className="upload-box">
                <input
                  type="file"
                  hidden
                  onChange={(e) => setInsuranceFile(e.target.files[0]?.name)}
                />
                <div className="upload-content">
                  <img src="../../assets/export.svg" alt="upload" />
                  <p className="m-0 user-desc">اضغط لتحميل الملف</p>
                </div>
              </label>
            </div>
            <p className="m-0 document-li text-center mt-1">{insuranceFile}</p>
          </div>

          {/* Vehicle Form */}
          <div className="col-md-4 mt-2">
            <label className="form-label mb-1">استمارة السيارة</label>
            <div className="card p-2 rounded-4">
              <label className="upload-box">
                <input
                  type="file"
                  hidden
                  onChange={(e) => setFormFile(e.target.files[0]?.name)}
                />
                <div className="upload-content">
                  <img src="../../assets/export.svg" alt="upload" />
                  <p className="m-0 user-desc">اضغط لتحميل الملف</p>
                </div>
              </label>
            </div>
            <p className="m-0 document-li text-center mt-1">{formFile}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTruckComponent;
