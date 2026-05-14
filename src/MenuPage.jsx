import React, { useState, useEffect } from 'react';
import { Circle, Heart, Palette, Droplet, Flame, X, Star, AlignJustify, Sparkles, Sun, ChevronUp, ChevronDown, GripHorizontal, Flower, MessageSquare, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import './MenuPage.css';
import Cake3D from './Cake3D';

import { menuData } from './data/menuData';
import SafeImage from './components/SafeImage';

const MAX_LAYERS = 3;

const MenuCardImage = ({ item, onOpenGallery }) => {
  return (
    <>
      <SafeImage src={item.img} alt={item.name} />
      {item.images && item.images.length > 0 && (
        <button 
          className="menu-gallery-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onOpenGallery(item.images);
          }}
        >
          <ImageIcon size={16} />
          View Gallery
        </button>
      )}
    </>
  );
};

export default function MenuPage({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("Cakes");
  const [cakeLayers, setCakeLayers] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);

  const [galleryImages, setGalleryImages] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (images) => {
    setGalleryImages(images);
    setGalleryIndex(0);
  };

  const addLayer = (type) => {
    if (cakeLayers.length >= MAX_LAYERS) {
      setToastMessage(`Maximum ${MAX_LAYERS} layers allowed!`);
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setCakeLayers(prev => {
      const newLayers = [...prev, { type }];
      setSelectedLayerIndex(newLayers.length - 1);
      return newLayers;
    });
  };

  const removeLayer = (e, index) => {
    e.stopPropagation();
    setCakeLayers(prev => prev.filter((_, i) => i !== index));
    if (selectedLayerIndex === index) {
      setSelectedLayerIndex(null);
    } else if (selectedLayerIndex > index) {
      setSelectedLayerIndex(selectedLayerIndex - 1);
    }
  };

  const applyColor = (colorHex) => {
    if (selectedLayerIndex === null || cakeLayers.length === 0) {
      setToastMessage("Please select a layer below first!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setCakeLayers(prev => prev.map((layer, i) => 
      i === selectedLayerIndex ? { ...layer, color: colorHex } : layer
    ));
  };

  const toggleSpread = (spreadType) => {
    if (selectedLayerIndex === null || cakeLayers.length === 0) {
      setToastMessage("Please select a layer below first!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setCakeLayers(prev => prev.map((layer, i) => {
      if (i !== selectedLayerIndex) return layer;
      const newSpread = layer.spread === spreadType ? null : spreadType;
      return { ...layer, spread: newSpread };
    }));
  };

  const toggleDesign = (designProperty) => {
    if (selectedLayerIndex === null || cakeLayers.length === 0) {
      setToastMessage("Please select a layer below first!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setCakeLayers(prev => prev.map((layer, i) => {
      if (i !== selectedLayerIndex) return layer;
      
      const newValue = !layer[designProperty];
      const updatedLayer = { ...layer, [designProperty]: newValue };
      
      if (newValue) {
        if (designProperty === 'bottomBorder') updatedLayer.pearlBottom = false;
        if (designProperty === 'pearlBottom') updatedLayer.bottomBorder = false;
      }
      return updatedLayer;
    }));
  };

  const layerLabel = { '6round': '6" Round', '8round': '8" Round', '6heart': '6" Heart', '8heart': '8" Heart' };
  const layerIcon = (type) => type.includes('heart') ? <Heart size={16} /> : <Circle size={16} />;

  const activeData = menuData.find(c => c.category === activeCategory) || menuData[0];

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Explore our wide variety of freshly baked treats and custom creations.</p>
      </div>

      <div className="menu-categories">
        {menuData.map(cat => (
          <button 
            key={cat.category}
            className={`category-btn ${activeCategory === cat.category ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.category)}
          >
            {cat.category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {activeData.items.map(item => (
          <div key={item.id} className={`menu-card ${item.isFullWidth ? 'full-width-card' : ''}`}>
            <div className="menu-card-image">
              {item.isFullWidth ? (
                <Cake3D layers={cakeLayers} />
              ) : (
                <MenuCardImage item={item} onOpenGallery={openGallery} />
              )}
            </div>
            <div className="menu-card-content">
              {item.isFullWidth ? (
                <div className="designer-wrapper">
                  {toastMessage && (
                    <div className="toast-notification">
                      {toastMessage}
                    </div>
                  )}
                  <div className="designer-ui">
                    <div className="designer-column">
                      <h4>Layers</h4>
                      <div className="designer-options">
                        <button className="designer-card" onClick={() => addLayer('6round')}>
                          <Circle size={16} />
                          <span className="designer-card-label">6" Round</span>
                        </button>
                        <button className="designer-card" onClick={() => addLayer('8round')}>
                          <Circle size={22} />
                          <span className="designer-card-label">8" Round</span>
                        </button>
                        <button className="designer-card" onClick={() => addLayer('6heart')}>
                          <Heart size={16} />
                          <span className="designer-card-label">6" Heart</span>
                        </button>
                        <button className="designer-card" onClick={() => addLayer('8heart')}>
                          <Heart size={22} />
                          <span className="designer-card-label">8" Heart</span>
                        </button>
                      </div>
                    </div>
                    <div className="designer-column">
                      <h4>Colors</h4>
                      <div className="designer-options">
                        <button className="designer-card" onClick={() => applyColor('#F9C6C9')}>
                          <span className="color-swatch" style={{ background: '#F9C6C9' }}></span>
                          <span className="designer-card-label">Blush Pink</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#C9B1D9')}>
                          <span className="color-swatch" style={{ background: '#C9B1D9' }}></span>
                          <span className="designer-card-label">Lavender</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#B5EAD7')}>
                          <span className="color-swatch" style={{ background: '#B5EAD7' }}></span>
                          <span className="designer-card-label">Mint</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#FFEAAA')}>
                          <span className="color-swatch" style={{ background: '#FFEAAA' }}></span>
                          <span className="designer-card-label">Buttercream</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#AEC6F7')}>
                          <span className="color-swatch" style={{ background: '#AEC6F7' }}></span>
                          <span className="designer-card-label">Sky Blue</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#FFCBA4')}>
                          <span className="color-swatch" style={{ background: '#FFCBA4' }}></span>
                          <span className="designer-card-label">Peach</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#E8A598')}>
                          <span className="color-swatch" style={{ background: '#E8A598' }}></span>
                          <span className="designer-card-label">Rose Gold</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#F5E6C8')}>
                          <span className="color-swatch" style={{ background: '#F5E6C8' }}></span>
                          <span className="designer-card-label">Ivory</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#8B4513')}>
                          <span className="color-swatch" style={{ background: '#8B4513' }}></span>
                          <span className="designer-card-label">Chocolate</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#C4919E')}>
                          <span className="color-swatch" style={{ background: '#C4919E' }}></span>
                          <span className="designer-card-label">Dusty Mauve</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#9B2D30')}>
                          <span className="color-swatch" style={{ background: '#9B2D30' }}></span>
                          <span className="designer-card-label">Red Velvet</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#FFF3B0')}>
                          <span className="color-swatch" style={{ background: '#FFF3B0' }}></span>
                          <span className="designer-card-label">Lemon</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#A3B18A')}>
                          <span className="color-swatch" style={{ background: '#A3B18A' }}></span>
                          <span className="designer-card-label">Matcha</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#88A0C0')}>
                          <span className="color-swatch" style={{ background: '#88A0C0' }}></span>
                          <span className="designer-card-label">Blueberry</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#D4A373')}>
                          <span className="color-swatch" style={{ background: '#D4A373' }}></span>
                          <span className="designer-card-label">Caramel</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#B2C9AB')}>
                          <span className="color-swatch" style={{ background: '#B2C9AB' }}></span>
                          <span className="designer-card-label">Pistachio</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#F28482')}>
                          <span className="color-swatch" style={{ background: '#F28482' }}></span>
                          <span className="designer-card-label">Coral Pink</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#5E548E')}>
                          <span className="color-swatch" style={{ background: '#5E548E' }}></span>
                          <span className="designer-card-label">Deep Purple</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#CCD5AE')}>
                          <span className="color-swatch" style={{ background: '#CCD5AE' }}></span>
                          <span className="designer-card-label">Sage</span>
                        </button>
                        <button className="designer-card" onClick={() => applyColor('#E3D5CA')}>
                          <span className="color-swatch" style={{ background: '#E3D5CA' }}></span>
                          <span className="designer-card-label">Champagne</span>
                        </button>
                      </div>
                    </div>
                    <div className="designer-column">
                      <h4>Spreads</h4>
                      <div className="designer-options">
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.spread === 'Nutella' ? 'active-design' : ''}`}
                          onClick={() => toggleSpread('Nutella')}
                        >
                          <Droplet size={20} color="#3d1e16" />
                          <span className="designer-card-label">Nutella</span>
                        </button>
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.spread === 'Biscoff' ? 'active-design' : ''}`}
                          onClick={() => toggleSpread('Biscoff')}
                        >
                          <Droplet size={20} color="#b07d4b" />
                          <span className="designer-card-label">Biscoff</span>
                        </button>
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.spread === 'Pistachio' ? 'active-design' : ''}`}
                          onClick={() => toggleSpread('Pistachio')}
                        >
                          <Droplet size={20} color="#a2d187" />
                          <span className="designer-card-label">Pistachio</span>
                        </button>
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.spread === 'Kinder' ? 'active-design' : ''}`}
                          onClick={() => toggleSpread('Kinder')}
                        >
                          <Droplet size={20} color="#e8d8c8" />
                          <span className="designer-card-label">Kinder</span>
                        </button>
                      </div>
                    </div>
                    <div className="designer-column">
                      <h4>Designs</h4>
                      <div className="designer-options">
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.topBorder ? 'active-design' : ''}`}
                          onClick={() => toggleDesign('topBorder')}
                        >
                          <ChevronUp size={20} />
                          <span className="designer-card-label">Top Shell</span>
                        </button>
                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.bottomBorder ? 'active-design' : ''}`}
                          onClick={() => toggleDesign('bottomBorder')}
                        >
                          <ChevronDown size={20} />
                          <span className="designer-card-label">Bottom Shell</span>
                        </button>

                        <button 
                          className={`designer-card ${cakeLayers[selectedLayerIndex]?.flowerCluster ? 'active-design' : ''}`}
                          onClick={() => toggleDesign('flowerCluster')}
                        >
                          <Flower size={20} />
                          <span className="designer-card-label">Flower Cluster</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="designer-summary">
                    <div className="summary-header-row">
                      <p className="summary-title">Your Selection:</p>
                      
                      {selectedLayerIndex !== null && cakeLayers.length > 0 && (
                        <div className="designer-text-input-wrapper">
                          <input 
                            type="text" 
                            placeholder="Add text to cake (e.g. Love)" 
                            maxLength={15}
                            className="designer-text-input"
                            value={cakeLayers[selectedLayerIndex]?.customText || ''}
                            onChange={(e) => {
                              const text = e.target.value;
                              setCakeLayers(prev => prev.map((layer, i) => 
                                i === selectedLayerIndex ? { ...layer, customText: text } : layer
                              ));
                            }}
                          />
                          <span className="text-char-limit">
                            {(cakeLayers[selectedLayerIndex]?.customText || '').length}/15
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="summary-cards">
                      {cakeLayers.length === 0 ? (
                        <p className="summary-empty">No layers added yet. Click a layer above to start!</p>
                      ) : (
                        cakeLayers.map((layer, i) => (
                          <div 
                            key={i} 
                            className={`summary-item ${selectedLayerIndex === i ? 'selected' : ''}`}
                            onClick={() => setSelectedLayerIndex(i)}
                            style={{ cursor: 'pointer' }}
                          >
                            {layerIcon(layer.type)}
                            <span>{layerLabel[layer.type] || layer.type}</span>
                            <button className="summary-remove" onClick={(e) => removeLayer(e, i)}><X size={12} /></button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{item.name}</h3>
                  <p className="menu-card-desc">{item.description}</p>
                  <div className="menu-card-footer">
                    <span className="menu-card-price">{item.price}</span>
                    <button 
                      className="menu-add-btn" 
                      onClick={() => onSelectProduct(item)}
                    >
                      <span className="hide-on-mobile">Add to </span>Order
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Order Floating Button - Moved here to be a direct child of menu-card for perfect centering */}
            {item.isFullWidth && (
              <div className="designer-order-wrapper">
                <button 
                  className="designer-order-btn" 
                  onClick={() => onSelectProduct({ ...item, layers: cakeLayers })}
                  disabled={cakeLayers.length === 0}
                >
                  <span>ORDER</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed WhatsApp Button */}
      <a 
        href="https://wa.me/35600000000?text=Hi%20Mini%20Bakes!%20I'd%20like%20to%20make%20a%20special%20request." 
        target="_blank" 
        rel="noopener noreferrer" 
        className="menu-fixed-whatsapp"
      >
        <div className="whatsapp-icon-circle">
          <MessageSquare size={24} />
        </div>
        <div className="whatsapp-content">
          <span className="whatsapp-title">Special Request?</span>
          <span className="whatsapp-subtitle">Chat with us on WhatsApp</span>
        </div>
      </a>

      {/* Lightbox Gallery */}
      {galleryImages && (
        <div className="menu-lightbox">
          <div className="lightbox-overlay" onClick={() => setGalleryImages(null)}></div>
          <button className="lightbox-close" onClick={() => setGalleryImages(null)}>
            <X size={32} />
          </button>
          
          <button 
            className="lightbox-nav prev" 
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1));
            }}
          >
            <ChevronLeft size={36} />
          </button>

          <img 
            src={galleryImages[galleryIndex]} 
            alt="Gallery" 
            className="lightbox-img" 
          />

          <button 
            className="lightbox-nav next" 
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0));
            }}
          >
            <ChevronRight size={36} />
          </button>
          <div className="lightbox-counter">
            {galleryIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}

