import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SettingsComponent = () => {
  return (
    <div className="settings-content p-2 mt-2 shadow border rounded-2">
              <div className="row">
            <h3 className='orders-title mb-3'>إعدادات الفريق وتكوينه</h3>
            <div className="col-md-6 mb-3">
              <div className="card p-2 h-100">
              <h3 className='orders-title mb-2'>معلومات الشركة</h3>
                <div className="mb-3">
                        <label className="form-label mb-1">اسم الشركة</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="Metro Logistics Inc."
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">رخصة تجارية</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="BL-2024-001234"
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">عنوان العمل</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="الرياض"
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label mb-1">رقم التعريف الضريبي</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="TX-987654321"
                />

                </div>
                          <button type='button' className="login-button text-decoration-none">تحديث معلومات الشركة</button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card p-2 h-100">
              <h3 className='orders-title mb-2'>معلومات الاتصال</h3>
                <div className="mb-3">
                        <label className="form-label mb-1">اسم جهة الاتصال الأساسية</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="Metro Logistics Inc."
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">عنوان البريد الإلكتروني</label>
                    <input
                        type="email"
                        className="form-control form-input py-2"
                        placeholder="habibmeddour1997@gmail.com"
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">رقم الهاتف</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="Phone number"
                    />
                    </div>
                    <div className="mb-3">
                    <label className="form-label mb-1">جهة الاتصال في حالات الطوارئ</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="جهة الاتصال في حالات الطوارئ"
                />

                </div>
                          <button type='button' className="login-button text-decoration-none">تحديث معلومات الاتصال</button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card p-2 h-100">
              <h3 className='orders-title mb-2'>الإشعارات</h3>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                        <label className="form-label mb-0">موافقات المركبات</label>
                        <p className='user-desc m-0'>احصل على إشعار عند الموافقة على المركبات أو رفضها</p>
                  </div>
                  <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" id="auto-assign" />
                </div>
                    </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                        <label className="form-label mb-0">إكمال الرحلة</label>
                        <p className='user-desc m-0'>إشعارات للرحلات المكتملة</p>
                  </div>
                  <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" id="auto-assign" />
                </div>
                    </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                        <label className="form-label mb-0">دعوات السائق</label>
                        <p className='user-desc m-0'>تحديثات حول حالة دعوة السائق</p>
                  </div>
                  <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" id="auto-assign" />
                </div>
                    </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                        <label className="form-label mb-0">تحديثات الدفع</label>
                        <p className='user-desc m-0'>إشعارات الأرباح والدفع</p>
                  </div>
                  <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" id="auto-assign" />
                </div>
                    </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                        <label className="form-label mb-0">تحديثات الدفع</label>
                        <p className='user-desc m-0'>إشعارات الأرباح والدفع</p>
                  </div>
                  <div className="form-check form-switch mb-2">
                  <input className="form-check-input" type="checkbox" id="auto-assign" />
                </div>
                    </div>

              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card p-2 h-100">
              <h3 className='orders-title mb-2'>إعدادات الدفع</h3>
                <div className="mb-3">
                        <label className="form-label mb-1">حساب مصرفي</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="****-****-****-1234"
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">رقم التوجيه</label>
                    <input
                        type="email"
                        className="form-control form-input py-2"
                        placeholder="021000021"
                    />
                    </div>
                <div className="mb-3">
                        <label className="form-label mb-1">جدول الدفع</label>
                    <input
                        type="text"
                        className="form-control form-input py-2"
                        placeholder="شهريا"
                    />
                    </div>
                    <div className='new-order-badge p-2 rounded-2 mb-3'>
                      <h6 className=''>عمولة المنصة: 8% لكل رحلة مكتملة</h6>
                      <p className='m-0'>قد تختلف أسعار العمولة بناءً على مسافة الرحلة ونوعها</p>
                    </div>
                          <button type='button' className="login-button text-decoration-none">تحديث معلومات الدفع</button>
              </div>
            </div>
            <div className="col-12">
              <div className='card p-2 h-100'>
              <h3 className='orders-title mb-2'>إدارة الحسابات</h3>
              <label className="form-label mb-1">إدارة حالة حسابك وبياناته</label>
              <div className="row">
                <div className="col-md-4 mt-2">
                  <div className="export-account rounded-2 w-100 text-center">تصدير بيانات الحساب</div>
                </div>
                <div className="col-md-4 mt-2">
                  <div className="export-account rounded-2 w-100 text-center">تعليق الحساب</div>
                </div>
                <div className="col-md-4 mt-2">
                  <div className="delete-account rounded-2 w-100 text-center">حذف الحساب</div>
                </div>
              </div>
              <div className="form-label text-center mt-2 mb-0">حذف الحساب نهائي ولا يمكن التراجع عنه. ستُفقد جميع البيانات.</div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default SettingsComponent;