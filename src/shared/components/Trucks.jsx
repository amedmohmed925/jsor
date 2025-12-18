import React, { useState } from 'react';

// We'll create a data structure to hold all truck information. This makes the code cleaner and easier to manage.
const truckTypes = [
  {
    id: 1,
    title: 'لوري',
    filterCardImage: '../assets/filter-card-img.png',
    itemImage: '../assets/filter-card-item-img.png',
    items: [
      { badgeImage: '../assets/filter-badge-img-1.png', text: 'لوري ثلاجة مبرد ( 8 طن) الحجم یصل إلى 6.5 متر' },
      { badgeImage: '../assets/filter-badge-img-2.png', text: 'لوري جوانب (8 طن)  الحجم یصل إلى 6.5 متر' },
      { badgeImage: '../assets/filter-badge-img-3.png', text: 'لوري بونش (5 طن) الحجم یصل إلى 6.5 متر' },
    ]
  },
  {
    id: 2,
    title: 'تريلا',
    filterCardImage: '../assets/filter-card-img-1.png',
    itemImage: '../assets/filter-card-item-img.png',
    items: [
      { badgeImage: '../assets/filter-badge-img-1.png', text: 'تريلا ثلاجة مبرد ( 15 طن) الحجم یصل إلى 13 متر' },
      { badgeImage: '../assets/filter-badge-img-2.png', text: 'تريلا جوانب (15 طن)  الحجم یصل إلى 13 متر' },
      { badgeImage: '../assets/filter-badge-img-3.png', text: 'تريلا بونش (12 طن) الحجم یصل إلى 13 متر' },
    ]
  },
  {
    id: 3,
    title: 'سقس',
    filterCardImage: '../assets/filter-card-img-2.png',
    itemImage: '../assets/filter-card-item-img.png',
    items: [
      { badgeImage: '../assets/filter-badge-img-1.png', text: 'سقس ثلاجة مبرد ( 4 طن) الحجم یصل إلى 4 متر' },
      { badgeImage: '../assets/filter-badge-img-2.png', text: 'سقس جوانب (4 طن)  الحجم یصل إلى 4 متر' },
      { badgeImage: '../assets/filter-badge-img-3.png', text: 'سقس بونش (3 طن) الحجم یصل إلى 4 متر' },
    ]
  },
  {
    id: 4,
    title: 'دينا',
    filterCardImage: '../assets/filter-card-img-3.png',
    itemImage: '../assets/filter-card-item-img.png',
    items: [
      { badgeImage: '../assets/filter-badge-img-1.png', text: 'دينا ثلاجة مبرد ( 2 طن) الحجم یصل إلى 3 متر' },
      { badgeImage: '../assets/filter-badge-img-2.png', text: 'دينا جوانب (2 طن)  الحجم یصل إلى 3 متر' },
      { badgeImage: '../assets/filter-badge-img-3.png', text: 'دينا بونش (1.5 طن) الحجم یصل إلى 3 متر' },
    ]
  }
];

const Trucks = () => {
  // 1. State to track the active filter. We initialize it to 1 to show the first item by default.
  const [activeFilter, setActiveFilter] = useState(1);

  // 2. Handler function to update the state when a card is clicked.
  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  return (
    <section className='my-5'>
      <div className="container">
        <h2 className="section-title text-center">انواع الشاحنات</h2>
        <p className="section-desc text-center">اختر نوع الشاحنة المناسب حسب طبيعة واحتياج شحنتك. نوفر شاحنات متعددة بتصنيفات مختلفة لضمان التوصيل الأمثل.</p>
        
        {/* 3. Dynamically render the filter cards */}
        <div className="row">
          {truckTypes.map((type) => (
            <div className="col-lg-3 col-md-6 mt-3" key={type.id}>
              <div 
                // 4. Conditionally apply the 'active' class
                className={`trucks-filter-card d-flex justify-content-between align-items-center w-100 ${activeFilter === type.id ? 'active' : ''}`}
                // 5. Add the onClick handler
                onClick={() => handleFilterClick(type.id)}
                style={{ cursor: 'pointer' }} // Add a pointer cursor to indicate it's clickable
              >
                <h3 className='trucks-filter-title m-0'>{type.title}</h3>
                <img src={type.filterCardImage} className='filter-card-img' alt={`${type.title} truck`} />
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 mt-4">
          <div className="filter-item-container">
            {/* 6. Dynamically render the filter items */}
            {truckTypes.map((type) => (
              <div 
                key={type.id}
                // 7. Conditionally hide items that are not active
                className={`filter-item-${type.id} d-flex justify-content-center justify-content-md-between align-items-center flex-wrap flex-md-nowrap w-100 ${activeFilter !== type.id ? 'd-none' : ''}`}
              >
                <img src={type.itemImage} className='filter-card-item-img img-fluid mb-3 mb-md-0' alt={`${type.title} details`} />
                <div>
                  {type.items.map((item, index) => (
                    <div key={index} className="filter-badge d-flex gap-2 align-items-center  mb-3">
                      <img src={item.badgeImage} className='filter-badge-img' alt="badge" />
                      <h4 className='filter-badge-text m-0'>{item.text}</h4>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Trucks;