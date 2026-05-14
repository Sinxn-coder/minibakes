import React from 'react';
import { Mail, Phone, MapPin, ArrowLeft, MessageSquare } from 'lucide-react';

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
import './ContactPage.css';

const ContactPage = ({ onBack }) => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <button className="contact-back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you! Whether you have a question about our menu, classes, or a custom order, we're here to help.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-section">
            <div className="contact-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-card-content">
                <h3>Phone</h3>
                <p>+356 000 000 00</p>
                <a href="tel:+35600000000" className="contact-action-link">Call Now</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <MessageSquare size={24} />
              </div>
              <div className="contact-card-content">
                <h3>WhatsApp</h3>
                <p>Quick chat for orders & inquiries</p>
                <a 
                  href="https://wa.me/35600000000?text=Hi%20Mini%20Bakes!%20I'd%20like%20to%20make%20an%20inquiry." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-action-link"
                >
                  Message Us
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <div className="contact-card-content">
                <h3>Email</h3>
                <p>meganbriffa2001@gmail.com</p>
                <a href="mailto:meganbriffa2001@gmail.com" className="contact-action-link">Send Email</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-card-content">
                <h3>Location</h3>
                <p>Ħaż-Żebbuġ, Malta</p>
                <a 
                  href="https://maps.google.com?q=Together%20Turnkey%20Contractors%20Ltd,%20The%20Cottage,%2046%20Triq%20%C4%A6al%20Dwin,%20%C5%BBebbu%C4%A1&ftid=0x130e512c90f392f7:0xc38e40f6185a3f54" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-action-link"
                >
                  View on Maps
                </a>
              </div>
            </div>
          </div>

          <div className="contact-social-section">
            <h2>Follow Our Journey</h2>
            <p>Catch all our latest creations and behind-the-scenes moments on social media.</p>
            <div className="contact-social-links">
              <a href="https://instagram.com/minibakes2021" target="_blank" rel="noopener noreferrer" className="social-box instagram">
                <InstagramIcon size={32} />
                <span>Instagram</span>
              </a>
              <a href="https://facebook.com/minibakes2021" target="_blank" rel="noopener noreferrer" className="social-box facebook">
                <FacebookIcon size={32} />
                <span>Facebook</span>
              </a>
            </div>
            
            <div className="contact-hours">
              <h3>Working Hours</h3>
              <div className="hours-row">
                <span>Mon - Fri</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="hours-row">
                <span>Saturday</span>
                <span>10:00 - 15:00</span>
              </div>
              <div className="hours-row">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
