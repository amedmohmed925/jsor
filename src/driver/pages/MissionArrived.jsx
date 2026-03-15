import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import DriverNavbar from '../components/DriverNavbar';
import Footer from '../../shared/components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDownLong, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useCustomerSignatureMutation, useUploadImageAfterMutation, useEndOrderMutation } from "../../api/driver/driverApi";
import { useSelector } from "react-redux";

const MissionArrived = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;
    const token = useSelector(state => state.auth?.token || state.auth?.user?.token);

    const [currentStep] = useState(2);
    const [confirmCode, setConfirmCode] = useState('');
    const [signatureFile, setSignatureFile] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);

    const signatureInputRef = useRef(null);
    const signatureCameraRef = useRef(null);
    const imagesInputRef = useRef(null);
    const imagesCameraRef = useRef(null);

    const openCamera = (ref) => async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            stream.getTracks().forEach(t => t.stop());
            ref.current?.click();
        } catch {
            ref.current?.click();
        }
    };

    const [customerSignature, { isLoading: sigLoading }] = useCustomerSignatureMutation();
    const [uploadImageAfter, { isLoading: imgLoading }] = useUploadImageAfterMutation();
    const [endOrder, { isLoading: endLoading }] = useEndOrderMutation();

    const isLoading = sigLoading || imgLoading || endLoading;

    const isRtl = i18n.language === 'ar';
    const getName = (obj) => {
        if (!obj) return '---';
        if (typeof obj === 'string') return obj;
        return isRtl ? (obj.name || '') : (obj.name_en || obj.name || '');
    };

    const calcDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
    };

    const totalDistance = order?.lat_from && order?.lang_from && order?.lat_to1 && order?.lang_to1
        ? calcDistance(parseFloat(order.lat_from), parseFloat(order.lang_from), parseFloat(order.lat_to1), parseFloat(order.lang_to1))
        : order?.distance || null;


    const handleSignatureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSignatureFile(file);
            setSignaturePreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleFinish = async () => {
        if (!order) return;
        if (!confirmCode.trim()) {
            toast.error(isRtl ? 'الرجاء إدخال رمز التحقق' : 'Please enter verification code');
            return;
        }
        if (images.length === 0) {
            toast.error(isRtl ? 'يرجى رفع صور الحمولة أولاً' : 'Please upload cargo images first');
            return;
        }
        if (!signatureFile) {
            toast.error(isRtl ? 'يرجى رفع صورة التوقيع أولاً' : 'Please upload signature image first');
            return;
        }

        try {
            // 1. First, verify signature and code (Crucial verification)
            const sigBody = new FormData();
            sigBody.append('request_id', order.id);
            sigBody.append('confirm_code', confirmCode);
            sigBody.append('signature', signatureFile);

            const sigRes = await customerSignature({ token, body: sigBody }).unwrap();
            // Assuming status 1 is success, and we stop everything if it fails
            if (sigRes.status !== 1 || (sigRes.data?.[0] && sigRes.data[0].status === 0)) {
                toast.error(sigRes.message || sigRes.data?.[0]?.message || (isRtl ? 'رمز التحقق أو التوقيع غير صحيح' : 'Verification code or signature is incorrect'));
                return;
            }

            // 2. Upload cargo images (reqeust_id — API typo)
            const imgBody = new FormData();
            imgBody.append('reqeust_id', order.id);
            images.forEach(img => imgBody.append('image[]', img));

            const imgRes = await uploadImageAfter({ token, body: imgBody }).unwrap();
            if (imgRes.status !== 1) {
                toast.error(imgRes.message || (isRtl ? 'فشل رفع الصور' : 'Failed to upload images'));
                return;
            }

            // 3. Finally, end the order
            const endBody = new FormData();
            endBody.append('request_id', order.id);

            const endRes = await endOrder({ token, body: endBody }).unwrap();
            if (endRes.status !== 1) {
                toast.error(endRes.message || (isRtl ? 'فشل إنهاء الطلب' : 'Failed to end order'));
                return;
            }

            toast.success(isRtl ? 'تم إنهاء المهمة بنجاح' : 'Mission completed successfully');
            navigate('/driver/orders');
        } catch (err) {
            console.error(err);
            toast.error(isRtl ? 'حدث خطأ في الاتصال أو تنفيذ العملية' : 'Error in connection or process execution');
        }
    };

    const progressLabels = i18n.language === 'ar'
        ? ['استلام الشحنة', 'في الطريق للشحن', 'تسليم الحمولة']
        : ['Pickup', 'En Route', 'Delivery'];

    return (
        <>
            <DriverNavbar />

            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 mt-3">
                        <div className="shadow p-3 rounded-3 h-100">
                            <h2 className='orders-title'>
                                {t('driver:missionArrived.signatureTitle', 'اطلب من العميل التوقيع على الشاشة')}
                            </h2>
                            <div className="mt-3 h-100">
                                <div className="assigned-img d-flex justify-content-center align-items-center">
                                    {signaturePreview ? (
                                        <img src={signaturePreview} className="img-fluid" alt="signature" style={{ maxHeight: 200 }} />
                                    ) : (
                                        <img src="/assets/assigned-img.png" className="img-fluid" alt="" />
                                    )}
                                </div>
                                <div className="d-flex justify-content-center gap-2 mt-2">
                                    <button
                                        type="button"
                                        className="login-button text-decoration-none d-flex align-items-center gap-1 justify-content-center take-img-btn"
                                        onClick={() => signatureInputRef.current?.click()}
                                    >
                                        <img src="/assets/camera.svg" alt="" />
                                        {t('driver:missionArrived.uploadSignature', 'رفع صورة التوقيع')}
                                    </button>
                                    <button
                                        type="button"
                                        className="orange-btn text-decoration-none px-3 d-flex align-items-center justify-content-center"
                                        style={{ borderRadius: '10px' }}
                                        onClick={openCamera(signatureCameraRef)}
                                    >
                                        <i className="fas fa-camera fs-5"></i>
                                    </button>
                                    <input
                                        ref={signatureInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="d-none"
                                        onChange={handleSignatureChange}
                                    />
                                    <input
                                        ref={signatureCameraRef}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        className="d-none"
                                        onChange={handleSignatureChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="shadow p-3 rounded-3 h-100">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label mb-1">
                                            {t('driver:missionArrived.verifyCode', 'ادخل رمز التحقق')}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-input py-2"
                                            placeholder={t('driver:missionArrived.verifyCodePlaceholder', 'رمز التحقق')}
                                            value={confirmCode}
                                            onChange={e => setConfirmCode(e.target.value)}
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label mb-1">
                                            {t('driver:missionArrived.capturePhotos', 'التقط صورة للحمولة')}
                                        </label>
                                        <div className="d-flex gap-2">
                                            <button
                                                type='button'
                                                className="login-button text-decoration-none flex-grow-1 d-flex align-items-center gap-1 justify-content-center take-img-btn"
                                                onClick={() => imagesInputRef.current?.click()}
                                            >
                                                <img src="/assets/camera.svg" alt="" />
                                                {t('driver:missionArrived.capturePhotos', 'التقاط صورة للحمولة')}
                                            </button>
                                            <button
                                                type='button'
                                                className="orange-btn text-decoration-none px-3 d-flex align-items-center justify-content-center"
                                                style={{ borderRadius: '10px' }}
                                                onClick={openCamera(imagesCameraRef)}
                                            >
                                                <i className="fas fa-camera fs-5"></i>
                                            </button>
                                        </div>
                                        <input
                                            ref={imagesInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="d-none"
                                            onChange={handleImagesChange}
                                        />
                                        <input
                                            ref={imagesCameraRef}
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            multiple
                                            className="d-none"
                                            onChange={handleImagesChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {previews.length > 0 && (
                                <div className="taken-imgs d-flex gap-2 align-items-center flex-wrap mb-3">
                                    {previews.map((src, idx) => (
                                        <div key={idx} className="taken-img position-relative">
                                            <img src={src} className="taken-img" alt="taken-img" />
                                            <img
                                                src="/assets/close.svg"
                                                className="delete-taken-img"
                                                alt="remove"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => removeImage(idx)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Shipment Progress */}
                            <div className={`shipment-progress ${currentStep === 2 ? "shipment-arrived" : ""}`}>
                                <div className="progress-labels">
                                    {progressLabels.map((item, index) => (
                                        <span
                                            key={index}
                                            className={`progress-label ${currentStep >= index ? "active" : ""}`}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                                <div className="progress-line-wrapper mt-4">
                                    <div className="progress-line-bg" />
                                    <div className="progress-line-active" style={{ width: `${currentStep * 50}%` }} />
                                    <div className={`truck-position step-${currentStep}`}>
                                        <img src="/assets/filter-card-img-1.png" alt="truck" />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="from-to-wrapper mt-3 w-100 mb-2">
                                    {/* الأيقونات */}
                                    <div className="from-to-icons">
                                        <div className="location-icon">
                                            <FontAwesomeIcon icon={faLocationDot} className='fs-6 text-primary' />
                                        </div>
                                        <div className="circle"></div>
                                        <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                                        {(() => {
                                            const dests = [];
                                            for (let i = 1; i <= 5; i++) {
                                                const addr = order?.[`address_to${i === 1 ? '1' : i === 2 ? '2' : i}`] || order?.[`address_to${i}`];
                                                if (addr && addr !== 'null') dests.push(addr);
                                            }
                                            if (dests.length === 0 && order?.city_to) dests.push(getName(order.city_to));

                                            return dests.length > 1 ? dests.slice(1).map((_, idx) => (
                                                <React.Fragment key={idx}>
                                                    <div className="circle"></div>
                                                    <FontAwesomeIcon icon={faArrowDownLong} className="arrow" />
                                                </React.Fragment>
                                            )) : null;
                                        })()}
                                        <div className="location-icon">
                                            <FontAwesomeIcon icon={faLocationDot} className='fs-6 text-danger' />
                                        </div>
                                    </div>
                                    {/* النص */}
                                    <div className="from-to-text">
                                        <span>{order?.address_from && order.address_from !== 'null' ? order.address_from : (getName(order?.city_from) || (isRtl ? 'موقع الانطلاق' : 'Pickup point'))}</span>
                                        {(() => {
                                            const dests = [];
                                            for (let i = 1; i <= 5; i++) {
                                                const addr = order?.[`address_to${i === 1 ? '1' : i === 2 ? '2' : i}`] || order?.[`address_to${i}`];
                                                if (addr && addr !== 'null') dests.push(addr);
                                            }
                                            if (dests.length === 0 && order?.city_to) dests.push(getName(order.city_to));

                                            return dests.length > 0 ? dests.map((d, idx) => (
                                                <span key={idx}>{d}</span>
                                            )) : <span>{isRtl ? 'موقع الوصول' : 'Delivery point'}</span>;
                                        })()}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap gap-2 mt-3">
                                    <h2 className='orders-title'>{t('driver:orders.distance', 'المسافة')}</h2>
                                    <img src="/assets/distance.svg" alt="distance" />
                                    <p className="orders-card-title mb-2">
                                        {totalDistance ? `${totalDistance} ${t('driver:orders.km', 'كلم')}` : '---'}
                                    </p>
                                    <FontAwesomeIcon icon={faCircle} className='dot-gray-8' />
                                    <h2 className='orders-title'>{t('driver:orders.cargo', 'الحمولة')}</h2>
                                    <img src="/assets/box.svg" alt="distance" />
                                    <p className="orders-card-title mb-2">
                                        {getName(order?.good_type_id) || getName(order?.type) || '---'}
                                    </p>
                                </div>
                                <div className="d-flex gap-2 align-items-center mt-3">
                                    <button
                                        type='button'
                                        className="login-button text-decoration-none"
                                        onClick={handleFinish}
                                        disabled={isLoading}
                                    >
                                        {isLoading
                                            ? t('common:loading', 'جاري...')
                                            : t('driver:missionArrived.done', 'تم')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default MissionArrived;