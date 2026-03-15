import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faUser, faTruck, faInfoCircle, faImages, faMapMarkerAlt, faHistory, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import { useGetCompanyOrdersMutation } from '../../api/admin/adminApi';
import { useGetListsQuery } from '../../api/site/siteApi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper: get date range for period filters
const getDateRange = (period) => {
  const now = new Date();
  let dateFrom, dateTo;
  const fmt = (d) => d.toISOString().split('T')[0];

  switch (period) {
    case 'this_month':
      dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
      dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case 'last_month':
      dateFrom = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      dateTo = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case 'last_3_months':
      dateFrom = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case 'last_6_months':
      dateFrom = new Date(now.getFullYear(), now.getMonth() - 6, 1);
      dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case 'this_year':
      dateFrom = new Date(now.getFullYear(), 0, 1);
      dateTo = new Date(now.getFullYear(), 11, 31);
      break;
    case 'all':
    default:
      return { date_from: '', date_to: '' };
  }
  return { date_from: fmt(dateFrom), date_to: fmt(dateTo) };
};

const OrderDetailsModal = ({ order, isOpen, onClose, isRtl, getStatusClass, getStatusName, t }) => {
  if (!order || !isOpen) return null;

  const getFullAddress = (item) => {
    const stops = [];
    if (item.address_from) stops.push(item.address_from);
    for (let i = 1; i <= 5; i++) {
      if (item[`address_to${i}`]) {
        stops.push(item[`address_to${i}`]);
      }
    }
    return stops;
  };

  const addresses = getFullAddress(order);

  const resolveImageSrc = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value.avatar || value.img || value.image || value.image_url || value.profile_image || '';
  };

  const driverAvatar = resolveImageSrc(order.driver_id);
  const userAvatar = resolveImageSrc(order.user_id);

  return (
    <div className={`modal fade show d-block`} style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
          {/* Header */}
          <div className="modal-header border-bottom-0 p-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 p-2 rounded-3 text-primary">
                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
              </div>
              <h5 className="modal-title fw-bold m-0 text-dark">
                {t('admin:tripHistory.tripDetails')} #{String(order.id).padStart(3, '0')}
              </h5>
            </div>
            <button 
              type="button" 
              className="btn-close shadow-none m-0" 
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Trip Lifecycle & Status */}
              <div className="col-12">
                <div className="p-3 bg-light dark-bg-light rounded-3 d-flex justify-content-between align-items-center border border-light-subtle">
                  <div className="d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faHistory} className="text-secondary" />
                    <span className="fw-medium text-dark">{t('admin:tripHistory.status')}:</span>
                    <span className={`status-badge ${getStatusClass(order.status)} ms-1`}>
                      {getStatusName(order.status)}
                    </span>
                  </div>
                  {order.created_at && (
                    <div className="text-muted small">
                      <span className="me-1">{order.created_at}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Route & Locations */}
              <div className="col-md-7">
                <div className="card h-100 border-0 shadow-sm bg-white dark-bg-card" style={{ borderRadius: '12px' }}>
                  <div className="card-header bg-transparent border-0 p-3 pb-0">
                    <h6 className="fw-bold m-0 d-flex align-items-center gap-2 text-dark">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
                      {t('admin:tripHistory.routeDetails')}
                    </h6>
                  </div>
                  <div className="card-body p-3">
                    <div className="position-relative ps-2">
                       {/* Connection Line */}
                       <div className="position-absolute h-100 border-start border-2 border-dashed border-light-subtle" 
                            style={{ 
                              left: isRtl ? 'auto' : '15px', 
                              right: isRtl ? '15px' : 'auto', 
                              top: '10px', 
                              bottom: '10px',
                              zIndex: 0
                            }}>
                       </div>

                       {/* Points */}
                       <div className="d-flex flex-column gap-4">
                          {/* Pickup */}
                          <div className="d-flex gap-3 position-relative" style={{ zIndex: 1 }}>
                            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" 
                                 style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                <FontAwesomeIcon icon={faCircle} className="text-white" style={{ fontSize: '8px' }} />
                            </div>
                            <div>
                              <p className="small text-muted mb-0">{t('admin:tripHistory.pickup')}</p>
                              <p className="fw-semibold text-dark mb-0">{order.address_from || order.city_from}</p>
                            </div>
                          </div>

                          {/* Destinations */}
                          {addresses.slice(1).map((addr, idx) => (
                            <div key={idx} className="d-flex gap-3 position-relative" style={{ zIndex: 1 }}>
                              <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" 
                                   style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                  <FontAwesomeIcon icon={faCircle} className="text-white" style={{ fontSize: '8px' }} />
                              </div>
                              <div>
                                <p className="small text-muted mb-0">{t('admin:tripHistory.delivery')} {idx + 1}</p>
                                <p className="fw-semibold text-dark mb-0">{addr}</p>
                              </div>
                            </div>
                          ))}

                          {/* If no addresses, fallback to city_to */}
                          {addresses.length <= 1 && order.city_to && (
                            <div className="d-flex gap-3 position-relative" style={{ zIndex: 1 }}>
                                <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" 
                                    style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                    <FontAwesomeIcon icon={faCircle} className="text-white" style={{ fontSize: '8px' }} />
                                </div>
                                <div>
                                    <p className="small text-muted mb-0">{t('admin:tripHistory.delivery')}</p>
                                    <p className="fw-semibold text-dark mb-0">{order.city_to}</p>
                                </div>
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stakeholders (User & Driver) */}
              <div className="col-md-5">
                <div className="d-flex flex-column gap-3">
                  {/* Driver Info */}
                  <div className="card border-0 shadow-sm bg-white dark-bg-card" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-3">
                      <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                        <FontAwesomeIcon icon={faTruck} className="text-primary" />
                        {t('admin:tripHistory.driverInfo')}
                      </h6>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle overflow-hidden bg-light dark-bg-light d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px', minWidth: '55px' }}>
                          {driverAvatar ? (
                            <img
                              src={driverAvatar}
                              alt="Driver"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/assets/driver-avatar.png';
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUser} className="text-secondary" size="lg" />
                          )}
                        </div>
                        <div>
                          <p className="fw-bold mb-0 text-dark">{order.driver_id?.name || '-'}</p>
                          <p className="small text-muted mb-0">{order.driver_id?.phone || '-'}</p>
                          <p className="small text-primary mb-0 fw-medium">
                            {order.sub_truck_id?.name || order.truck_id?.name || '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="card border-0 shadow-sm bg-white dark-bg-card" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-3">
                      <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                        <FontAwesomeIcon icon={faUser} className="text-primary" />
                        {t('admin:tripHistory.UserInfo')}
                      </h6>
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle overflow-hidden bg-light dark-bg-light d-flex align-items-center justify-content-center" style={{ width: '55px', height: '55px', minWidth: '55px' }}>
                          {userAvatar ? (
                            <img
                              src={userAvatar}
                              alt="User"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/assets/user-avatar.png';
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon icon={faUser} className="text-secondary" size="lg" />
                          )}
                        </div>
                        <div>
                          <p className="fw-bold mb-0 text-dark">{order.user_id?.name || '-'}</p>
                          <p className="small text-muted mb-0">{order.user_id?.phone || '-'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Info */}
                  <div className="card border-0 shadow-sm bg-white dark-bg-card" style={{ borderRadius: '12px' }}>
                    <div className="card-body p-3">
                      <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
                        {t('admin:tripHistory.financials')}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">{t('admin:tripHistory.income')}:</span>
                        <span className="fw-bold text-success">{order.good_price || '0'} {t('admin:tripHistory.currency')}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">{t('admin:tripHistory.driverPrice')}:</span>
                        <span className="fw-bold text-primary">{order.driver_price || '0'} {t('admin:tripHistory.currency')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="col-12">
                <div className="card border-0 shadow-sm bg-white dark-bg-card" style={{ borderRadius: '12px' }}>
                  <div className="card-header bg-transparent border-0 p-3 pb-0">
                    <h6 className="fw-bold m-0 d-flex align-items-center gap-2 text-dark">
                      <FontAwesomeIcon icon={faImages} className="text-primary" />
                      {t('admin:tripHistory.tripPhotos')}
                    </h6>
                  </div>
                  <div className="card-body p-3">
                    <div className="row g-3">
                      {/* Photos Before */}
                      <div className="col-md-6">
                        <p className="small fw-bold text-muted mb-2 ps-2 border-start border-3 border-success">
                          {t('admin:tripHistory.photosBefore')}
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          {order.requestImageBefore?.length > 0 ? (
                            order.requestImageBefore.map((img, idx) => {
                              const imgSrc = typeof img === 'string' ? img : (img.img || img.image || img.image_url);
                              return imgSrc ? (
                                <a key={idx} href={imgSrc} target="_blank" rel="noreferrer">
                                  <img src={imgSrc} alt="Before" className="rounded-3 border border-light-subtle" 
                                       style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                </a>
                              ) : null;
                            })
                          ) : (
                            <p className="text-muted small ps-2">{t('admin:tripHistory.noPhotos')}</p>
                          )}
                        </div>
                      </div>
                      {/* Photos After */}
                      <div className="col-md-6">
                        <p className="small fw-bold text-muted mb-2 ps-2 border-start border-3 border-danger">
                          {t('admin:tripHistory.photosAfter')}
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          {order.requestImageAfter?.length > 0 ? (
                            order.requestImageAfter.map((img, idx) => {
                              const imgSrc = typeof img === 'string' ? img : (img.img || img.image || img.image_url);
                              return imgSrc ? (
                                <a key={idx} href={imgSrc} target="_blank" rel="noreferrer">
                                  <img src={imgSrc} alt="After" className="rounded-3 border border-light-subtle" 
                                       style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                </a>
                              ) : null;
                            })
                          ) : (
                            <p className="text-muted small ps-2">{t('admin:tripHistory.noPhotos')}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer border-top-0 p-3">
            <button type="button" className="btn btn-light px-4 fw-medium" onClick={onClose} style={{ borderRadius: '8px' }}>
              {t('common:buttons.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TripHistoryComponent = () => {
  const { t, i18n } = useTranslation(['admin', 'common']);
  const isRtl = i18n.language === 'ar';

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  // Filters state
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [periodFilter, setPeriodFilter] = useState('this_month');
  const [searchTerm, setSearchTerm] = useState('');

  // API hooks
  const { data: listsData } = useGetListsQuery();
  const [getCompanyOrders, { data: ordersResponse, isLoading, isError }] = useGetCompanyOrdersMutation();

  // Extract lists
  const statusList = listsData?.Status || [];
  const requestTypes = listsData?.RequestType || {};

  // Build body filters and fetch data
  const fetchOrders = useCallback(() => {
    const { date_from, date_to } = getDateRange(periodFilter);
    const body = {};
    if (typeFilter) body.type = typeFilter;
    if (statusFilter !== '') body.status = statusFilter;
    if (date_from) body.date_from = date_from;
    if (date_to) body.date_to = date_to;
    getCompanyOrders(body);
  }, [typeFilter, statusFilter, periodFilter, getCompanyOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Extract orders data
  const ordersData = useMemo(() => ordersResponse?.data?.[0] || {}, [ordersResponse]);
  const allItems = useMemo(() => ordersData?.items || [], [ordersData]);
  const meta = useMemo(() => ordersData?._meta || {}, [ordersData]);

  // Frontend text search filter
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return allItems;
    const term = searchTerm.toLowerCase();
    return allItems.filter((item) => {
      const tripId = ('#TR' + String(item.id).padStart(3, '0')).toLowerCase();
      const vehicleName = (item.sub_truck_id?.name || item.truck_id?.name || '').toLowerCase();
      const driverName = (item.driver_id?.name || '').toLowerCase();
      const userName = (item.user_id?.name || '').toLowerCase();
      const cityFrom = (item.city_from || '').toLowerCase();
      const cityTo = (item.city_to || '').toLowerCase();
      return (
        tripId.includes(term) ||
        vehicleName.includes(term) ||
        driverName.includes(term) ||
        userName.includes(term) ||
        cityFrom.includes(term) ||
        cityTo.includes(term)
      );
    });
  }, [allItems, searchTerm]);

  // Stats calculations
  const totalTrips = meta?.count || filteredItems.length;
  const totalRevenue = useMemo(() => {
    const sum = meta?.sumofprice;
    if (sum) return parseFloat(sum);
    return filteredItems.reduce((acc, item) => acc + (item.good_price || 0), 0);
  }, [filteredItems, meta]);

  const totalExpenses = useMemo(() => {
    return filteredItems.reduce((acc, item) => acc + (item.driver_price || 0), 0);
  }, [filteredItems]);

  const netProfit = totalRevenue - totalExpenses;

  // Status helpers
  const getStatusName = (statusId) => {
    const found = statusList.find((s) => s.id === statusId);
    if (found) return isRtl ? found.name : found.name_en;
    return statusId;
  };

  const getStatusClass = (statusId) => {
    switch (statusId) {
      case 0: return 'charging-badge'; // new
      case 1: return 'charging-badge'; // in shipping
      case 2: return 'shipped-badge';  // complete
      case 3: return 'canceled-badge'; // canceled
      case 4: return 'canceled-badge'; // rejected
      default: return 'charging-badge';
    }
  };

  // Type helper
  const getTypeName = (typeId) => {
    return requestTypes[String(typeId)] || typeId;
  };

  // Location display - show city name only, fallback to N/A
  const getLocationFrom = (item) => {
    if (item.city_from) return item.city_from;
    return isRtl ? '\u063A\u064A\u0631 \u0645\u062D\u062F\u062F' : 'N/A';
  };

  const getLocationTo = (item) => {
    if (item.city_to) return item.city_to;
    return isRtl ? '\u063A\u064A\u0631 \u0645\u062D\u062F\u062F' : 'N/A';
  };

  // Period filter options
  const periodOptions = [
    { value: 'this_month', label: t('admin:tripHistory.thisMonth') },
    { value: 'last_month', label: t('admin:tripHistory.lastMonth') },
    { value: 'last_3_months', label: t('admin:tripHistory.last3Months') },
    { value: 'last_6_months', label: t('admin:tripHistory.last6Months') },
    { value: 'this_year', label: t('admin:tripHistory.thisYear') },
    { value: 'all', label: t('admin:tripHistory.allTime') },
  ];

  // PDF Download State
  const [isDownloading, setIsDownloading] = useState(false);

  // PDF Download — render HTML off-screen so the browser handles Arabic shaping natively,
  // then snapshot with html2canvas and embed in jsPDF.
  const handleDownloadReport = async () => {
    setIsDownloading(true);
    const lang   = i18n.language;
    const rtl    = lang === 'ar';
    const locale = rtl ? 'ar-SA' : 'en-US';
    const tPdf   = i18n.getFixedT(lang, 'admin');          // current UI language
    const cur    = tPdf('tripHistory.currency');
    const date   = new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    const dir    = rtl ? 'rtl' : 'ltr';

    // ── Build table rows HTML ─────────────────────────────────────────────────
    const rowsHtml = filteredItems.map((item, idx) => {
      const bg = idx % 2 === 0 ? '#ffffff' : '#f5f7fa';
      const vehicleName = item.sub_truck_id?.name || item.truck_id?.name || '-';
      const driverName  = item.driver_id?.name || '-';
      const route       = getLocationFrom(item) + ' → ' + getLocationTo(item);
      const status      = getStatusName(item.status);
      const type        = getTypeName(item.type?.id);
      const tripId      = '#TR' + String(item.id).padStart(3, '0');
      const income      = (item.driver_price || 0) + ' ' + cur;
      const cells = rtl
        ? [type, item.date || '-', income, status, route, driverName, vehicleName, tripId]
        : [tripId, vehicleName, driverName, route, status, income, item.date || '-', type];
      return `<tr style="background:${bg}">${cells.map(c => `<td style="padding:7px 6px;text-align:center;border:1px solid #dee2e6">${c}</td>`).join('')}</tr>`;
    }).join('');

    // ── Stats ─────────────────────────────────────────────────────────────────
    const stats = [
      { label: tPdf('tripHistory.totalTrips'),    value: totalTrips },
      { label: tPdf('tripHistory.totalRevenue'),  value: totalRevenue  + ' ' + cur },
      { label: tPdf('tripHistory.totalExpenses'), value: totalExpenses + ' ' + cur },
      { label: tPdf('tripHistory.netProfit'),     value: netProfit     + ' ' + cur },
    ];
    const statsHtml = stats.map(s => `
      <div style="flex:1;background:#f0f4ff;border-radius:8px;padding:10px 14px;margin:0 6px;text-align:center">
        <div style="font-size:11px;color:#6c757d;margin-bottom:4px">${s.label}</div>
        <div style="font-size:15px;font-weight:700;color:#2563eb">${s.value}</div>
      </div>`).join('');

    // ── Headers (reversed for RTL so columns match row order) ────────────────
    const headerKeys = rtl
      ? ['type','date','income','status','route','driver','vehicle','tripId']
      : ['tripId','vehicle','driver','route','status','income','date','type'];
    const headersHtml = headerKeys.map(k =>
      `<th style="padding:8px 6px;text-align:center;border:1px solid #1d4ed8;font-weight:600;white-space:nowrap">${tPdf('tripHistory.' + k)}</th>`
    ).join('');

    // ── Full HTML document ───────────────────────────────────────────────────
    const html = `
      <div id="pdf-report" style="
        width:1060px; padding:32px 36px; background:#fff; direction:${dir};
        font-family:'Cairo',Arial,sans-serif; font-size:13px; color:#212529;
        box-sizing:border-box;
      ">
        <!-- Header -->
        <div style="text-align:center;margin-bottom:6px">
          <div style="font-size:22px;font-weight:700;color:#1e3a5f">${tPdf('tripHistory.reportTitle')}</div>
          <div style="font-size:11px;color:#6c757d;margin-top:4px">${tPdf('tripHistory.generatedAt')}: ${date}</div>
        </div>
        <hr style="border:none;border-top:2px solid #2563eb;margin:12px 0"/>

        <!-- Stats -->
        <div style="display:flex;margin-bottom:18px;direction:ltr">${statsHtml}</div>

        <!-- Table -->
        <table style="width:100%;border-collapse:collapse;font-size:12px;direction:${dir}">
          <thead>
            <tr style="background:#2563eb;color:#fff">${headersHtml}</tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <!-- Footer -->
        <div style="margin-top:14px;font-size:10px;color:#adb5bd;text-align:center;direction:ltr">
          Josur Logistics Platform — Trip History Report
        </div>
      </div>`;

    // ── Mount off-screen, capture, clean up ──────────────────────────────────
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;left:-9999px;top:0;z-index:-1';
    wrapper.innerHTML = html;
    // Inherit global <style> for the Cairo web-font already loaded on the page
    document.body.appendChild(wrapper);

    // Small delay to let fonts paint
    await new Promise(r => setTimeout(r, 300));

    try {
      const el = wrapper.querySelector('#pdf-report');
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });

      const imgData  = canvas.toDataURL('image/png');
      const pdfW     = 297;   // A4 landscape width mm
      const pdfH     = 210;   // A4 landscape height mm
      const margin   = 8;
      const maxW     = pdfW - margin * 2;
      const maxH     = pdfH - margin * 2;
      const ratio    = canvas.width / canvas.height;
      let w = maxW;
      let h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }

      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      doc.addImage(imgData, 'PNG', margin + (maxW - w) / 2, margin, w, h);
      doc.save('trip-history-report-' + new Date().toISOString().split('T')[0] + '.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
    } finally {
      document.body.removeChild(wrapper);
      setIsDownloading(false);
    }
  };

  return (
    <div className="trip-history-content mt-2">
      <div className="shadow p-2 rounded-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="orders-title m-0">{t('admin:tripHistory.title')}</h4>
            <p className='user-desc m-0 mt-1'>{t('admin:tripHistory.subtitle')}</p>
          </div>
          <button
            type='button'
            className="login-button text-decoration-none d-flex align-items-center gap-2 justify-content-center take-img-btn"
            onClick={handleDownloadReport}
            disabled={isLoading || isDownloading || filteredItems.length === 0}
          > 
            {isDownloading ? (
               <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> {isRtl ? 'جاري التحميل...' : 'Downloading...'}</>
            ) : (
               <><img src="/assets/document-download.svg" alt="download" /> {t('admin:tripHistory.downloadReport')}</>
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="row">
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="p-2 border rounded-3 h-100">
              <p className='user-desc m-0'>{t('admin:tripHistory.totalTrips')}</p>
              <h4 className="orders-title m-0 mt-2">{isLoading ? '...' : totalTrips}</h4>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="p-2 border rounded-3 h-100">
              <p className='user-desc m-0'>{t('admin:tripHistory.totalRevenue')}</p>
              <h4 className="total-earns m-0 mt-2">{isLoading ? '...' : totalRevenue + ' ' + t('admin:tripHistory.currency')}</h4>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="p-2 border rounded-3 h-100">
              <p className='user-desc m-0'>{t('admin:tripHistory.totalExpenses')}</p>
              <h4 className="total-expenses m-0 mt-2">{isLoading ? '...' : totalExpenses + ' ' + t('admin:tripHistory.currency')}</h4>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="p-2 border rounded-3 h-100">
              <p className='user-desc m-0'>{t('admin:tripHistory.netProfit')}</p>
              <h4 className="driver-card-price m-0 mt-2">{isLoading ? '...' : netProfit + ' ' + t('admin:tripHistory.currency')}</h4>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="row mt-3">
          {/* Search */}
          <div className="col-md-4 mb-2">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-input py-2"
                style={{ paddingRight: isRtl ? '35px' : '12px', paddingLeft: isRtl ? '12px' : '35px' }}
                placeholder={t('admin:tripHistory.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-input-icon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>

          {/* Type Filter */}
          <div className="col-md-2 mb-2">
            <div className="mb-3">
              <div className="select-wrapper position-relative">
                <select
                  className="form-select form-input py-2"
                  style={{ paddingInlineEnd: '2.2rem' }}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">{t('admin:tripHistory.allTypes')}</option>
                  {Object.entries(requestTypes).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
                <div className="select-icon position-absolute top-50 translate-middle-y pe-1" style={{ insetInlineEnd: 0, pointerEvents: 'none' }}>
                  <ExpandMoreIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-md-3 mb-2">
            <div className="mb-3">
              <div className="select-wrapper position-relative">
                <select
                  className="form-select form-input py-2"
                  style={{ paddingInlineEnd: '2.2rem' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">{t('admin:tripHistory.allStatuses')}</option>
                  {statusList.map((s) => (
                    <option key={s.id} value={s.id}>{isRtl ? s.name : s.name_en}</option>
                  ))}
                </select>
                <div className="select-icon position-absolute top-50 translate-middle-y pe-1" style={{ insetInlineEnd: 0, pointerEvents: 'none' }}>
                  <ExpandMoreIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Period Filter */}
          <div className="col-md-3 mb-2">
            <div className="mb-3">
              <div className="select-wrapper position-relative">
                <select
                  className="form-select form-input py-2"
                  style={{ paddingInlineEnd: '2.2rem' }}
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value)}
                >
                  {periodOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="select-icon position-absolute top-50 translate-middle-y pe-1" style={{ insetInlineEnd: 0, pointerEvents: 'none' }}>
                  <ExpandMoreIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t('admin:tripHistory.loading')}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {isError && !isLoading && (
          <div className="alert alert-danger mt-3 d-flex justify-content-between align-items-center">
            <span>{t('admin:tripHistory.error')}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={fetchOrders}>
              {t('admin:tripHistory.retry')}
            </button>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && (
  <div className="table-responsive border rounded-3 shadow-sm mb-4" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
    <table
      className="table table-hover align-middle mb-0 w-100"
      style={{
        minWidth: '800px',
        '--bs-table-bg': 'var(--card-bg)',
        '--bs-table-color': 'var(--text-primary)',
        '--bs-table-border-color': 'var(--border-color)',
        '--bs-table-hover-bg': 'var(--bg-hover)',
      }}
    >
      <thead className="table-light">
        <tr>
          {/* استخدمنا text-start لكي يتغير اتجاه النص تلقائياً مع لغة الموقع */}
          <th className="py-3 px-3 text-start text-nowrap">{t('admin:tripHistory.tripId')}</th>
          <th className="py-3 px-3 text-start">{t('admin:tripHistory.vehicle')}</th>
          <th className="py-3 px-3 text-start">{t('admin:tripHistory.driver')}</th>
          <th className="py-3 px-3 text-start">{t('admin:tripHistory.route')}</th>
          <th className="py-3 px-3 text-center text-nowrap">{t('admin:tripHistory.status')}</th>
          <th className="py-3 px-3 text-end text-nowrap">{t('admin:tripHistory.income')}</th>
        </tr>
      </thead>
      <tbody className="border-top-0">
        {filteredItems.length === 0 ? (
          <tr>
            <td colSpan="6" className="py-5 text-center text-muted">
              {t('admin:tripHistory.noTrips')}
            </td>
          </tr>
        ) : (
          filteredItems.map((item) => (
            <tr key={item.id} onClick={() => handleOpenModal(item)} style={{ cursor: 'pointer' }}>
              {/* رقم الرحلة */}
              <td className="p-3 text-start">
                <span className="fw-semibold text-secondary">
                  {'#TR' + String(item.id).padStart(3, '0')}
                </span>
              </td>

              {/* الشاحنة / المركبة (تم إزالة الكلاس المقيد للمساحة) */}
              <td className="p-3 text-start fw-medium text-dark">
                {item.sub_truck_id?.name || item.truck_id?.name || '-'}
                {/* ملاحظة: إذا كان الاسم يعتمد على اللغة من الـ API، يمكنك استخدام شيء مثل: item.truck_id?.[`name_${i18n.language}`] */}
              </td>

              {/* السائق */}
              <td className="p-3 text-start text-muted">
                {item.driver_id?.name || '-'}
              </td>

              {/* المسار */}
              <td className="p-3 text-start">
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex flex-column align-items-center">
                    <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#10b981' }} />
                    <div style={{ width: '2px', height: '15px', backgroundColor: '#e5e7eb', margin: '2px 0' }}></div>
                    <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#ef4444' }} />
                  </div>
                  <div className="d-flex flex-column justify-content-between small">
                    <span className="text-dark fw-medium mb-2">{getLocationFrom(item)}</span>
                    <span className="text-muted">{getLocationTo(item)}</span>
                  </div>
                </div>
              </td>

              {/* الحالة */}
              <td className="p-3 text-center">
                <span className={`status-badge ${getStatusClass(item.status)}`}>
                  {getStatusName(item.status)}
                </span>
              </td>

              {/* الدخل / التسعيرة */}
              <td className="p-3 text-end text-nowrap fw-bold text-dark">
                {item.driver_price || 0} <span className="small text-muted fw-normal mx-1">{t('admin:tripHistory.currency')}</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}
        {/* Render Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isRtl={isRtl}
          getStatusClass={getStatusClass}
          getStatusName={getStatusName}
          t={t}
        />
      </div>
    </div>
  );
};

export default TripHistoryComponent;
