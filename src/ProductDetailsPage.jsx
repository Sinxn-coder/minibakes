import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Image as ImageIcon, Upload, ShoppingBag } from 'lucide-react';
import SafeImage from './components/SafeImage';
import Cake3D from './Cake3D';
import './ProductDetailsPage.css';
import CakeCareGuide from './components/CakeCareGuide';

export default function ProductDetailsPage({ product, onBack, onConfirm, cartCount, onOpenCart }) {
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState({
    flavor: '',
    spreads: [], // Changed to array for multi-select support
    message: '',
    notes: '',
    bows: false
  });

  const BOW_ADDON_PRICE = 5;

  if (!product) return null;

  const productId = product?.id || '';
  const isCake = productId.startsWith('c') && !productId.startsWith('cu');
  const isCupcake = productId.startsWith('cu') && !['cu5', 'cu6'].includes(productId);
  const isMiniCake = ['cu5', 'cu6'].includes(productId);
  const isBrownie = productId.startsWith('t1');
  const hasSpreads = isCake || isMiniCake || isBrownie;

  const flavors = isCake || isCupcake || productId.startsWith('cp') || productId.startsWith('t3') || productId.startsWith('t4') 
                  ? ['Vanilla', 'Chocolate', 'Red Velvet'] : 
                  ['Classic Chocolate'];

  const spreads = ['Nutella', 'Biscoff', 'Pistachio', 'Kinder'];

  const basePrice = parseFloat(product.price.replace(/[^\d.]/g, '')) || 0;
  const bowsTotal = options.bows ? BOW_ADDON_PRICE : 0;
  const unitTotal = basePrice + bowsTotal;
  const grandTotal = unitTotal * quantity;

  return (
    <div className="product-details-page">
      <div className="details-container">
        <div className="details-header-nav">
          <button className="back-btn-details" onClick={onBack}>
            <ArrowLeft size={24} /> <span>Back to browsing</span>
          </button>
          
          <button className="cart-btn-details" onClick={onOpenCart}>
            <div className="cart-icon-wrapper-details">
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="cart-badge-details">{cartCount}</span>}
            </div>
          </button>
        </div>

        <div className="details-layout">
          <div className="details-image-side">
            {product.layers ? (
              <div className="details-3d-wrapper">
                <Cake3D layers={product.layers} />
              </div>
            ) : (
              <SafeImage src={product.img} alt={product.name} className="main-details-img" />
            )}
          </div>

          <div className="details-info-side">
            <h1 className="details-title">{product.name}</h1>
            <p className="details-price">{product.price}</p>
            <p className="details-description">{product.description}</p>

            <div className="customization-section">

              {/* Flavor */}
              <div className="option-group">
                <label>Select Flavor</label>
                <div className="option-grid">
                  {flavors.map(f => (
                    <button 
                      key={f} 
                      className={`option-btn ${options.flavor === f ? 'active' : ''}`}
                      onClick={() => setOptions({...options, flavor: f})}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spread — cakes only, toggle-able */}
              {hasSpreads && (
                <div className="option-group">
                  <label>
                    {isBrownie ? 'Select Spreads (Up to 3)' : 'Inner Spread'}
                    <span className="option-label-hint"> — Included</span>
                  </label>
                  <div className="option-grid">
                    {spreads.map(s => {
                      const isActive = options.spreads.includes(s);
                      return (
                        <button 
                          key={s} 
                          className={`option-btn ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            if (isBrownie) {
                              if (isActive) {
                                setOptions({...options, spreads: options.spreads.filter(item => item !== s)});
                              } else if (options.spreads.length < 3) {
                                setOptions({...options, spreads: [...options.spreads, s]});
                              }
                            } else {
                              setOptions({...options, spreads: isActive ? [] : [s]});
                            }
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bows Add-On */}
              <div className="option-group">
                <label>
                  Add-Ons
                  <span className="option-label-hint"> — tap to add</span>
                </label>
                <div className="addon-grid">
                  <button
                    className={`addon-btn ${options.bows ? 'active' : ''}`}
                    onClick={() => setOptions({...options, bows: !options.bows})}
                  >
                    <span className="addon-icon">🎀</span>
                    <span className="addon-label">Bows</span>
                    <span className="addon-price">+€{BOW_ADDON_PRICE}</span>
                  </button>
                </div>
              </div>

              {/* Message */}
              <div className="option-group">
                <label>Message / Text on Product</label>
                <input 
                  type="text" 
                  placeholder="e.g. Happy Birthday! or Custom Name" 
                  className="details-input"
                  value={options.message}
                  onChange={(e) => setOptions({...options, message: e.target.value})}
                />
              </div>

              {/* Reference Image */}
              <div className="option-group">
                <label>
                  Upload Reference Image
                  <span className="option-label-hint"> — Optional</span>
                </label>
                <div className="file-upload-wrapper">
                  <input 
                    type="file" 
                    id="ref-image" 
                    accept="image/*"
                    onChange={(e) => setOptions({...options, refImage: e.target.files[0]})}
                    className="file-input-hidden"
                  />
                  <label htmlFor="ref-image" className="file-upload-label">
                    {options.refImage ? (
                      <span className="file-name-display"><ImageIcon size={18} /> {options.refImage.name}</span>
                    ) : (
                      <span className="upload-prompt"><Upload size={18} /> Choose inspiration image</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="option-group">
                <label>Special Instructions & Details</label>
                <textarea 
                  placeholder="Any allergies, specific color requests, or other details?" 
                  className="details-textarea"
                  value={options.notes}
                  onChange={(e) => setOptions({...options, notes: e.target.value})}
                ></textarea>
              </div>

              {/* ── Live Price Breakdown ── */}
              <div className="price-breakdown">
                <h4 className="price-breakdown-title">Order Summary</h4>
                <div className="price-breakdown-rows">
                  <div className="price-row">
                    <span className="price-row-label">{product.name}</span>
                    <span className="price-row-value">€{basePrice.toFixed(2)}</span>
                  </div>

                  {options.spread && (
                    <div className="price-row price-row-addon">
                      <span className="price-row-label">↳ Spread: {options.spread}</span>
                      <span className="price-row-value price-row-free">Included</span>
                    </div>
                  )}

                  {options.bows && (
                    <div className="price-row price-row-addon">
                      <span className="price-row-label">↳ Bows 🎀</span>
                      <span className="price-row-value">+€{BOW_ADDON_PRICE.toFixed(2)}</span>
                    </div>
                  )}

                  {quantity > 1 && (
                    <div className="price-row price-row-addon">
                      <span className="price-row-label">↳ Qty × {quantity}</span>
                      <span className="price-row-value">€{unitTotal.toFixed(2)} each</span>
                    </div>
                  )}

                  <div className="price-row price-row-total">
                    <span className="price-row-label">Total</span>
                    <span className="price-row-value">€{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Quantity + Confirm */}
              <div className="quantity-checkout-row">
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={20} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}><Plus size={20} /></button>
                </div>
                <button 
                  className="add-to-order-final-btn"
                  onClick={() => onConfirm({ ...product, quantity, options })}
                >
                  Add to Order • €{grandTotal.toFixed(2)}
                </button>
              </div>

            </div>

            {isCake && <CakeCareGuide />}
          </div>
        </div>
      </div>
    </div>
  );
}
