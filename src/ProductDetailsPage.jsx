import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import SafeImage from './components/SafeImage';
import Cake3D from './Cake3D';
import './ProductDetailsPage.css';

export default function ProductDetailsPage({ product, onBack, onConfirm }) {
  const [quantity, setQuantity] = useState(1);
  const [options, setOptions] = useState({
    flavor: '',
    spread: '',
    message: '',
    notes: '',
    bows: false
  });

  const BOW_ADDON_PRICE = 5;

  if (!product) return null;

  const productId = product?.id || '';
  const isCake = productId.startsWith('c');
  const isCupcake = productId.startsWith('cu');

  const flavors = isCake ? ['Vanilla', 'Chocolate', 'Red Velvet', 'Strawberry'] : 
                 isCupcake ? ['Vanilla Bean', 'Chocolate Indulgence', 'Strawberry Dream', 'Red Velvet'] : 
                 ['Classic Chocolate', 'Sea Salt Caramel', 'Hazelnut'];

  const spreads = ['Lotus Biscoff', 'Nutella', 'Strawberry Jam', 'Salted Caramel'];

  return (
    <div className="product-details-page">
      <div className="details-container">
        <button className="back-btn-details" onClick={onBack}>
          <ArrowLeft size={24} /> <span>Back to browsing</span>
        </button>

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

              {isCake && (
                <div className="option-group">
                  <label>Inner Spread (Optional)</label>
                  <div className="option-grid">
                    {spreads.map(s => (
                      <button 
                        key={s} 
                        className={`option-btn ${options.spread === s ? 'active' : ''}`}
                        onClick={() => setOptions({...options, spread: s})}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bows Add-On */}
              <div className="option-group">
                <label>Add-Ons (Optional)</label>
                <div className="addon-grid">
                  <button
                    className={`addon-btn ${options.bows ? 'active' : ''}`}
                    onClick={() => setOptions({...options, bows: !options.bows})}
                  >
                    <span className="addon-icon">🎀</span>
                    <span className="addon-label">Bows</span>
                    <span className="addon-price">+€5</span>
                  </button>
                </div>
              </div>

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

              <div className="option-group">
                <label>Upload Reference Image (Optional)</label>
                <div className="file-upload-wrapper">
                  <input 
                    type="file" 
                    id="ref-image" 
                    accept="image/*"
                    onChange={(e) => setOptions({...options, refImage: e.target.files[0]})}
                    className="file-input-hidden"
                  />
                  <label htmlFor="ref-image" className="file-upload-label">
                    {options.refImage ? `✓ ${options.refImage.name}` : 'Choose an image from gallery'}
                  </label>
                </div>
              </div>

              <div className="option-group">
                <label>Special Instructions & Details</label>
                <textarea 
                  placeholder="Any allergies, specific color requests, or other details?" 
                  className="details-textarea"
                  value={options.notes}
                  onChange={(e) => setOptions({...options, notes: e.target.value})}
                ></textarea>
              </div>

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
                  Confirm Order • €{(((parseFloat(product.price.replace(/[^\d.]/g, '')) || 0) + (options.bows ? BOW_ADDON_PRICE : 0)) * quantity).toFixed(2) || '0.00'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
