import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useViewVehicleQuery } from '../../api/admin/adminApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faUser, faIdCard, faFileContract, faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const VehicleDetailsComponent = ({ vehicleId }) => {
    const { t, i18n } = useTranslation(['admin', 'common']);
    const navigate = useNavigate();
    const isRtl = i18n.language === 'ar';

    const { data: vehicleResponse, isLoading, isError } = useViewVehicleQuery(vehicleId);
    const vehicle = vehicleResponse?.data?.[0]?.[0] || vehicleResponse?.data?.[0];

    if (isLoading) return <LoadingSpinner />;
    if (isError || !vehicle || (Array.isArray(vehicle) && vehicle.length === 0)) return <div className="alert alert-danger">{isRtl ? 'حدث خطأ أثناء جلب تفاصيل المركبة' : 'Error fetching vehicle details'}</div>;

    const getName = (obj) => {
        if (!obj) return '---';
        if (typeof obj === 'string') return obj;
        return isRtl ? (obj.name || '') : (obj.name_en || obj.name || '');
    };

    const getStatusText = (status) => {
        switch (Number(status)) {
            case 0: return isRtl ? 'قيد الانتظار' : 'Pending';
            case 1: return isRtl ? 'مقبول' : 'Approved';
            case 2: return isRtl ? 'مرفوض' : 'Rejected';
            default: return isRtl ? 'غير معروف' : 'Unknown';
        }
    };

    const getStatusClass = (status) => {
        switch (Number(status)) {
            case 0: return 'charging-badge';
            case 1: return 'shipped-badge';
            case 2: return 'cancelled-badge';
            default: return 'new-order-badge';
        }
    };

    return (
        <div className="settings-content">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="orders-title m-0">
                    <FontAwesomeIcon icon={faTruck} className="text-primary me-2 ms-2" />
                    {isRtl ? 'تفاصيل المركبة' : 'Vehicle Details'}
                </h4>
                <button 
                    className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-2"
                    onClick={() => navigate(-1)}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className={isRtl ? 'fa-rotate-180' : ''} />
                    {isRtl ? 'عودة' : 'Back'}
                </button>
            </div>

            <div className="card shadow border-0 rounded-3 p-4 bg-white">
                <div className="row g-4">
                    {/* Header Info */}
                    <div className="col-12 border-bottom pb-3 mb-2 d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                            <h3 className="m-0 text-primary fw-bold">{vehicle.name}</h3>
                            <p className="text-muted m-0">{getName(vehicle.truck_id)} - {getName(vehicle.sub_truck_id)}</p>
                        </div>
                        <div className={`${getStatusClass(vehicle.status)} py-2 px-3 rounded-pill`}>
                            {getStatusText(vehicle.status)}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="col-md-6">
                        <h6 className="fw-bold mb-3 text-dark border-start border-primary border-4 ps-2 pe-2">
                            {isRtl ? 'المعلومات الأساسية' : 'Basic Information'}
                        </h6>
                        <div className="info-list">
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'لوحة السيارة' : 'Plate Number'}</span>
                                <span className="fw-bold">{vehicle.plate_number}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'سنة الصنع' : 'Year'}</span>
                                <span className="fw-bold">{vehicle.year_manufacture}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'اللون' : 'Color'}</span>
                                <span className="fw-bold">{vehicle.color || '---'}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'الحمولة القصوى' : 'Capacity'}</span>
                                <span className="fw-bold">{vehicle.capacity} {isRtl ? 'طن' : 'Ton'}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'الحالة' : 'Condition'}</span>
                                <span className="fw-bold">{vehicle.type == 1 ? (isRtl ? 'جديد' : 'New') : (isRtl ? 'مستعمل' : 'Used')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-md-6">
                        <h6 className="fw-bold mb-3 text-dark border-start border-primary border-4 ps-2 pe-2">
                            {isRtl ? 'معلومات التواصل' : 'Contact Information'}
                        </h6>
                        <div className="info-list">
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'اسم السائق' : 'Driver Name'}</span>
                                <span className="fw-bold">{getName(vehicle.driver_id) || vehicle.name}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'رقم الجوال' : 'Mobile'}</span>
                                <span className="fw-bold">{vehicle.driver_id?.mobile || vehicle.mobile || '---'}</span>
                            </div>
                            <div className="d-flex justify-content-between py-2 border-bottom border-light">
                                <span className="text-muted">{isRtl ? 'البريد الإلكتروني' : 'Email'}</span>
                                <span className="fw-bold">{vehicle.driver_id?.email || vehicle.email || '---'}</span>
                            </div>
                        </div>
                        
                        {vehicle.status == 2 && (
                            <div className="alert alert-danger mt-3 py-2">
                                <strong>{isRtl ? 'سبب الرفض:' : 'Rejection Reason:'}</strong> {vehicle.description}
                            </div>
                        )}
                    </div>

                    {/* Documents */}
                    <div className="col-12 mt-2">
                        <h6 className="fw-bold mb-3 text-dark border-start border-primary border-4 ps-2 pe-2">
                            {isRtl ? 'الوثائق والمستندات' : 'Documents'}
                        </h6>
                        <div className="row g-3">
                            {[
                                { label: isRtl ? 'رخصة القيادة' : 'Driving License', key: 'driving_license', icon: faIdCard },
                                { label: isRtl ? 'وثيقة التأمين' : 'Insurance', key: 'insurance', icon: faFileContract },
                                { label: isRtl ? 'رخصة السير' : 'Registration', key: 'car_registration', icon: faTruck }
                            ].map((doc, idx) => (
                                <div key={idx} className="col-md-4">
                                    <div className="p-3 border rounded-3 text-center bg-light h-100">
                                        <p className="small text-muted mb-2">{doc.label}</p>
                                        {vehicle[doc.key] ? (
                                            <a href={vehicle[doc.key]} target="_blank" rel="noopener noreferrer" className="d-block">
                                                <img 
                                                    src={vehicle[doc.key]} 
                                                    alt={doc.label} 
                                                    className="img-fluid rounded border" 
                                                    style={{ maxHeight: '120px', objectFit: 'contain' }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/assets/document-placeholder.png';
                                                    }}
                                                />
                                                <span className="d-block mt-2 small text-primary fw-bold">
                                                    {isRtl ? 'عرض المستند' : 'View Document'}
                                                </span>
                                            </a>
                                        ) : (
                                            <div className="py-4 text-muted">
                                                <FontAwesomeIcon icon={doc.icon} className="fs-2 mb-2 opacity-25" />
                                                <p className="small m-0">{isRtl ? 'غير متوفر' : 'Not Available'}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <button 
                        className="btn btn-primary px-5 rounded-pill shadow-sm d-flex align-items-center gap-2"
                        onClick={() => navigate(`/admin/update-vehicle/${vehicleId}`)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        {isRtl ? 'تعديل بيانات المركبة' : 'Edit Vehicle Data'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailsComponent;
