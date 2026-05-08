import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Mail, Clock, Send, ChevronLeft } from 'lucide-react';
import './ContactPage.css';

const ContactPage = ({ onBack }) => {
  return (
    <div className="contact-page-container">
      <button className="contact-back-btn" onClick={onBack}>
        <ChevronLeft size={24} />
        <span>Back to Home</span>
      </button>

      <div className="contact-hero">
        <h1 className="contact-title">Let's Make Life <span className="text-accent">Sweeter</span></h1>
        <p className="contact-subtitle">We'd love to hear from you. Whether it's a custom cake request or just a hello!</p>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          {/* Contact Details Card */}
          <div className="contact-card details-card">
            <h2 className="card-title">Get in Touch</h2>
            <div className="details-list">
              <div className="detail-item">
                <div className="icon-box location">
                  <MapPin size={24} />
                </div>
                <div className="detail-text">
                  <h3>Visit Us</h3>
                  <p>Ħaż-Żebbuġ, Malta</p>
                </div>
              </div>
              
              <div className="detail-item">
                <div className="icon-box phone">
                  <Phone size={24} />
                </div>
                <div className="detail-text">
                  <h3>Call Us</h3>
                  <p>+356 79820529</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-box email">
                  <Mail size={24} />
                </div>
                <div className="detail-text">
                  <h3>Email Us</h3>
                  <p>meganbriffa2001@gmail.com</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="icon-box clock">
                  <Clock size={24} />
                </div>
                <div className="detail-text">
                  <h3>Working Hours</h3>
                  <p>Mon - Sun: 9:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="social-links-container">
              <h3>Follow Our Journey</h3>
              <div className="social-grid">
                <a href="https://instagram.com/minibakes2021" target="_blank" rel="noreferrer" className="social-circle ig">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com/minibakes2021" target="_blank" rel="noreferrer" className="social-circle fb">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Connect Form */}
          <div className="contact-card form-card">
            <h2 className="card-title">Send a Message</h2>
            <form className="quick-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>How can we help?</label>
                <textarea placeholder="Tell us about your sweet requirements..."></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="contact-footer-accent">
        <p>Baking memories since 2021</p>
      </div>
    </div>
  );
};

export default ContactPage;
