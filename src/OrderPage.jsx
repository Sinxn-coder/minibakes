import React, { useState, useRef, useEffect } from 'react';
import { X, ShoppingBag, ArrowLeft, Minus, Plus, CheckCircle2, Calendar, Phone, MessageSquare, User, Sparkles, Cake, AlertCircle } from 'lucide-react';
import './OrderPage.css';
import CakeCareGuide from './components/CakeCareGuide';
import { supabase } from './supabase';

const WhatsAppIcon = ({ size = 16, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.432-9.877 9.881-9.877 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.448-4.435 9.878-9.883 9.878m0-21.867C6.435.056.1.493.1 12.226c0 2.124.549 4.198 1.595 6.037L0 24l5.893-1.547a12.19 12.19 0 005.77 1.468h.005c6.12 0 12.1-5.437 12.1-12.226 0-3.27-1.272-6.342-3.582-8.652A12.134 12.134 0 0012.051.055z" />
  </svg>
);

export default function OrderPage({ cart = [], onBack, onRemoveItem, onUpdateQuantity }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success' | 'processing'
  const [phoneCode, setPhoneCode] = useState('+356');
  const [whatsappCode, setWhatsappCode] = useState('+356');
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const [warningNotification, setWarningNotification] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    date: '',
    note: ''
  });

  const handleDecrementCart = (item) => {
    const isMiniCake = item.id?.startsWith('mc');
    const minQty = isMiniCake ? 4 : 1;
    if (item.quantity <= minQty) {
      if (isMiniCake) {
        setWarningNotification('Minimum order for Mini Cakes is 4 pieces.');
      } else {
        setWarningNotification(`Minimum order for this item is ${minQty} piece.`);
      }
      setTimeout(() => setWarningNotification(''), 3000);
    } else {
      onUpdateQuantity(item.cartId, item.quantity - 1);
    }
  };

  const [orderId, setOrderId] = useState('');
  const [finalOrderTotal, setFinalOrderTotal] = useState(0);

  const getItemTotal = (item) => {
    let unitPrice = parseFloat((item.price || '0').replace(/[^\d.]/g, '')) || 0;

    // Tiered pricing for cakesicles-bulk
    if (item.id === 'cakesicles-bulk') {
      unitPrice = item.quantity >= 20 ? 2.40 : 2.60;
    }

    // Spreads fee for cupcakes (extra €0.45 per cupcake)
    const isCupcake = item.id && item.id.startsWith('cu');
    if (isCupcake && item.options?.spreads && item.options.spreads.length > 0) {
      let cupcakesPerBox = 1;
      if (item.id === 'cu1' || item.id === 'cu4') {
        cupcakesPerBox = 6;
      } else if (item.id === 'cu2' || item.id === 'cu5') {
        cupcakesPerBox = 12;
      }
      unitPrice += 0.45 * cupcakesPerBox;
    }

    // Packaging fee for White Chocolate cupcakes (extra €0.15 per cupcake)
    const isWhiteChocolateCupcake = ['cu4', 'cu5', 'cu6'].includes(item.id);
    if (isWhiteChocolateCupcake && item.options?.individualPackaging) {
      let cupcakesPerBox = 1;
      if (item.id === 'cu1' || item.id === 'cu4') {
        cupcakesPerBox = 6;
      } else if (item.id === 'cu2' || item.id === 'cu5') {
        cupcakesPerBox = 12;
      }
      unitPrice += 0.15 * cupcakesPerBox;
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

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setStep('processing'); // Show processing state
    
    setFinalOrderTotal(totalPrice);
    
    let orderNumber = 1;
    try {
      const { data: latestOrder } = await supabase
        .from('orders')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (latestOrder && latestOrder.length > 0) {
        const lastId = latestOrder[0].id;
        const match = lastId.match(/ORD-(\d+)/);
        if (match) {
          orderNumber = parseInt(match[1], 10) + 1;
        } else {
          const { count } = await supabase.from('orders').select('*', { count: 'exact', head: true });
          orderNumber = (count || 0) + 1;
        }
      }
    } catch (err) {
      console.error('Error fetching latest order ID:', err);
      orderNumber = Math.floor(1000 + Math.random() * 9000);
    }
    
    const newId = `ORD-${String(orderNumber).padStart(4, '0')}`;
    setOrderId(newId);

    // 1. Generate or fetch unique persistent Client Device ID legally (strictly local and non-cookie)
    let clientId = localStorage.getItem('minibakes_client_id');
    if (!clientId) {
      clientId = `dev-${Math.random().toString(36).substring(2, 10)}-${Date.now().toString(36)}`;
      localStorage.setItem('minibakes_client_id', clientId);
    }

    // 2. Upload reference/inspiration images if any exist, and build item details
    try {
      const itemsWithUrls = [];
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        let refImageUrl = null;
        if (item.options?.refImage) {
          try {
            const file = item.options.refImage;
            const fileExt = file.name.split('.').pop();
            const fileName = `order-${newId}-${i}-${Date.now()}.${fileExt}`;
            
            const { data, error: uploadError } = await supabase.storage
              .from('inspiration-images')
              .upload(fileName, file);
              
            if (uploadError) throw uploadError;
            
            if (data) {
              const { data: { publicUrl } } = supabase.storage
                .from('inspiration-images')
                .getPublicUrl(fileName);
              refImageUrl = publicUrl;
            }
          } catch (err) {
            console.error('Error uploading inspiration image:', err);
          }
        }
        itemsWithUrls.push({
          ...item,
          refImageUrl
        });
      }

      // Build the order payload
      const newOrder = {
        id: newId,
        customer: formData.name,
        phone: `${phoneCode} ${formData.phone}`,
        whatsapp: `${whatsappCode} ${formData.whatsapp}`,
        date: new Date().toISOString().split('T')[0],
        total: `€${totalPrice.toFixed(2)}`,
        status: 'pending',
        client_id: clientId, // Maps to snake_case table column
        details: {
          whatsapp: `${whatsappCode} ${formData.whatsapp}`,
          pickupDate: formData.date,
          pickupPeriod: 'Morning',
          pickupNotes: formData.note,
          itemType: cart[0]?.name || 'Sweet Assortment',
          quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
          flavor: cart[0]?.options?.flavor || 'Assorted',
          items: itemsWithUrls.map(item => ({
            itemType: item.name + (item.options?.individualPackaging ? ' (Individually Packaged)' : ''),
            quantity: item.quantity,
            color: item.options?.color || '',
            flavor: (item.options?.flavor || 'Assorted') 
              + (item.options?.spreads && item.options.spreads.length > 0 ? ` + ${item.options.spreads.join(', ')} Spread` : '')
              + (item.options?.message ? ` (Text: "${item.options.message}")` : '')
              + (item.options?.innerMessage ? ` (Inner Note: "${item.options.innerMessage}")` : ''),
            price: `€${getItemTotal(item).toFixed(2)}`,
            refImageUrl: item.refImageUrl
          }))
        }
      };

      const customerSource = localStorage.getItem('customer_source') || 'Direct';
      newOrder.details.source = customerSource;

      // 3. Save order to Supabase
      const { error } = await supabase
        .from('orders')
        .insert([newOrder]);

      if (error) throw error;

      // 4. Upsert client device into analytics table
      const { data: existingClient } = await supabase
        .from('clients')
        .select('order_count, total_spent')
        .eq('client_id', clientId)
        .single();

      if (existingClient) {
        await supabase.from('clients').update({
          last_seen: new Date().toISOString(),
          order_count: (existingClient.order_count || 0) + 1,
          total_spent: parseFloat(existingClient.total_spent || 0) + totalPrice,
          device_info: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: `${screen.width}x${screen.height}`,
            lastCustomer: formData.name
          }
        }).eq('client_id', clientId);
      } else {
        await supabase.from('clients').insert([{
          client_id: clientId,
          order_count: 1,
          total_spent: totalPrice,
          device_info: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: `${screen.width}x${screen.height}`,
            lastCustomer: formData.name
          }
        }]);
      }
      
      // Keep a local copy as backup for the customer browser
      const existingOrders = JSON.parse(localStorage.getItem('minibakes_placed_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('minibakes_placed_orders', JSON.stringify(existingOrders));

      // 5. Dispatch a global event to let App.jsx clear the cart state
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        const event = new CustomEvent('minibakes_order_completed');
        window.dispatchEvent(event);
      }

      setStep('success');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('There was an issue processing your order. Please try again.');
      setStep('checkout');
    }
  };

  const handleConfirmClick = (e) => {
    const form = document.getElementById('checkout-form');
    if (form && !form.checkValidity()) {
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        e.preventDefault();
        const headerOffset = 120;
        const elementPosition = firstInvalid.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        setTimeout(() => {
          firstInvalid.focus();
          firstInvalid.reportValidity();
        }, 500);
      }
    }
  };

  const getWhatsAppUrgentLink = () => {
    const messageText = `*URGENT ENQUIRY*%0A%0AHello Mini Bakes! I have an urgent request regarding my order.%0A%0A*Order ID:* %23${orderId}%0A*Customer Name:* ${formData.name}%0A*WhatsApp:* ${whatsappCode} ${formData.whatsapp}%0A*Pickup Date:* ${formData.date}%0A%0APlease contact me as soon as possible. Thank you!`;
    
    return `https://wa.me/35679820529?text=${messageText}`;
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
              <strong>€{finalOrderTotal.toFixed(2)}</strong>
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

          <a 
            href={getWhatsAppUrgentLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-urgent-btn"
          >
            <WhatsAppIcon size={20} />
            Urgent Enquiry via WhatsApp
          </a>

          <button className="continue-btn" onClick={onBack}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`order-page ${step === 'checkout' ? 'checkout-view' : ''}`}>
      {warningNotification && (
        <div className="added-notification" style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', background: '#d32f2f', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', fontWeight: '600', fontPosition: 'relative', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 9999, boxShadow: '0 10px 30px rgba(211, 47, 47, 0.3)', animation: 'slideDownFade 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <AlertCircle size={18} className="notification-icon" style={{ stroke: '#fff' }} />
          <span>{warningNotification}</span>
        </div>
      )}
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
                      <Cake size={32} color="var(--secondary)" />
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
                      {item.options.color && <span> • Color: {item.options.color}</span>}
                      {item.options.individualPackaging && <span> • Individual Packaging 📦</span>}
                      {item.options.message && <span> • Text: "{item.options.message}"</span>}
                      {item.options.innerMessage && <span> • Note Inside: "{item.options.innerMessage}"</span>}
                    </p>
                    {item.id?.startsWith('mc') && (
                      <div className="cart-min-order-note" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#b71c1c', fontSize: '0.75rem', fontWeight: '500', marginTop: '4px', marginBottom: '4px' }}>
                        <AlertCircle size={12} />
                        <span>Minimum order of 4 Mini Cakes required</span>
                      </div>
                    )}
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
                              {layer.topBorder && layer.topBorder !== 'none' && ' • Shell Top'}
                              {layer.bottomBorder && layer.bottomBorder !== 'none' && ' • Shell Bottom'}
                              {layer.bow && ' • Fondant Bow'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="order-item-price-qty">
                      <span className="order-item-price">
                        {getItemTotal(item) === 0 ? (
                          <span
                            className="price-wa-tag tooltip-trigger"
                            data-tooltip="We will provide the final quote for this custom design via WhatsApp once your order is received."
                          >
                            <WhatsAppIcon size={14} />
                            <span>WA</span>
                          </span>
                        ) : `€${getItemTotal(item).toFixed(2)}`}
                      </span>
                      <div className="order-qty-selector">
                        <button onClick={() => handleDecrementCart(item)}><Minus size={14} /></button>
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
          <form 
            className="checkout-form" 
            id="checkout-form" 
            onSubmit={handleCheckoutSubmit}
          >
            <div className="form-section">
              <h3>Personal Details</h3>
              <div className="form-group-icon">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-row-checkout">
                <div className="form-group-icon">
                  <Phone size={18} />
                  <select 
                    value={phoneCode} 
                    onChange={(e) => setPhoneCode(e.target.value)}
                    className="country-code-select"
                  >
                    <option value="+356">+356 (MT)</option>
                    <option value="+39">+39 (IT)</option>
                    <option value="+44">+44 (GB)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+34">+34 (ES)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="form-group-icon">
                  <MessageSquare size={18} />
                  <select 
                    value={whatsappCode} 
                    onChange={(e) => setWhatsappCode(e.target.value)}
                    className="country-code-select"
                  >
                    <option value="+356">+356 (MT)</option>
                    <option value="+39">+39 (IT)</option>
                    <option value="+44">+44 (GB)</option>
                    <option value="+1">+1 (US/CA)</option>
                    <option value="+33">+33 (FR)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+34">+34 (ES)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="WhatsApp Number"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Additional Notes</h3>
              <textarea
                placeholder="Any special requests or details about your order?"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>
          </form>
        )}
      </div>

      <div className="order-footer">
        <div className="total-row">
          <span>{step === 'cart' ? 'Subtotal' : 'Total Amount'}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            €{totalPrice.toFixed(2)}
            {cart.some(item => getItemTotal(item) === 0) && (
              <span
                className="price-wa-tag tooltip-trigger"
                style={{ fontSize: '0.9rem' }}
                data-tooltip="Total includes items that will be quoted via WhatsApp."
              >
                + <WhatsAppIcon size={14} />
                <span>WA</span>
              </span>
            )}
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
            onClick={handleConfirmClick}
          >
            Confirm & Order
          </button>
        )}
      </div>
    </div>
  );
}
