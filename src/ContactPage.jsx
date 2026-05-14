import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowLeft, MessageSquare } from 'lucide-react';
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
                <p>hello@minibakes.com</p>
                <a href="mailto:hello@minibakes.com" className="contact-action-link">Send Email</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-card-content">
                <h3>Location</h3>
                <p>Naxxar, Malta</p>
                <p className="contact-sub-text">Visit us by appointment only</p>
              </div>
            </div>
          </div>

          <div className="contact-social-section">
            <h2>Follow Our Journey</h2>
            <p>Catch all our latest creations and behind-the-scenes moments on social media.</p>
            <div className="contact-social-links">
              <a href="https://instagram.com/minibakes2021" target="_blank" rel="noopener noreferrer" className="social-box instagram">
                <Instagram size={32} />
                <span>Instagram</span>
              </a>
              <a href="https://facebook.com/minibakes" target="_blank" rel="noopener noreferrer" className="social-box facebook">
                <Facebook size={32} />
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
