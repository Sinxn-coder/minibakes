import React from 'react';
import './OvenLoader.css';

const OvenLoader = () => {
  return (
    <div className="oven-loader-container">
      <div className="oven-loader-wrapper">
        
        {/* The Oven Structure */}
        <div className="oven-shaker">
          <div className="oven-body">
            
            {/* Top control panel */}
            <div className="oven-controls">
              <div className="knob"></div>
              <div className="knob"></div>
              <div className="digital-display">180°</div>
              <div className="knob"></div>
            </div>

            {/* Inner cavity (glowing part) */}
            <div className="oven-cavity">
              <div className="oven-light"></div>
              
              {/* Tray that moves in and out */}
              <div className="oven-tray">
                <div className="baking-item">
                  <div className="cupcake-base"></div>
                  <div className="cupcake-frosting"></div>
                </div>
              </div>
            </div>

            {/* The Door (flips down) */}
            <div className="oven-door">
              <div className="door-handle"></div>
              <div className="door-window"></div>
            </div>
            
          </div>
        </div>

        <h3 className="loading-text">Baking your dashboard<span>.</span><span>.</span><span>.</span></h3>
      </div>
    </div>
  );
};

export default OvenLoader;
