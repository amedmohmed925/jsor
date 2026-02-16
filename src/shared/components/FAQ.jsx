import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation('common');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.q1.question', 'كيف يمكنني التقدم؟'),
      answer: t('faq.q1.answer', 'يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك.')
    },
    {
      question: t('faq.q2.question', 'ما هي فوائد العمل معك؟'),
      answer: t('faq.q2.answer', 'يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك.')
    },
    {
      question: t('faq.q3.question', 'من يمكنه الانضمام إليكم؟'),
      answer: t('faq.q3.answer', 'يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك.')
    },
    {
      question: t('faq.q4.question', 'اريد الانضمام كسائق؟'),
      answer: t('faq.q4.answer', 'يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك.')
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="faq mx-auto">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`faq-item border-bottom py-2 ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 faq-question">{item.question}</h5>
                <span className="faq-icon">
                  {activeIndex === index ? "×" : "+"}
                </span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>
                <p className="m-0">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
