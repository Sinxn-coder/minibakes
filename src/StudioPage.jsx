import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import './StudioPage.css';
import SafeImage from './components/SafeImage';

const studio1 = `${import.meta.env.BASE_URL}studio1.png`;
const studio2 = `${import.meta.env.BASE_URL}studio2.png`;
const studio3 = `${import.meta.env.BASE_URL}studio3.png`;
const studio4 = `${import.meta.env.BASE_URL}studio4.png`;
const studio5 = `${import.meta.env.BASE_URL}studio5.png`;
const studio6 = `${import.meta.env.BASE_URL}studio6.png`;
const studio7 = `${import.meta.env.BASE_URL}studio7.png`;
const studio8 = `${import.meta.env.BASE_URL}studio8.png`;

// 8 unique studio images from public folder
const studioImages = [studio1, studio2, studio3, studio4, studio5, studio6, studio7, studio8];

// Example booked dates for the calendar
const BOOKED_DATES = [
  '2026-05-15',
  '2026-05-22',
  '2026-05-28',
  '2026-06-05',
  '2026-06-12',
  '2026-06-25'
];

const StudioCalendar = ({ onDateSelect, selectedDate }) => {
  const [viewDate, setViewDate] = useState(new Date(2026, 4, 1)); // Start at May 2026
  
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
  
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  
  const days = [];
  // Fill empty spots for first week
  for (let i = 0; i < firstDayOfMonth(year, month); i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  // Fill actual days
  for (let d = 1; d <= daysInMonth(year, month); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isBooked = BOOKED_DATES.includes(dateStr);
    const isSelected = selectedDate === dateStr;
    const isToday = new Date().toISOString().split('T')[0] === dateStr;
    
    days.push(
      <div 
        key={d} 
        className={`calendar-day ${isBooked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => !isBooked && onDateSelect(dateStr)}
      >
        <span className="day-number">{d}</span>
        {isBooked && <span className="booked-label">BOOKED</span>}
        {!isBooked && <span className="available-dot"></span>}
      </div>
    );
  }

  const changeMonth = (offset) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="month-nav-btn">&lt;</button>
        <h3>{monthName} {year}</h3>
        <button onClick={() => changeMonth(1)} className="month-nav-btn">&gt;</button>
      </div>
      
      <div className="calendar-main-content">
        <div className="calendar-legend">
          <div className="legend-item"><span className="legend-box available"></span> Available</div>
          <div className="legend-item"><span className="legend-box booked"></span> Fully Booked</div>
          <div className="legend-item"><span className="legend-box selected"></span> Your Selection</div>
          <p className="calendar-note">Maroon dates are already reserved for private events.</p>
        </div>
        
        <div className="calendar-body">
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="calendar-grid">
            {days}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StudioPage() {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    guests: '1'
  });
  const [showGuestLimit, setShowGuestLimit] = useState(false);

  const handleGuestChange = (e) => {
    const val = e.target.value;
    if (parseInt(val) > 15) {
      setFormData({...formData, guests: '15'});
      setShowGuestLimit(true);
      setTimeout(() => setShowGuestLimit(false), 4000);
    } else {
      setFormData({...formData, guests: val});
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % studioImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    // Simulate booking
    setTimeout(() => {
      setBookingStatus('success');
      setFormData({ name: '', email: '', date: '', guests: '1' });
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
          <a href="#schedule" className="cta-btn-primary">Request a Booking <ArrowRight size={18} /></a>
        </div>
        <div className="studio-hero-image">
          {studioImages.map((img, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${idx === currentImgIndex ? 'active' : ''}`}
            >
              <SafeImage src={img} alt={`Studio Moment ${idx + 1}`} />
            </div>
          ))}
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
          <p>Maximum of 15 people for a fun, personalized experience.</p>
        </div>
        <div className="perk-card">
          <div className="perk-icon"><Clock size={24} /></div>
          <h3>Duration</h3>
          <p>Around 1.5 hours of hands-on decorating fun.</p>
        </div>
        <div className="perk-card">
          <div className="perk-icon"><CheckCircle2 size={24} /></div>
          <h3>All Inclusive</h3>
          <p>We provide all ingredients, aprons, and professional tools.</p>
        </div>
      </section>

      {/* Availability Calendar */}
      <section id="schedule" className="studio-schedule">
        <div className="section-header-alt">
          <span className="section-badge">Booking Availability</span>
          <h2 className="section-title-alt">SELECT YOUR DATE</h2>
        </div>
        
        <div className="calendar-wrapper">
          <StudioCalendar 
            selectedDate={formData.date}
            onDateSelect={(date) => {
              setFormData({...formData, date});
              document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="studio-gallery">
        <h2 className="section-title-alt">CLASS MOMENTS</h2>
        <div className="expanding-gallery">
          {studioImages.map((img, idx) => (
            <div 
              key={idx}
              data-index={idx}
              className="gallery-card"
            >
              <SafeImage src={img} alt={`Class moment ${idx + 1}`} />
              <div className="gallery-card-overlay">
                <span>View Moment {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="booking-section">
        <div className="booking-container">
          <div className="booking-info">
            <h2>Reserve Your Spot</h2>
            <p>Ready to book? Fill out the form and we will confirm your date and location within 24 hours.</p>
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
                <p>We've received your booking request for {formData.date}. We'll email you soon to confirm the details.</p>
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
                    <label>Selected Date</label>
                    <input 
                      type="text" 
                      readOnly 
                      placeholder="Select from calendar above"
                      value={formData.date}
                      required
                      className="readonly-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Guests (Max 15)</label>
                    <input 
                      type="number"
                      min="1"
                      max="15"
                      value={formData.guests}
                      required
                      onChange={handleGuestChange}
                    />
                    {showGuestLimit && (
                      <div className="guest-limit-note">
                        Maximum capacity is 15 guests. For larger groups, please contact us!
                      </div>
                    )}
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
