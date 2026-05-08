import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowLeft, Send } from 'lucide-react';
import './ContactPage.css';

const InstagramIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ContactPage = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactMethods = [
    {
      id: 'instagram',
      icon: <InstagramIcon size={32} />,
      label: 'Instagram',
      value: '@minibakes2021',
      link: 'https://instagram.com/minibakes2021',
      color: '#E1306C'
    },
    {
      id: 'facebook',
      icon: <FacebookIcon size={32} />,
      label: 'Facebook',
      value: 'minibakes2021',
      link: 'https://facebook.com/minibakes2021',
      color: '#1877F2'
    },
    {
      id: 'email',
      icon: <Mail size={32} />,
      label: 'Email',
      value: 'meganbriffa2001@gmail.com',
      link: 'mailto:meganbriffa2001@gmail.com',
      color: '#EA4335'
    },
    {
      id: 'phone',
      icon: <Phone size={32} />,
      label: 'Phone',
      value: '+356 79820529',
      link: 'tel:+35679820529',
      color: '#34A853'
    },
    {
      id: 'location',
      icon: <MapPin size={32} />,
      label: 'Studio',
      value: 'Ħaż-Żebbuġ, Malta',
      link: 'https://maps.google.com?q=Ħaż-Żebbuġ, Malta',
      color: '#FBBC05'
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <button className="contact-back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
          <span>Back</span>
        </button>
        <div className="contact-hero-text">
          <h1 className="contact-page-title">Let's Create Something <span className="highlight">Sweet</span></h1>
          <p className="contact-page-subtitle">Whether it's a custom cake for your big day or a simple question about our flavors, we're here to help.</p>
        </div>
      </div>

      <div className="contact-grid-container">
        <div className="contact-methods-grid">
          {contactMethods.map((method) => (
            <a 
              key={method.id} 
              href={method.link} 
              target={method.id === 'email' || method.id === 'phone' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="contact-card"
              style={{ '--brand-color': method.color }}
            >
              <div className="contact-card-icon">
                {method.icon}
              </div>
              <div className="contact-card-info">
                <h3>{method.label}</h3>
                <p>{method.value}</p>
              </div>
              <div className="contact-card-arrow">
                <Send size={18} />
              </div>
            </a>
          ))}
        </div>

        <div className="contact-message-box">
          <h2>Ready to order?</h2>
          <p>The fastest way to get your treats is through our online ordering system.</p>
          <button className="contact-cta-btn" onClick={onBack}>
            Browse our Menu
          </button>
        </div>
      </div>

      <div className="contact-page-footer">
        <p>© 2026 Mini Bakes. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactPage;
