import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ProfileMain = () => {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pb-4">
      <div className="d-flex gap-3 align-items-center">
                    <img src="../../assets/man.png" className='profile-main-img' alt="user" />
                    <div>
                        <h6 className="orders-title m-0">Habib Meddour</h6>
                        <p className="why-card-desc email-text m-0">habibmeddour1997@gmail.com</p>
                    </div>
                </div>
        <div className="d-flex align-items-center gap-2">
          <button type='button' className="login-button text-decoration-none">تعديل</button>
        </div>
      </div>
        <div className="row mt-4">
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">الاسم الاول</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="الاسم الاول"
                />
                </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">الاسم الاخير</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="الاسم الاخير"
                />
                </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">الايميل</label>
                <input
                    type="email"
                    className="form-control form-input py-2"
                    placeholder="الايميل"
                />
                </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">المنطقة</label>
                    <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3">
        <option value="مصر">مصر</option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">رقم الهاتف</label>
                <input
                    type="text"
                    className="form-control form-input py-2"
                    placeholder="رقم الهاتف"
                />
                </div>
            </div>
            <div className="col-md-6">
            <div className="mb-3">
                    <label className="form-label mb-1">الموقع</label>
                    <div className="select-wrapper position-relative">
    <select className="form-select form-input py-2 pe-3">
        <option value="مصر">مصر</option>
    </select>
    <div className="select-icon position-absolute start-0 top-50 translate-middle-y ps-2">
        <ExpandMoreIcon />
    </div>
</div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProfileMain