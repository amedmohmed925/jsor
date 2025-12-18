import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// It's good practice to have your data in an array
const partnerImages = [
  { id: 1, src: '../assets/partener-1.png', alt: 'Partner 1' },
  { id: 2, src: '../assets/partener-2.png', alt: 'Partner 2' },
  { id: 3, src: '../assets/partener-3.png', alt: 'Partner 3' },
  { id: 4, src: '../assets/partener-4.png', alt: 'Partner 4' },
  { id: 5, src: '../assets/partener-5.png', alt: 'Partner 5' },
  { id: 6, src: '../assets/partener-1.png', alt: 'Partner 1' },
  { id: 7, src: '../assets/partener-2.png', alt: 'Partner 2' },
  { id: 8, src: '../assets/partener-3.png', alt: 'Partner 3' },
  { id: 9, src: '../assets/partener-4.png', alt: 'Partner 4' },
  { id: 10, src: '../assets/partener-5.png', alt: 'Partner 5' },
];

const Parteners = () => {
  return (
    <section>
        <div className="container my-5">
            <h2 className='parteners-title mb-3'>شركاء النجاح</h2>
            <p className='parteners-desc mb-5'>نجعل سلسلة الشحن من البداية إلى النهاية أكثر سهولة وسلاسة لك، مما يحول عملية الشحن المعقدة إلى تجربة أكثر انسيابية.</p>
        </div>
        
        {/* Use container-fluid for a full-width slider */}
        <div className="container-fluid mb-5">
            <Swiper
                // Install modules
                modules={[Navigation, Pagination, Autoplay]}
                // Slider configuration
                spaceBetween={30}
                slidesPerView={5} // Show 5 slides on desktop
                loop={true} // Enable infinite loop
                autoplay={{
                    delay: 2500, // Delay between transitions (in ms)
                    disableOnInteraction: false, // Continue autoplay after user interaction
                }}
                // Responsive breakpoints
                breakpoints={{
                    // when window width is >= 320px (mobile)
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // when window width is >= 640px (tablet)
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // when window width is >= 1024px (desktop)
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
                className="partners-swiper"
            >
                {partnerImages.map((image) => (
                    <SwiperSlide key={image.id}>
                        <div className="partner-slide">
                            <img src={image.src} alt={image.alt} className="img-fluid partners-img" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </section>
  )
}

export default Parteners;