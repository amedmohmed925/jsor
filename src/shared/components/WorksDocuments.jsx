import { faCheck, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const WorksDocuments = () => {
  return (
    <section>
        <div className="container provider-documents rounded-5 my-5">
            <div className="row align-items-center">
                <div className="col-md-6 px-4">
                <h3 className='login-title'>الوثائق المطلوبة لإتمام الاتفاق</h3>
                <p className='services-card-desc'>يرجى إرفاق الملفات التالية لتسريع معالجة الطلب:</p>
                    <div className='document-li d-flex gap-1 align-items-center'><FontAwesomeIcon icon={faCheckSquare} className='document-icon' /><div>السجل التجاري</div></div>
                    <div className='document-li d-flex gap-1 align-items-center'><FontAwesomeIcon icon={faCheckSquare} className='document-icon' /><div>هوية المفوض</div></div>
                    <div className='document-li d-flex gap-1 align-items-center'><FontAwesomeIcon icon={faCheckSquare} className='document-icon' /><div>تفويض التوقيع</div></div>
                    <div className='document-li d-flex gap-1 align-items-center'><FontAwesomeIcon icon={faCheckSquare} className='document-icon' /><div>نسخة من عقد التأسيس (إن وُجد)</div></div>
                    <div className='document-li'></div>
                </div>
                <div className="col-md-6">
                    <img src="../assets/provider-document-img.png" className='img-fluid works-document-img w-100' alt="truck" />
                </div>
            </div>
        </div>
    </section>
  )
}

export default WorksDocuments
