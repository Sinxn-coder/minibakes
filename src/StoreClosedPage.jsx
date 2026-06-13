import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Star } from 'lucide-react';
import { supabase } from './supabase';
import ContactPage from './ContactPage';
import logo from './assets/mini_logo.webp';
import './App.css'; // Reuse App styles
import './MenuPage.css'; // Reuse Menu styles for category chips

export default function StoreClosedPage({ storeAvailability, clientReviews, storeSettings, founderImg, FacebookIcon, bg1 }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenClosedPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem('hasSeenClosedPopup', 'true');
    }
  }, []);

  const isDailyPause = storeAvailability?.is_taking_orders_today === false;
  
  const message = isDailyPause 
    ? (storeAvailability?.daily_pause_message || "We are not taking any more orders today.")
    : (storeAvailability?.vacation_message || "We are currently closed.");

  const titleText = isDailyPause 
    ? "Paused for Today"
    : `Closed from ${storeAvailability?.vacation_start_date} to ${storeAvailability?.vacation_end_date}`;

  const reviewsGridRef = useRef(null);

  useEffect(() => {
    const grid = reviewsGridRef.current;
    if (!grid) return;

    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    grid.addEventListener('mouseenter', handleMouseEnter);
    grid.addEventListener('mouseleave', handleMouseLeave);
    grid.addEventListener('touchstart', handleMouseEnter, { passive: true });
    grid.addEventListener('touchend', handleMouseLeave, { passive: true });

    let animationFrameId;
    const scroll = () => {
      if (!isHovered) {
        grid.scrollLeft += 0.8;
      }
      
      const N = grid.children.length / 2;
      if (N > 0 && grid.children[N]) {
        const singleSetWidth = grid.children[N].offsetLeft - grid.children[0].offsetLeft;
        if (grid.scrollLeft >= singleSetWidth) {
          grid.scrollLeft -= singleSetWidth;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      grid.removeEventListener('mouseenter', handleMouseEnter);
      grid.removeEventListener('mouseleave', handleMouseLeave);
      grid.removeEventListener('touchstart', handleMouseEnter);
      grid.removeEventListener('touchend', handleMouseLeave);
    };
  }, [clientReviews]);

  const [liveProducts, setLiveProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Cakes");
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
        if (error && !error.message?.includes('fetch')) throw error;
        if (data) setLiveProducts(data);
      } catch (err) {
        console.error('Error fetching live products:', err);
      }
    };
    fetchProducts();
  }, []);

  const mergedMenuData = useMemo(() => {
    if (liveProducts.length === 0) return [];

    const categoryNames = [...new Set(liveProducts.map(p => p.category))];
    
    return categoryNames.map(cat => {
      const catProducts = liveProducts.filter(p => p.category === cat);
      const parsedCatProducts = catProducts.map(p => ({
        ...p,
        isFullWidth: p.name.toLowerCase().includes('3d')
      })).filter(p => !p.isFullWidth);
      
      const subcategories = [...new Set(parsedCatProducts.map(p => p.subcategory).filter(Boolean))];

      return {
        category: cat,
        items: parsedCatProducts.filter(p => !p.subcategory),
        sections: subcategories.map(sub => ({
          title: sub,
          items: parsedCatProducts.filter(p => p.subcategory === sub)
        }))
      };
    }).filter(cat => cat.sections.length > 0 || cat.items?.length > 0);
  }, [liveProducts]);

  useEffect(() => {
    if (mergedMenuData.length > 0 && !mergedMenuData.find(c => c.category === activeCategory)) {
      setActiveCategory(mergedMenuData[0].category);
    }
  }, [mergedMenuData, activeCategory]);

  useEffect(() => {
    const data = mergedMenuData.find(c => c.category === activeCategory);
    if (data?.sections?.length > 0) {
      setActiveSubcategory(data.sections[0].title);
    } else {
      setActiveSubcategory(null);
    }
  }, [activeCategory, mergedMenuData]);

  const activeData = mergedMenuData.find(c => c.category === activeCategory) || mergedMenuData[0] || {};

  return (
    <div className="main-layout" style={{ paddingTop: 0 }}>
      {/* Fixed Background Layer */}
      <div className="global-fixed-bg visible">
        <div 
          className="hero-bg-image active" 
          style={{ backgroundImage: `url("${bg1}")` }} 
        />
        <div className="hero-overlay"></div>
      </div>
      {/* Initial Popup */}
      {showPopup && (
        <div onClick={() => setShowPopup(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '16px', maxWidth: '500px', width: '90%', textAlign: 'center', padding: '3rem 2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#d32f2f', marginBottom: '1rem' }}>{titleText}</h2>
            <p style={{ fontSize: '1rem', color: '#555', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>{message}</p>
            <button className="hero-cta-btn primary" onClick={() => setShowPopup(false)}>
              Okay, I understand
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content">
        
        <style>{`
          @keyframes slideShine {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .shimmer-banner {
            background: linear-gradient(90deg, #ffcdd2 25%, #ffffff 50%, #ffcdd2 75%);
            background-size: 200% auto;
            color: #b71c1c;
            padding: 1rem;
            text-align: center;
            font-weight: bold;
            font-size: 1.1rem;
            font-size: 1.1rem;
            z-index: 100;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            animation: slideShine 3s linear infinite;
            border-bottom: 2px solid #ef9a9a;
            box-shadow: 0 4px 15px rgba(183, 28, 28, 0.15);
          }
        `}</style>
        {/* Hero Section */}
        <section className="hero-section">
          {/* Closed Banner */}
          <div className="shimmer-banner">
            {titleText}: {message}
          </div>
          {/* Center Content */}
          <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="Mini Bakes Logo" 
              style={{ 
                width: '350px', 
                maxWidth: '70vw', 
                opacity: 0.9, 
                filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.15))',
                transform: 'translateY(-1rem)',
                marginBottom: '0.5rem'
              }} 
            />
            <h1 style={{ fontSize: '1.2rem', color: '#fff', textAlign: 'center', fontWeight: '400', letterSpacing: '0.5px', opacity: 0.9 }}>
              <span>Freshly baked for every</span><br />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.4rem' }}>celebration</span>
            </h1>
          </div>
        </section>

        {/* Categories / Menu Container */}
        <div style={{ background: '#fff', width: '100%' }}>
          <section className="menu-page" style={{ padding: '4rem 2rem', minHeight: '600px' }}>
            <h2 className="section-title">OUR CREATIONS</h2>
            
            <div className="menu-categories" style={{ marginTop: '2rem' }}>
              {mergedMenuData.map(cat => (
                <button 
                  key={cat.category}
                  className={`category-btn ${activeCategory === cat.category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.category)}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {activeData.sections?.length > 0 && (
              <div className="menu-subcategory-selector">
                {activeData.sections.map(section => (
                  <button 
                    key={section.title}
                    className={`subcategory-btn ${activeSubcategory === section.title ? 'active' : ''}`}
                    onClick={() => setActiveSubcategory(section.title)}
                  >
                    {section.title}
                    <div className="subcategory-indicator" />
                  </button>
                ))}
              </div>
            )}

            <div className="menu-grid" style={{ marginTop: '2rem' }}>
              {activeData.sections?.length > 0 ? (
                <>
                  {activeData.sections
                    .filter(section => section.title === activeSubcategory)
                    .map(section => (
                      <React.Fragment key={section.title}>
                        {section.items.map(item => (
                          <div key={item.id} className="menu-card" style={{ opacity: 0.9, position: 'relative' }}>
                            <div className="menu-card-image" style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="menu-card-content" style={{ padding: '1rem', textAlign: 'left' }}>
                              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                              <p className="menu-card-desc" style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{item.description}</p>
                              <div className="menu-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="menu-card-price" style={{ fontWeight: 'bold' }}>{item.price}</span>
                                <span style={{ fontSize: '0.8rem', color: '#d32f2f', fontWeight: 'bold', background: '#ffebee', padding: '4px 8px', borderRadius: '4px' }}>Closed</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))
                  }
                  {activeData.items?.map(item => (
                    <div key={item.id} className="menu-card" style={{ opacity: 0.9, position: 'relative' }}>
                      <div className="menu-card-image" style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="menu-card-content" style={{ padding: '1rem', textAlign: 'left' }}>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                        <p className="menu-card-desc" style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{item.description}</p>
                        <div className="menu-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="menu-card-price" style={{ fontWeight: 'bold' }}>{item.price}</span>
                          <span style={{ fontSize: '0.8rem', color: '#d32f2f', fontWeight: 'bold', background: '#ffebee', padding: '4px 8px', borderRadius: '4px' }}>Closed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                activeData.items?.map(item => (
                  <div key={item.id} className="menu-card" style={{ opacity: 0.9, position: 'relative' }}>
                    <div className="menu-card-image" style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="menu-card-content" style={{ padding: '1rem', textAlign: 'left' }}>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{item.name}</h3>
                      <p className="menu-card-desc" style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{item.description}</p>
                      <div className="menu-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="menu-card-price" style={{ fontWeight: 'bold' }}>{item.price}</span>
                        <span style={{ fontSize: '0.8rem', color: '#d32f2f', fontWeight: 'bold', background: '#ffebee', padding: '4px 8px', borderRadius: '4px' }}>Closed</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Client Reviews */}
        <section className="reviews-section reveal">
          <h2 className="reviews-title">CLIENT REVIEWS</h2>
          <div className="reviews-grid" ref={reviewsGridRef}>
            {[...(clientReviews || []), ...(clientReviews || [])].map((review, idx) => (
              <div key={idx} className="review-card">
                {review.fbLink ? (
                  <a href={review.fbLink} target="_blank" rel="noopener noreferrer" className="review-fb-link">
                    <FacebookIcon size={22} className="review-fb-icon" />
                  </a>
                ) : (
                  <FacebookIcon size={22} className="review-fb-icon" />
                )}
                <div className="review-client-photo">
                  <img src={review.img} alt={review.author} />
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <p className="review-author">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Page as Footer */}
        <ContactPage 
          storeSettings={storeSettings} 
        />
      </main>
    </div>
  );
}
