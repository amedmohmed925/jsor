import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion as Motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaRocket, FaHandshake, FaBullseye, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';
import { useGetHomeDataQuery } from '../../api/site/siteApi';
import LoadingSpinner from '../../components/LoadingSpinner';

const About = () => {
  const { i18n } = useTranslation('common');
  const isEn = i18n.language === 'en';
  const { data: homeData, isLoading } = useGetHomeDataQuery();

  if (isLoading) return <LoadingSpinner fullPage />;

  const aboutData = homeData?.About || [];
  
  // Main about section (ID 2)
  const mainAbout = aboutData.find(item => item.id === 2);
  
  // Stats mapping
  const statsMapping = [
    { id: 102, icon: <FaClock className="text-primary fs-3" /> },
    { id: 103, icon: <FaShieldAlt className="text-success fs-3" /> },
    { id: 104, icon: <FaHandshake className="text-warning fs-3" /> },
    { id: 105, icon: <FaMapMarkerAlt className="text-danger fs-3" /> },
  ];

  const stats = aboutData
    .filter(item => [102, 103, 104, 105].includes(item.id))
    .map(item => ({
      id: item.id,
      label: isEn ? item.title_en : item.title,
      value: isEn ? item.content_en : item.content,
      icon: statsMapping.find(m => m.id === item.id)?.icon || <FaInfoCircle className="text-primary fs-3" />
    }));

  // Philosophy mapping
  const philosophyItems = [
    { id: 106, icon: <FaRocket className="fs-3" />, color: 'primary' },
    { id: 107, icon: <FaBullseye className="fs-3" />, color: 'primary', featured: true },
    { id: 108, icon: <FaHandshake className="fs-3" />, color: 'success' }
  ].map(p => {
    const item = aboutData.find(ai => ai.id === p.id);
    return item ? {
      ...p,
      title: isEn ? item.title_en : item.title,
      content: isEn ? item.content_en : item.content
    } : null;
  }).filter(Boolean);

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
                {isEn ? (mainAbout?.title_en || 'About Jusoor') : (mainAbout?.title || 'عن جسور')}
              </h1>
              <div className="lead text-muted mb-4 lh-base">
                {isEn ? mainAbout?.content_en : mainAbout?.content}
              </div>
            </Motion.div>
            
            <Motion.div 
              className="col-lg-6 mt-5 mt-lg-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="position-relative">
                <img 
                  src={mainAbout?.image || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"} 
                  alt="Logistics" 
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
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
      {stats.length > 0 && (
        <section className="py-5 bg-white shadow-sm position-relative" style={{ zIndex: 2, marginTop: '-50px', transform: 'translateY(10px)' }}>
          <div className="container">
            <div className="row g-4 text-center">
              {stats.map((stat, index) => (
                <Motion.div 
                  key={stat.id} 
                  className="col-md-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-4 rounded-4 bg-light h-100 border border-transparent hover-shadow transition">
                    <div className="mb-3">{stat.icon}</div>
                    <h3 className="fw-bold mb-1">{stat.label}</h3>
                    <small className="text-muted fw-bold">{stat.value}</small>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Philosophy Section */}
      {philosophyItems.length > 0 && (
        <section className="py-5 bg-light overflow-hidden">
          <div className="container py-lg-5">
            <div className="text-center mb-5 pb-3">
               <h2 className="fw-bold fs-1 mb-3">{isEn ? 'Our Philosophy' : 'فلسفتنا'}</h2>
               <div className="mx-auto bg-primary rounded-pill mb-4" style={{ width: '80px', height: '4px' }}></div>
            </div>
            
            <div className="row g-4">
              {philosophyItems.map((item, index) => (
                <Motion.div 
                  key={item.id}
                  className="col-lg-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`card h-100 border-0 rounded-4 p-4 shadow-sm text-center ${item.featured ? 'bg-primary text-white scale-up' : ''}`}>
                    <div className={`icon-box ${item.featured ? 'bg-white text-primary' : `bg-${item.color}-subtle text-${item.color}`} rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                      {item.icon}
                    </div>
                    <h4 className="fw-bold mb-3">{item.title}</h4>
                    <div className={`${item.featured ? 'opacity-90' : 'text-muted'} mb-0`} style={{ whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
             <div className="position-absolute top-0 end-0 p-5 bg-primary opacity-25 rounded-circle" style={{ width: '400px', height: '400px', transform: 'translate(100px, -100px)' }}></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

    