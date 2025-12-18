import React, { useRef, useState } from "react";
import DriverNavbar from '../components/DriverNavbar'
import Footer from '../../shared/components/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowDown, faArrowDownLong, faDotCircle, faCircleDot, faCircle, faCaretDown, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const OrderDetails = () => {
    const [currentStep, setCurrentStep] = useState(2);
    const [open, setOpen] = useState(false);
    const [selectedTruck, setSelectedTruck] = useState(null);

    return (
        <>
            <DriverNavbar />

            <div className="container mb-5">
                <div className="row">
                    <div className="col-12 mt-3">
                        <h2 className='orders-title mb-2'>تفاصيل الطلب</h2>
                        <div className="shadow p-3 rounded-3">
                            <div className='d-flex align-items-center justify-content-between w-100 mb-1'>
                            <h3 className='orders-card-title m-0'>طلب توصيل أثاث منزلي</h3>
                            <div className='d-flex gap-2 align-items-center'>
                            <div className='not-have'>منذ 10 دقائق</div>
                            <div className="shipped-badge py-1 px-2 rounded-2 text-nowrap d-flex align-items-center">تم الشحن</div>
                        </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="p-2 border rounded-2 h-100">
                                    <h2 className='orders-card-title mb-0'>تفاصيل الطلب</h2>

                                    <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mt-2 active">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>استلام الشحنة</h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mt-2">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>في الطريق للشحن </h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                <div className="tracking-item p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 mt-2">
                    <div className='d-flex align-items-center gap-2'>
                        <FontAwesomeIcon icon={faCircle} className='dot-gray' />
                        <div>
                            <h6 className='document-li m-0'>تسليم الحمولة</h6>
                            <p className='user-desc m-0'>الرياض</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <h6 className='user-desc m-0'>03-06-2025</h6>
                        <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                        <h6 className='user-desc m-0'>08:00</h6>
                    </div>
                </div>
                <h2 className='orders-card-title my-2'>صور الحمولة</h2>
                <div className="taken-imgs d-flex gap-2 align-items-center flex-wrap">
    <div className="taken-img position-relative">
        <img src="../../assets/taken-img-1.png" className="taken-img" alt="taken-img" />
    </div>
    <div className="taken-img position-relative">
        <img src="../../assets/taken-img-2.png" className="taken-img" alt="taken-img" />
    </div>
    <div className="taken-img position-relative">
        <img src="../../assets/taken-img-3.png" className="taken-img" alt="taken-img" />
    </div>
</div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="p-2 border rounded-2 h-100">
                                    <h2 className='orders-card-title mb-2'>تفاصيل الشحنة</h2>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="p-2 rounded-3 card-gray-bg">
                                            <h2 className='orders-card-title mb-2'>مكان التسليم</h2>
                                            <p className="footer-main-sublabel mb-2">الرياض</p>
                                            <p className="not-have mb-2">وقت التسليم</p>
                                            <div className="d-flex gap-2 align-items-center">
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-2 rounded-3 card-gray-bg h-100">
                                            <h2 className='orders-card-title mb-2'>مكان التسليم</h2>
                                            <p className="footer-main-sublabel mb-2">الرياض</p>
                                            <div className="d-flex gap-2 align-items-center">
                <img src="../../assets/calendar.svg" className='mb-1' alt="calender" />
                <h6 className='user-desc m-0'>03-06-2025</h6>
                <FontAwesomeIcon icon={faCircle} className='dot-icon' />
                <h6 className='user-desc m-0'>08:00</h6>
              </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h2 className='orders-card-title mt-2 mb-3'>تفاصيل الشحنة</h2>
                                    <div className="d-flex mb-2 align-items-center gap-1">
                                    <p className="document-li mb-0">الوزن:</p>
                                    <p className="document-li mb-0">15 رطلاً</p>
                                    </div>
                                    <div className="d-flex mb-2 align-items-center gap-1">
                                    <p className="document-li mb-0">الأبعاد:</p>
                                    <p className="document-li mb-0">12 بوصة × 8 بوصة × 6 بوصة</p>
                                    </div>
                                    <div className="d-flex mb-2 align-items-center gap-1">
                                    <p className="document-li mb-0">النوع:</p>
                                    <p className="document-li mb-0">إلكترونيات</p>
                                    </div>
                                    <div className="d-flex mb-2 align-items-center gap-1">
                                    <p className="document-li mb-0">القيمة:</p>
                                    <p className="document-li mb-0">500 دولار</p>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="border p-2 rounded-2">
                                    <h2 className='orders-card-title mb-4'>التكلفة الاجمالية</h2>
                                    <h6 className="orange-price m-0">120 $</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrderDetails;