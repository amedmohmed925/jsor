import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTermsDataQuery } from '../../api/site/siteApi';
import LoadingSpinner from '../../components/LoadingSpinner';

const TermsMain = () => {
    const { i18n } = useTranslation();
    const { data: termsData, isLoading } = useGetTermsDataQuery();

    const getLangField = (field) => {
        if (!termsData) return '';
        const isEn = i18n.language === 'en';
        const enField = `${field}_en`;
        return (isEn && termsData[enField]) ? termsData[enField] : termsData[field];
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <LoadingSpinner />
            </div>
        );
    }

    if (!termsData) {
        return (
            <div className="container my-5 text-center">
                <p className="text-muted">
                    {i18n.language === 'en' ? 'No data available' : 'لا توجد بيانات متاحة حالياً'}
                </p>
            </div>
        );
    }

    return (
        <section className='pt-md-5 pb-5'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h2 className='contact-main-title mb-4 text-center'>
                            {getLangField('title')}
                        </h2>
                        <div 
                            className='terms-content rtl-content' 
                            dangerouslySetInnerHTML={{ __html: getLangField('content') }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TermsMain;
