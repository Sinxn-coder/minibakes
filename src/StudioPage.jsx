import React, { useState } from 'react';
import { Calendar, Users, Camera, ArrowRight, CheckCircle2, MapPin, Clock, Star } from 'lucide-react';
import './StudioPage.css';
import SafeImage from './components/SafeImage';

// Asset paths (from generated images)
const heroImg = '/baking_class_hero_1777704473859.png';
const workshopImg = '/cupcake_workshop_1777704501517.png';
const groupImg = '/baking_studio_group_1777704537017.png';

const upcomingClasses = [
  {
    id: 1,
    title: "Minimalist Cake Artistry",
    date: "May 15, 2026",
    time: "10:00 AM - 1:00 PM",
    price: "€85",
    level: "Beginner Friendly",
    spots: "4 spots left",
    img: workshopImg
  },
  {
    id: 2,
    title: "Mastering Buttercream Florals",
    date: "May 22, 2026",
    time: "2:00 PM - 5:00 PM",
    price: "€95",
    level: "Intermediate",
    spots: "2 spots left",
    img: heroImg
  },
  {
    id: 3,
    title: "The Ultimate Cupcake Workshop",
    date: "June 05, 2026",
    time: "11:00 AM - 2:00 PM",
    price: "€75",
    level: "All Levels",
    spots: "6 spots left",
    img: groupImg
  }
];

export default function StudioPage() {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classId: '',
    guests: '1'
  });

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    // Simulate booking
    setTimeout(() => {
      setBookingStatus('success');
      setFormData({ name: '', email: '', classId: '', guests: '1' });
    }, 1500);
  };

  return (
    <div className="studio-page">
      {/* Hero Section */}
      <section className="studio-hero">
        <div className="studio-hero-content">
          <span className="studio-badge">Cupcake Decorating Experiences</span>
          <h1>A Sweet Experience, <br/><span>Brought to You</span></h1>
          <p>Megan Briffa comes to <em>you</em> — your home, venue, or event space — for a fun, hands-on cupcake decorating experience. Perfect for birthdays, hen parties, team events, and more.</p>
          <a href="#schedule" className="cta-btn-primary">View Upcoming Dates <ArrowRight size={18} /></a>
        </div>
        <div className="studio-hero-image">
          <SafeImage src={heroImg} alt="Baking Studio Hero" />
          <div className="studio-floating-card">
            <Star className="star-icon" fill="#800000" color="#800000" />
            <div>
              <strong>4.9/5 Rating</strong>
              <p>from 500+ students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Button */}
      <a href="#booking-form" className="mobile-sticky-book mobile-only">
        Book an Experience <ArrowRight size={18} />
      </a>

      {/* Why Join Us */}
      <section className="studio-perks">
        <div className="perk-card">
          <div className="perk-icon"><Users size={24} /></div>
          <h3>Small Groups</h3>
          <p>Intimate classes of max 8 people for personalized attention.</p>
        </div>
        <div className="perk-card">
          <div className="perk-icon"><Camera size={24} /></div>
          <h3>Photo Ready</h3>
          <p>Your event venue becomes the classroom — beautiful, personal, and ready for memories.</p>
        </div>
        <div className="perk-card">
          <div className="perk-icon"><CheckCircle2 size={24} /></div>
          <h3>All Inclusive</h3>
          <p>We provide all ingredients, aprons, and professional tools.</p>
        </div>
      </section>

      {/* Upcoming Schedule */}
      <section id="schedule" className="studio-schedule">
        <h2 className="section-title-alt">UPCOMING DATES</h2>
        <div className="classes-grid">
          {upcomingClasses.map(cls => (
            <div key={cls.id} className="class-card">
              <div className="class-card-img">
                <SafeImage src={cls.img} alt={cls.title} />
                <span className="class-level">{cls.level}</span>
              </div>
              <div className="class-card-body">
                <h3>{cls.title}</h3>
                <div className="class-meta">
                  <span><Calendar size={14} /> {cls.date}</span>
                  <span><Clock size={14} /> {cls.time}</span>
                </div>
                <div className="class-footer">
                  <span className="class-price">{cls.price}</span>
                  <span className="class-spots">{cls.spots}</span>
                </div>
                <button className="book-now-btn" onClick={() => {
                  setFormData({...formData, classId: cls.id});
                  document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                }}>Quick Book</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="studio-gallery">
        <h2 className="section-title-alt">CLASS MOMENTS</h2>
        <div className="gallery-masonry">
          <div className="gallery-item large">
            <SafeImage src={groupImg} alt="Group baking" />
          </div>
          <div className="gallery-item">
            <SafeImage src={workshopImg} alt="Cupcake work" />
          </div>
          <div className="gallery-item">
            <SafeImage src={heroImg} alt="Cake design" />
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="booking-section">
        <div className="booking-container">
          <div className="booking-info">
            <h2>Reserve Your Spot</h2>
            <p>Ready to book? Fill out the form and Megan will confirm your date and location within 24 hours.</p>
            <div className="contact-details">
              <div className="contact-item">
                <MapPin size={20} />
                <span>We come to you — home, venue, or event space</span>
              </div>
              <div className="contact-item">
                <Clock size={20} />
                <span>Flexible scheduling, weekdays & weekends</span>
              </div>
            </div>
          </div>
          <div className="booking-form-wrapper">
            {bookingStatus === 'success' ? (
              <div className="booking-success">
                <CheckCircle2 size={64} color="#800000" />
                <h3>Request Sent!</h3>
                <p>We've received your booking request for {upcomingClasses.find(c => c.id == formData.classId)?.title || 'the class'}. We'll email you soon.</p>
                <button className="cta-btn-primary" onClick={() => setBookingStatus(null)}>Book Another</button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="studio-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Select Class</label>
                    <select 
                      value={formData.classId}
                      required
                      onChange={e => setFormData({...formData, classId: e.target.value})}
                    >
                      <option value="">Choose a workshop...</option>
                      {upcomingClasses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Guests</label>
                    <select 
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: e.target.value})}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                      <option value="4">Small Group (4+)</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="submit-booking-btn" disabled={bookingStatus === 'loading'}>
                  {bookingStatus === 'loading' ? 'Processing...' : 'Confirm Booking Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
