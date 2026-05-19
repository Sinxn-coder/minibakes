import React, { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, Image as ImageIcon, Upload, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';
import SafeImage from './components/SafeImage';
import Cake3D from './Cake3D';
import './ProductDetailsPage.css';
import CakeCareGuide from './components/CakeCareGuide';

import style1 from './assets/style1.png';
import style2 from './assets/style2.png';
import style3 from './assets/stlye3.png'; // Note: spelling matches assets folder exactly!
import style4 from './assets/style4.png';
import style5 from './assets/style5.png';
import style6 from './assets/style6.png';
import style7 from './assets/style7.png';
import style8 from './assets/style8.png';

const detailsBackgroundPatterns = [
  // Top Area
  { img: style1, top: '5%', left: '6%', rot: 15, size: 30 },
  { img: style2, top: '8%', right: '8%', rot: -25, size: 32 },
  { img: style3, top: '4%', left: '32%', rot: 10, size: 28 },
  { img: style4, top: '6%', right: '35%', rot: -15, size: 34 },
  
  // Upper-Middle Area
  { img: style5, top: '24%', left: '12%', rot: 45, size: 28 },
  { img: style6, top: '22%', right: '15%', rot: -30, size: 32 },
  { img: style7, top: '20%', left: '50%', rot: 15, size: 30 },
  
  // Middle Area
  { img: style8, top: '45%', left: '4%', rot: -20, size: 34 },
  { img: style1, top: '48%', right: '6%', rot: 25, size: 28 },
  { img: style2, top: '42%', left: '42%', rot: -10, size: 32 },
  { img: style3, top: '52%', right: '40%', rot: 35, size: 30 },
  
  // Lower-Middle Area
  { img: style4, bottom: '28%', left: '15%', rot: -15, size: 35 },
  { img: style5, bottom: '24%', right: '18%', rot: 20, size: 28 },
  { img: style6, bottom: '22%', left: '48%', rot: -40, size: 32 },
  
  // Bottom Area
  { img: style7, bottom: '6%', left: '8%', rot: 10, size: 30 },
  { img: style8, bottom: '8%', right: '10%', rot: -25, size: 34 },
  { img: style1, bottom: '5%', left: '35%', rot: 15, size: 28 },
  { img: style2, bottom: '4%', right: '32%', rot: -10, size: 32 }
];

const WhatsAppIcon = ({ size = 16, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.432-9.877 9.881-9.877 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.448-4.435 9.878-9.883 9.878m0-21.867C6.435.056.1.493.1 12.226c0 2.124.549 4.198 1.595 6.037L0 24l5.893-1.547a12.19 12.19 0 005.77 1.468h.005c6.12 0 12.1-5.437 12.1-12.226 0-3.27-1.272-6.342-3.582-8.652A12.134 12.134 0 0012.051.055z"/>
  </svg>
);

export default function ProductDetailsPage({ product, onBack, onConfirm, cartCount, onOpenCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [warningNotification, setWarningNotification] = useState('');
  const displayImg = product?.img;
  const [options, setOptions] = useState({
    flavor: '',
    spreads: [], // Changed to array for multi-select support
    message: '',
    innerMessage: '',
    notes: '',
    bows: false,
    individualPackaging: false,
    boxSize: product?.options ? product.options[0].value : ''
  });

  const BOW_ADDON_PRICE = 5;

  if (!product) return null;

  const productId = product?.id || '';
  const isCake = productId.startsWith('c') && !productId.startsWith('cu') && !productId.startsWith('cp');
  const isCupcake = productId.startsWith('cu');
  const isCakePop = productId.startsWith('cp');
  const isMiniCake = productId.startsWith('mc');
  const isBrownie = productId.startsWith('t1') || productId === 'brownies-box';
  const isBreakableHeart = productId.startsWith('t2');
  const isCakesicleBulk = productId === 'cakesicles-bulk';
  const hasSpreads = isCake || isMiniCake || isBrownie || isCupcake;

  const minQty = isMiniCake ? 4 : 1;

  useEffect(() => {
    if (product) {
      setQuantity(minQty);
    }
  }, [product, minQty]);

  const handleDecrement = () => {
    if (quantity <= minQty) {
      if (isMiniCake) {
        setWarningNotification('Minimum order for Mini Cakes is 4 pieces.');
      } else {
        setWarningNotification(`Minimum order for this item is ${minQty} piece.`);
      }
      setTimeout(() => setWarningNotification(''), 3000);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const flavors = isCake || isCupcake || productId.startsWith('cp') || productId.startsWith('t3') || productId.startsWith('t4') || isBreakableHeart || isCakesicleBulk
                  ? ['Vanilla', 'Chocolate', 'Red Velvet'] : 
                  ['Classic Chocolate'];

  const spreads = isCake 
    ? ['Nutella', 'Biscoff', 'Pistachio', 'Kinder', 'White Chocolate', 'Ferrero Rocher']
    : ['Nutella', 'Biscoff', 'Pistachio', 'Kinder'];

  const basePrice = parseFloat((product?.price || '0').replace(/[^\d.]/g, '')) || 0;
  
  let currentUnitPrice = basePrice;
  if (isCakesicleBulk) {
    currentUnitPrice = quantity >= 20 ? 2.40 : 2.60;
  }

  // Calculate cupcakes count per box to apply correct spread addon pricing
  let cupcakesPerBox = 1;
  if (productId === 'cu1' || productId === 'cu4') {
    cupcakesPerBox = 6;
  } else if (productId === 'cu2' || productId === 'cu5') {
    cupcakesPerBox = 12;
  }

  const isWhiteChocolateCupcake = ['cu4', 'cu5', 'cu6'].includes(productId);
  const spreadsPrice = (isCupcake && options.spreads.length > 0) ? (0.45 * cupcakesPerBox) : 0;
  const packagingPrice = (isWhiteChocolateCupcake && options.individualPackaging) ? (0.15 * cupcakesPerBox) : 0;

  const bowsTotal = options.bows ? BOW_ADDON_PRICE : 0;
  const unitTotal = currentUnitPrice + bowsTotal + spreadsPrice + packagingPrice;
  const grandTotal = unitTotal * quantity;

  return (
    <div className="product-details-page">
      {showNotification && (
        <div className="added-notification">
          <CheckCircle2 size={18} className="notification-icon" />
          Successfully added to your order!
        </div>
      )}
      {warningNotification && (
        <div className="added-notification" style={{ background: '#d32f2f', boxShadow: '0 10px 30px rgba(211, 47, 47, 0.3)' }}>
          <AlertCircle size={18} className="notification-icon" />
          <span>{warningNotification}</span>
        </div>
      )}
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
            {/* Scattered premium brand icons in background */}
            {detailsBackgroundPatterns.map((item, idx) => (
              <img
                key={idx}
                src={item.img}
                className="details-decor-icon"
                style={{
                  position: 'absolute',
                  top: item.top || 'auto',
                  bottom: item.bottom || 'auto',
                  left: item.left || 'auto',
                  right: item.right || 'auto',
                  width: `${item.size || 30}px`,
                  height: 'auto',
                  opacity: 0.16, // Very subtle, elegant, premium dust texture
                  transform: `rotate(${item.rot}deg)`,
                  pointerEvents: 'none',
                  zIndex: 0
                }}
                alt=""
              />
            ))}

            {product.layers ? (
              <div className="details-3d-wrapper" style={{ position: 'relative', zIndex: 2 }}>
                <Cake3D layers={product.layers} />
              </div>
            ) : (
              <SafeImage src={displayImg} alt={product.name} key={displayImg} className="main-details-img" />
            )}
          </div>

          <div className="details-info-side">
            <h1 className="details-title">{product.name}</h1>
            <p className="details-price">{product.price}</p>
            <p className="details-description">{product.description}</p>

            <div className="customization-section">

              {/* Product Options (e.g. Box Size) */}
              {product.options && (
                <div className="option-group">
                  <label>Select Box Size</label>
                  <div className="option-grid">
                    {product.options.map(opt => (
                      <button 
                        key={opt.value}
                        className={`option-btn ${options.boxSize === opt.value ? 'active' : ''}`}
                        onClick={() => setOptions({...options, boxSize: opt.value})}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {isBrownie && (
                    <div className="brownie-notice-box" style={{ 
                      background: 'rgba(128, 0, 0, 0.035)', 
                      border: '1px solid rgba(128, 0, 0, 0.12)', 
                      borderRadius: '12px', 
                      padding: '12px 16px', 
                      marginTop: '12px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start'
                    }}>
                      <AlertCircle size={16} style={{ color: '#6b1111', flexShrink: 0, marginTop: '2px' }} />
                      <p className="brownie-batch-note" style={{ 
                        fontSize: '12px', 
                        color: '#6b1111', 
                        margin: 0, 
                        fontWeight: '500', 
                        lineHeight: '1.5',
                        textAlign: 'left'
                      }}>
                        <strong>Important Note:</strong> Standard batch size is 22cm x 22cm. Depending on the quantity selected (6, 9, 12, etc.), each brownie piece will be adjusted in size accordingly.
                      </p>
                    </div>
                  )}
                </div>
              )}

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

              {/* Spread — cakes and cupcakes, toggle-able */}
              {hasSpreads && (
                <div className="option-group">
                  <label>
                    {isCupcake ? 'Select Inner Spread' : (isBrownie ? 'Select Spreads (Up to 3)' : 'Inner Spread')}
                    <span className="option-label-hint">
                      {isCupcake ? ' — +€0.45 per cupcake' : (isBrownie ? ' — Choose up to 3' : ' — Included')}
                    </span>
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

              {/* Add-Ons */}
              {((!isCupcake || isWhiteChocolateCupcake) && !isCakePop && !isBrownie && !isBreakableHeart) && (
                <div className="option-group">
                  <label>
                    Add-Ons
                    <span className="option-label-hint"> — tap to add</span>
                  </label>
                  <div className="addon-grid">
                    {!isCupcake && !isCakePop && !isBrownie && !isBreakableHeart && (
                      <button
                        className={`addon-btn ${options.bows ? 'active' : ''}`}
                        onClick={() => setOptions({...options, bows: !options.bows})}
                      >
                        <span className="addon-icon">🎀</span>
                        <span className="addon-label">Bows</span>
                        <span className="addon-price">+€{BOW_ADDON_PRICE}</span>
                      </button>
                    )}

                    {isWhiteChocolateCupcake && (
                      <button
                        className={`addon-btn ${options.individualPackaging ? 'active' : ''}`}
                        onClick={() => setOptions({...options, individualPackaging: !options.individualPackaging})}
                      >
                        <span className="addon-icon">📦</span>
                        <span className="addon-label">Individual Packaging</span>
                        <span className="addon-price">+€{(0.15 * cupcakesPerBox).toFixed(2)}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              {!isCupcake && !isCakePop && (
                <div className="option-group">
                  <label>{isBreakableHeart ? 'Message / Text on Heart' : 'Message / Text on Product'}</label>
                  <input 
                    type="text" 
                    placeholder={isBreakableHeart ? "e.g. HBD Sarah! or Custom Name" : "e.g. Happy Birthday! or Custom Name"} 
                    className="details-input"
                    value={options.message}
                    onChange={(e) => setOptions({...options, message: e.target.value})}
                  />
                </div>
              )}

              {/* Message Inside the Heart (Only for Breakable Heart) */}
              {isBreakableHeart && (
                <div className="option-group animate-in fade-in slide-in-from-top-1">
                  <label>Personalised Message Inside the Heart</label>
                  <textarea 
                    placeholder="Write a secret note to be placed inside the breakable chocolate heart box... (included)" 
                    className="details-input"
                    style={{ minHeight: '80px', resize: 'vertical', paddingTop: '10px', fontFamily: 'inherit' }}
                    value={options.innerMessage || ''}
                    onChange={(e) => setOptions({...options, innerMessage: e.target.value})}
                  />
                </div>
              )}

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
                    <span className="price-row-value">
                      {currentUnitPrice === 0 ? (
                        <span 
                          className="price-wa-tag tooltip-trigger" 
                          data-tooltip="We will provide the final quote for this custom design via WhatsApp once your order is received."
                        >
                          <WhatsAppIcon size={14} />
                          <span>WA</span>
                        </span>
                      ) : `€${currentUnitPrice.toFixed(2)}`}
                    </span>
                  </div>

                  {options.spreads && options.spreads.length > 0 && (
                    <div className="price-row price-row-addon">
                      <span className="price-row-label">↳ Spreads: {options.spreads.join(', ')}</span>
                      <span className="price-row-value">
                        {isCupcake ? `+€${spreadsPrice.toFixed(2)}` : 'Included'}
                      </span>
                    </div>
                  )}

                  {isWhiteChocolateCupcake && options.individualPackaging && (
                    <div className="price-row price-row-addon">
                      <span className="price-row-label">↳ Individual Packaging 📦</span>
                      <span className="price-row-value">+€{packagingPrice.toFixed(2)}</span>
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
                    <span className="price-row-value">
                      {grandTotal === 0 ? (
                        <span 
                          className="price-wa-tag tooltip-trigger" 
                          data-tooltip="Total includes items that will be quoted via WhatsApp."
                        >
                          <WhatsAppIcon size={14} />
                          <span>WA</span>
                        </span>
                      ) : `€${grandTotal.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity + Confirm */}
              <div className="quantity-checkout-wrapper" style={{ width: '100%' }}>
                <div className="quantity-checkout-row">
                  <div className="quantity-selector">
                    <button onClick={handleDecrement}><Minus size={20} /></button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}><Plus size={20} /></button>
                  </div>
                  <button 
                    className="add-to-order-final-btn"
                    onClick={() => {
                      onConfirm({ ...product, quantity, options });
                      setShowNotification(true);
                      setTimeout(() => setShowNotification(false), 3000);
                    }}
                  >
                    Add to Order • {grandTotal === 0 ? (
                      <span 
                        className="price-wa-tag tooltip-trigger" 
                        style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '5px' }}
                        data-tooltip="Final price will be provided via WhatsApp."
                      >
                        <WhatsAppIcon size={14} />
                        <span style={{ marginLeft: '4px' }}>WA</span>
                      </span>
                    ) : `€${grandTotal.toFixed(2)}`}
                  </button>
                </div>
                {isMiniCake && (
                  <div className="min-order-alert-note" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b71c1c', fontSize: '0.85rem', fontWeight: '600', marginTop: '10px', justifyContent: 'center' }}>
                    <AlertCircle size={14} />
                    <span>Minimum order: 4 Mini Cakes required</span>
                  </div>
                )}
              </div>

            </div>

            {isCake && <CakeCareGuide />}
          </div>
        </div>
      </div>
    </div>
  );
}
