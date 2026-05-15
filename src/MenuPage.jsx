import React, { useState, useEffect } from 'react';
import { Circle, Heart, Palette, Droplet, Flame, X, Star, AlignJustify, Sparkles, Sun, ChevronUp, ChevronDown, GripHorizontal, Flower, MessageSquare, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import './MenuPage.css';
import Cake3D from './Cake3D';

import { menuData } from './data/menuData';
import SafeImage from './components/SafeImage';

const MAX_LAYERS = 3;

const MenuCard = ({ item, cakeLayers, setCakeLayers, selectedLayerIndex, setSelectedLayerIndex, addLayer, removeLayer, applyColor, toggleSpread, toggleDesign, toastMessage, onSelectProduct, openGallery }) => (
  <div className={`menu-card ${item.isFullWidth ? 'full-width-card' : ''}`}>
    <div className="menu-card-image">
      {item.isFullWidth ? (
        <Cake3D layers={cakeLayers} />
      ) : (
        <SafeImage src={item.img} alt={item.name} />
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
                {['#F9C6C9', '#C9B1D9', '#B5EAD7', '#FFEAAA', '#AEC6F7', '#FFCBA4', '#E8A598', '#F5E6C8', '#8B4513', '#C4919E', '#9B2D30', '#FFF3B0', '#A3B18A', '#88A0C0', '#D4A373', '#B2C9AB', '#F28482', '#5E548E', '#CCD5AE', '#E3D5CA'].map(color => (
                  <button key={color} className="designer-card" onClick={() => applyColor(color)}>
                    <span className="color-swatch" style={{ background: color }}></span>
                    <span className="designer-card-label">{
                      color === '#F9C6C9' ? 'Blush Pink' :
                      color === '#C9B1D9' ? 'Lavender' :
                      color === '#B5EAD7' ? 'Mint' :
                      color === '#FFEAAA' ? 'Buttercream' :
                      color === '#AEC6F7' ? 'Sky Blue' :
                      color === '#FFCBA4' ? 'Peach' :
                      color === '#E8A598' ? 'Rose Gold' :
                      color === '#F5E6C8' ? 'Ivory' :
                      color === '#8B4513' ? 'Chocolate' :
                      color === '#C4919E' ? 'Dusty Mauve' :
                      color === '#9B2D30' ? 'Red Velvet' :
                      color === '#FFF3B0' ? 'Lemon' :
                      color === '#A3B18A' ? 'Matcha' :
                      color === '#88A0C0' ? 'Blueberry' :
                      color === '#D4A373' ? 'Caramel' :
                      color === '#B2C9AB' ? 'Pistachio' :
                      color === '#F28482' ? 'Coral Pink' :
                      color === '#5E548E' ? 'Deep Purple' :
                      color === '#CCD5AE' ? 'Sage' :
                      'Champagne'
                    }</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="designer-column">
              <h4>Spreads</h4>
              <div className="designer-options">
                {[
                  { name: 'Nutella', color: '#3d1e16' },
                  { name: 'Biscoff', color: '#b07d4b' },
                  { name: 'Pistachio', color: '#a2d187' },
                  { name: 'Kinder', color: '#e8d8c8' }
                ].map(spread => (
                  <button 
                    key={spread.name}
                    className={`designer-card ${cakeLayers[selectedLayerIndex]?.spread === spread.name ? 'active-design' : ''}`}
                    onClick={() => toggleSpread(spread.name)}
                  >
                    <Droplet size={20} color={spread.color} />
                    <span className="designer-card-label">{spread.name}</span>
                  </button>
                ))}
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
);

const layerLabel = { '6round': '6" Round', '8round': '8" Round', '6heart': '6" Heart', '8heart': '8" Heart' };
const layerIcon = (type) => type.includes('heart') ? <Heart size={16} /> : <Circle size={16} />;

export default function MenuPage({ onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState("Cakes");
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [cakeLayers, setCakeLayers] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);

  useEffect(() => {
    const data = menuData.find(c => c.category === activeCategory);
    if (data?.sections) {
      setActiveSubcategory(data.sections[0].title);
    } else {
      setActiveSubcategory(null);
    }
  }, [activeCategory]);

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

      {activeData.sections && (
        <div className="menu-subcategory-selector">
          {activeData.sections.map(section => (
            <button 
              key={section.title}
              className={`subcategory-btn ${activeSubcategory === section.title ? 'active' : ''}`}
              onClick={() => setActiveSubcategory(section.title)}
            >
              {section.title}
              <div className="subcategory-indicator" />
            </button>
          ))}
        </div>
      )}

      <div className="menu-grid">
        {activeData.sections ? (
          activeData.sections
            .filter(section => section.title === activeSubcategory)
            .map(section => (
              <React.Fragment key={section.title}>
                {section.items.map(item => (
                  <MenuCard 
                    key={item.id}
                    item={item}
                    cakeLayers={cakeLayers}
                    setCakeLayers={setCakeLayers}
                    selectedLayerIndex={selectedLayerIndex}
                    setSelectedLayerIndex={setSelectedLayerIndex}
                    addLayer={addLayer}
                    removeLayer={removeLayer}
                    applyColor={applyColor}
                    toggleSpread={toggleSpread}
                    toggleDesign={toggleDesign}
                    toastMessage={toastMessage}
                    onSelectProduct={onSelectProduct}
                    openGallery={openGallery}
                  />
                ))}
              </React.Fragment>
            ))
        ) : (
          activeData.items.map(item => (
            <MenuCard 
              key={item.id}
              item={item}
              cakeLayers={cakeLayers}
              setCakeLayers={setCakeLayers}
              selectedLayerIndex={selectedLayerIndex}
              setSelectedLayerIndex={setSelectedLayerIndex}
              addLayer={addLayer}
              removeLayer={removeLayer}
              applyColor={applyColor}
              toggleSpread={toggleSpread}
              toggleDesign={toggleDesign}
              toastMessage={toastMessage}
              onSelectProduct={onSelectProduct}
              openGallery={openGallery}
            />
          ))
        )}
      </div>

      {/* Fixed Cake Gallery Button */}
      {activeCategory === "Cakes" && (
        <button 
          className="menu-fixed-gallery-btn"
          onClick={() => {
            const cakeCat = menuData.find(c => c.category === "Cakes");
            if (!cakeCat) return;
            const items = cakeCat.items || (cakeCat.sections ? cakeCat.sections.flatMap(s => s.items) : []);
            const allCakeImages = Array.from(new Set(
              items.flatMap(item => item.images || [])
            ));
            if (allCakeImages.length > 0) {
              openGallery(allCakeImages);
            }
          }}
        >
          <div className="whatsapp-icon-circle gallery-circle">
            <ImageIcon size={24} />
          </div>
          <div className="whatsapp-content">
            <span className="whatsapp-title">Cake Gallery</span>
            <span className="whatsapp-subtitle">View all our designs</span>
          </div>
        </button>
      )}

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

