import React, { useState } from 'react';
import { MapPin, Instagram, Phone, Mail, Send, Heart } from 'lucide-react';
import './ContactPage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 800);
  };

  return (
    <div className="contact-page-container">
      <div className="contact-hero">
        <h1 className="contact-page-title">Get in Touch</h1>
        <p className="contact-page-subtitle">We'd love to hear from you. Let's make something sweet together.</p>
      </div>

      <div className="contact-content-wrapper">
        
        <div className="contact-info-cards">
          <div className="contact-card" onClick={() => window.open('https://maps.google.com?q=Ħaż-Żebbuġ, Malta', '_blank')}>
            <div className="card-icon-wrapper">
              <MapPin size={28} className="card-icon" />
            </div>
            <h3>Visit Us</h3>
            <p>Ħaż-Żebbuġ, Malta</p>
          </div>

          <div className="contact-card" onClick={() => window.open('mailto:meganbriffa2001@gmail.com', '_blank')}>
            <div className="card-icon-wrapper">
              <Mail size={28} className="card-icon" />
            </div>
            <h3>Email Us</h3>
            <p>meganbriffa2001@gmail.com</p>
          </div>

          <div className="contact-card" onClick={() => window.open('https://instagram.com/minibakes2021', '_blank')}>
            <div className="card-icon-wrapper">
              <Instagram size={28} className="card-icon" />
            </div>
            <h3>Follow Us</h3>
            <p>@minibakes2021</p>
          </div>

          <div className="contact-card" onClick={() => window.open('tel:+35679820529', '_self')}>
            <div className="card-icon-wrapper">
              <Phone size={28} className="card-icon" />
            </div>
            <h3>Call Us</h3>
            <p>+356 79820529</p>
          </div>
        </div>

        <div className="contact-form-section">
          <div className="form-header">
            <h2>Send a Message</h2>
            <p>Have a custom request or a question? Drop us a line below.</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com" 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                placeholder="I would like to order a custom cake for..." 
                rows={5} 
                required 
              />
            </div>
            <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`}>
              {submitted ? (
                <>Sent Successfully <Heart size={18} className="success-icon" /></>
              ) : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ContactPage;
