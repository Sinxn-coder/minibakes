import React, { useState } from 'react';

const SafeImage = ({ src, alt, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`shimmer-loader ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        className={`image-loading ${loaded ? 'image-loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default SafeImage;
