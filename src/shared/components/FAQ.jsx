import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "كيف يمكنني التقدم؟",
      answer:
        "يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك."
    },
    {
      question: "ما هي فوائد العمل معك؟",
      answer:
      "يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك."
    },
    {
      question: "من يمكنه الانضمام إليكم؟",
      answer:
      "يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك."
    },
    {
      question: "اريد الانضمام كسائق؟",
      answer:
      "يمكنك التقدّم بسهولة من خلال تعبئة نموذج الطلب عبر الموقع أو التطبيق، ثم إرفاق المستندات المطلوبة مثل الهوية أو بيانات الشحنة، وبعد إرسال الطلب سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التفاصيل واستكمال الإجراءات. بمجرد الموافقة، نبدأ بتنفيذ الخدمة مباشرة وفق ما يناسب احتياجك."
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
              className={`faq-item border-bottom py-2 ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => toggleFAQ(index)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 faq-question">{item.question}</h5>
                <span className="faq-icon">
                  {activeIndex === index ? "×" : "+"}
                </span>
              </div>
              <div
                className={`faq-answer ${
                  activeIndex === index ? "show" : ""
                }`}
              >
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
