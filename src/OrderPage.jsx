import React, { useState } from 'react';
import { X, ShoppingBag, ArrowLeft, Minus, Plus, CheckCircle2, Calendar, Phone, MessageSquare, User, Sparkles } from 'lucide-react';
import './OrderPage.css';
import CakeCareGuide from './components/CakeCareGuide';

export default function OrderPage({ cart = [], onBack, onRemoveItem, onUpdateQuantity }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    date: '',
    note: ''
  });

  const [orderId, setOrderId] = useState('');

  const getItemTotal = (item) => {
    let unitPrice = parseFloat((item.price || '0').replace(/[^\d.]/g, '')) || 0;
    
    // Tiered pricing for cakesicles-bulk
    if (item.id === 'cakesicles-bulk') {
      unitPrice = item.quantity >= 20 ? 2.40 : 2.60;
    }
    
    // Addons
    if (item.options?.bows) {
      unitPrice += 5;
    }
    
    return unitPrice * item.quantity;
  };

  const totalPrice = cart.reduce((acc, item) => acc + getItemTotal(item), 0);
  
  const hasCake = cart.some(item => item.id.startsWith('c') && !item.id.startsWith('cu'));

  // Minimum date is today + 2 days
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split('T')[0];
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const newId = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newId);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="order-page success-view">
        <div className="success-content">
          <div className="success-icon-anim">
            <CheckCircle2 size={80} color="#800000" strokeWidth={1.5} />
          </div>
          <h1>Order Received!</h1>
          <p className="order-id-tag">Order ID: #{orderId}</p>
          <p className="success-msg">
            Thank you for choosing Mini Bakes, <span className="customer-name">{formData.name}</span>!
          </p>
          <div className="order-summary-box">
            <div className="summary-item">
              <span>Order Total</span>
              <strong>€{totalPrice.toFixed(2)}</strong>
            </div>
            <div className="summary-item">
              <span>Pickup Date</span>
              <strong>{new Date(formData.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
            </div>
          </div>
          <p className="whatsapp-notice">We'll contact you via WhatsApp shortly to confirm your pickup details.</p>
          
          {hasCake && (
            <div className="success-care-guide">
              <CakeCareGuide />
            </div>
          )}

          <button className="continue-btn" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`order-page ${step === 'checkout' ? 'checkout-view' : ''}`}>
      <div className="order-header">
        <button className="back-btn" onClick={step === 'checkout' ? () => setStep('cart') : onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>{step === 'cart' ? 'Your Order' : 'Checkout'}</h1>
        <div className="placeholder-icon">
          <ShoppingBag size={24} />
        </div>
      </div>

      <div className="order-content">
        {step === 'cart' ? (
          cart.length === 0 ? (
            <div className="empty-order">
              <div className="empty-icon-wrapper">
                <ShoppingBag size={64} strokeWidth={1} />
              </div>
              <h2>Your order is empty</h2>
              <p>Looks like you haven't added any desserts yet. Head over to our menu to start your sweet journey!</p>
              <button className="start-shopping-btn" onClick={onBack}>Browse Menu</button>
            </div>
          ) : (
            <div className="order-items-list">
              {cart.map((item, i) => (
                <div key={item.cartId || i} className="order-item-card">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="order-item-img" />
                  ) : (
                    <div className="order-item-icon-fallback">
                      <Sparkles size={32} color="var(--secondary)" />
                    </div>
                  )}
                  <div className="order-item-details">
                    <div className="order-item-header">
                      <h3>{item.name}</h3>
                      <button className="remove-item-btn" onClick={() => onRemoveItem(item.cartId)}><X size={16} /></button>
                    </div>
                    <p className="order-item-options">
                      {item.options.boxSize && <span>Box of {item.options.boxSize} • </span>}
                      {item.options.flavor && <span>{item.options.flavor}</span>}
                      {item.options.spreads && item.options.spreads.length > 0 && <span> • {item.options.spreads.join(', ')}</span>}
                    </p>
                    {item.options.notes && (
                      <p className="order-item-notes">" {item.options.notes} "</p>
                    )}
                    
                    {item.options.refImage && (
                      <div className="order-item-ref">
                        <span className="ref-label">Reference Image:</span>
                        <img 
                          src={URL.createObjectURL(item.options.refImage)} 
                          alt="Reference" 
                          className="ref-preview-img"
                          onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Cleanup
                        />
                      </div>
                    )}

                    {item.layers && item.layers.length > 0 && (
                      <div className="order-item-layers">
                        {item.layers.map((layer, idx) => (
                          <div key={idx} className="order-layer-summary">
                            <span className="layer-dot" style={{ backgroundColor: layer.color || '#f1f1f1' }}></span>
                            <span className="layer-text">
                              {layer.type.includes('6') ? '6"' : '8"'} {layer.type.includes('heart') ? 'Heart' : 'Round'} 
                              {layer.topBorder && ' • Shell Top'}
                              {layer.bottomBorder && ' • Shell Bottom'}

                              {layer.flowerCluster && ' • Flowers'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="order-item-price-qty">
                      <span className="order-item-price">{getItemTotal(item) === 0 ? 'Ask on WA' : `€${getItemTotal(item).toFixed(2)}`}</span>
                      <div className="order-qty-selector">
                        <button onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <form className="checkout-form" id="checkout-form" onSubmit={handleCheckoutSubmit}>
            <div className="form-section">
              <h3>Personal Details</h3>
              <div className="form-group-icon">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-row-checkout">
                <div className="form-group-icon">
                  <Phone size={18} />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group-icon">
                  <MessageSquare size={18} />
                  <input 
                    type="tel" 
                    placeholder="WhatsApp Number" 
                    required 
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pickup Timing</h3>
              <p className="form-hint">Note: Minimum 2 days lead time required for all orders.</p>
              <div className="form-group-icon">
                <Calendar size={18} />
                <input 
                  type="date" 
                  required 
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Notes</h3>
              <textarea 
                placeholder="Any special requests or details about your order?"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </div>
          </form>
        )}
      </div>

      <div className="order-footer">
        <div className="total-row">
          <span>{step === 'cart' ? 'Subtotal' : 'Total Amount'}</span>
          <span>
            €{totalPrice.toFixed(2)}
            {cart.some(item => getItemTotal(item) === 0) && ' + Custom Quote'}
          </span>
        </div>
        {step === 'cart' ? (
          <button 
            className="checkout-btn" 
            disabled={cart.length === 0}
            onClick={() => setStep('checkout')}
          >
            Proceed to Checkout
          </button>
        ) : (
          <button 
            type="submit" 
            form="checkout-form" 
            className="checkout-btn confirm-btn"
          >
            Confirm & Order via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
