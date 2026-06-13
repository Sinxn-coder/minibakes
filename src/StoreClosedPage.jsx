import React, { useState, useEffect } from 'react';
import './App.css'; // Reuse App styles

export default function StoreClosedPage({ storeAvailability, categories, clientReviews, storeSettings, founderImg, FacebookIcon }) {
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

  return (
    <div className="main-layout" style={{ paddingTop: 0 }}>
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
        
        {/* Closed Banner */}
        <div className="pulsing-closed-banner">
          {titleText}: {message}
        </div>

        {/* Hero Section */}
        <section className="hero-section" style={{ height: '60vh', minHeight: '400px' }}>
          <div className="hero-top-left-content">
            <h1 className="hero-celebration-text">
              <span className="hero-sans">Freshly baked for every</span><br />
              <span className="hero-serif-accent">celebration</span>
            </h1>
          </div>
        </section>

        {/* Categories Grid (No details/cart) */}
        <section className="menu-categories-section" style={{ padding: '4rem 2rem', background: '#fff' }}>
          <h2 className="section-title">OUR CREATIONS</h2>
          <div className="categories-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {categories?.map((cat, idx) => (
              <div key={idx} className="category-card" style={{ cursor: 'default', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', background: '#fff' }}>
                <div className="category-image-wrapper" style={{ height: '250px', width: '100%' }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="category-card-content" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Client Reviews */}
        <section className="reviews-section reveal" style={{ padding: '4rem 0', background: '#fcfcfc' }}>
          <h2 className="reviews-title">CLIENT REVIEWS</h2>
          <div className="reviews-grid">
            {[...(clientReviews || [])].slice(0, 4).map((review, idx) => (
              <div key={idx} className="review-card">
                {review.fbLink && (
                  <a href={review.fbLink} target="_blank" rel="noopener noreferrer" className="review-fb-link">
                    <FacebookIcon size={22} className="review-fb-icon" />
                  </a>
                )}
                <div className="review-client-photo">
                  <img src={review.img} alt={review.author} />
                </div>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"{review.text}"</p>
                <p className="review-author">— {review.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact/Footer */}
        <footer className="footer" style={{ padding: '4rem 2rem', background: '#222', color: '#fff', textAlign: 'center' }}>
          <h2>Get in Touch</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto', color: '#ccc' }}>
            Have a question or want to chat about a future order? Feel free to reach out to us!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <a href={storeSettings?.instagram_link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Instagram</a>
            <a href={storeSettings?.facebook_link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Facebook</a>
            <a href={`https://wa.me/${(storeSettings?.whatsapp_number || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>WhatsApp</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
