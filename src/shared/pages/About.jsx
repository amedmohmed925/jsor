import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion as Motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCheckCircle, FaRocket, FaHandshake, FaBullseye } from 'react-icons/fa';

const About = () => {
  const { i18n } = useTranslation('common');
  const isEn = i18n.language === 'en';

  const stats = [
    { id: 1, label: isEn ? 'Support' : 'دعم فني', value: '24/7', icon: <FaClock className="text-primary fs-3" /> },
    { id: 2, label: isEn ? 'Secure' : 'أمان تام', value: '100%', icon: <FaCheckCircle className="text-success fs-3" /> },
    { id: 3, label: isEn ? 'Partners' : 'شركاء النجاح', value: '+50', icon: <FaHandshake className="text-warning fs-3" /> },
    { id: 4, label: isEn ? 'Service Area' : 'نطاق الخدمة', value: isEn ? 'KSA' : 'المملكة العربية السعودية', icon: <FaMapMarkerAlt className="text-danger fs-3" /> },
  ];

  return (
    <div className="about-page overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero py-5 bg-light position-relative" style={{ marginTop: '80px' }}>
        <div className="container py-lg-5">
          <div className="row align-items-center">
            <Motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, x: isEn ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h6 className="text-primary text-uppercase fw-bold mb-3">{isEn ? 'About Us' : 'من نحن'}</h6>
              <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                {isEn ? 'Building Bridges in Saudi Transport' : 'جسور: ريادة النقل والخدمات اللوجستية'}
              </h1>
              <p className="lead text-muted mb-4 lh-base">
                {isEn 
                  ? "At Josor, we're dedicated to transforming the logistics landscape in Saudi Arabia. Our platform connects clients with professional drivers to ensure safe, timely, and efficient transport of goods across the Kingdom."
                  : "جسور هي المنصة الرائدة التي تسعى لتغيير شكل الخدمات اللوجستية في المملكة العربية السعودية. نحن نربط العملاء بأفضل السائقين المهنيين لضمان نقل آمن وفعال وسريع للبضائع في كافة أنحاء المملكة."}
              </p>
              <p className="text-muted mb-5">
                {isEn
                  ? "Your investment in original spare parts is a long term successful investment. We believe in quality and trust, providing solutions that empower the national economy."
                  : "استثمارك في قطع الغيار الأصلية هو استثمار ناجح على المدى الطويل. نحن نؤمن بالجودة والثقة، ونقدم حلولاً تساهم في نمو الاقتصاد الوطني."}
              </p>
            </Motion.div>
            
            <Motion.div 
              className="col-lg-6 mt-5 mt-lg-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                  alt="Logistics" 
                  className="img-fluid rounded-4 shadow-lg"
                />
                <div className="position-absolute bottom-0 start-0 p-4 bg-white rounded-4 shadow-sm m-3 d-none d-md-block border-start border-5 border-primary">
                  <h5 className="mb-1 fw-bold">100%</h5>
                  <small className="text-muted">{isEn ? 'Reliable Service' : 'خدمة موثوقة'}</small>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-white shadow-sm position-relative" style={{ zIndex: 2, marginTop: '-50px', transform: 'translateY(10px)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {stats.map((stat) => (
              <Motion.div 
                key={stat.id} 
                className="col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.id * 0.1 }}
              >
                <div className="p-4 rounded-4 bg-light h-100 border border-transparent hover-shadow transition">
                  <div className="mb-3">{stat.icon}</div>
                  <h3 className="fw-bold mb-1">{stat.value}</h3>
                  <small className="text-muted fw-bold">{stat.label}</small>
                </div>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-5 bg-light overflow-hidden">
        <div className="container py-lg-5">
          <div className="text-center mb-5 pb-3">
             <h2 className="fw-bold fs-1 mb-3">{isEn ? 'Our Philosophy' : 'فلسفتنا'}</h2>
             <div className="mx-auto bg-primary rounded-pill mb-4" style={{ width: '80px', height: '4px' }}></div>
          </div>
          
          <div className="row g-4">
            <Motion.div 
              className="col-lg-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm text-center">
                <div className="icon-box bg-primary-subtle text-primary rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <FaRocket className="fs-3" />
                </div>
                <h4 className="fw-bold mb-3">{isEn ? 'Our Mission' : 'رسالتنا'}</h4>
                <p className="text-muted mb-0">
                  {isEn 
                    ? "To simplify shipping and transport processes through digital innovation, saving time and resources for businesses across Saudi Arabia."
                    : "تبسيط عمليات الشحن والنقل من خلال الابتكار الرقمي، وتوفير الوقت والموارد للشركات والأفراد في كافة أنحاء المملكة."}
                </p>
              </div>
            </Motion.div>

            <Motion.div 
              className="col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm text-center bg-primary text-white scale-up">
                <div className="icon-box bg-white text-primary rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <FaBullseye className="fs-3" />
                </div>
                <h4 className="fw-bold mb-3">{isEn ? 'Our Vision' : 'رؤيتنا'}</h4>
                <p className="opacity-90 mb-0">
                  {isEn 
                    ? "To be the primary logistical backbone for Saudi 2030 vision, establishing Josor as the first name in reliable transport."
                    : "أن نكون الركيزة اللوجستية الأساسية لرؤية المملكة 2030، وترسيخ اسم جسور كأول وجهة للنقل الموثوق."}
                </p>
              </div>
            </Motion.div>

            <Motion.div 
              className="col-lg-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm text-center">
                <div className="icon-box bg-success-subtle text-success rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <FaHandshake className="fs-3" />
                </div>
                <h4 className="fw-bold mb-3">{isEn ? 'Our Values' : 'قيمنا'}</h4>
                <p className="text-muted mb-0">
                  {isEn 
                    ? "Integrity, Transparency, and Commitment. We value the safety of your goods and the professional growth of our partners."
                    : "النزاهة، الشفافية، والالتزام. نحن نقدر سلامة بضائعكم والنمو المهني لشركائنا في النجاح."}
                </p>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="py-5 bg-white">
        <div className="container py-lg-4">
          <div className="bg-dark text-white rounded-5 p-5 shadow-lg overflow-hidden position-relative">
             <div className="row align-items-center z-index-1 position-relative">
                <div className="col-lg-8 text-center text-lg-start mb-4 mb-lg-0">
                  <h2 className="fw-bold display-6 mb-3">{isEn ? 'Have any questions?' : 'هل لديك أي استفسار؟'}</h2>
                  <p className="lead opacity-75">{isEn ? 'Our customer service team is ready to help you 24/7' : 'فريق خدمة العملاء لدينا جاهز للرد على جميع استفساراتكم واقتراحاتكم على مدار الساعة'}</p>
                </div>
                <div className="col-lg-4 text-center">
                   <a href="/contact" className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold hover-scale shadow">
                      {isEn ? 'Connect Us' : 'تواصل معنا'}
                   </a>
                </div>
             </div>
             {/* Decorative Background Circles */}
             <div className="position-absolute top-0 end-0 p-5 bg-primary opacity-25 rounded-circle" style={{ width: '400px', height: '400px', transform: 'translate(100px, -100px)' }}></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
