import React from 'react';
import { Box, Move, Truck, Clock, Refrigerator, Archive } from 'lucide-react';
import './CakeCareGuide.css';

const CakeCareGuide = () => {
  const instructions = [
    {
      icon: <Box className="care-icon" />,
      title: "Handle with Care",
      desc: "Pickup and carry from the bottom only. Never from the top or sides."
    },
    {
      icon: <Move className="care-icon" />,
      title: "Stay Level",
      desc: "Keep cake level at all times - during transport, storage and display."
    },
    {
      icon: <Truck className="care-icon" />,
      title: "Cool Transport",
      desc: "Use an AC vehicle. Drive slowly, avoiding sudden stops and turns."
    },
    {
      icon: <Refrigerator className="care-icon" />,
      title: "Storage",
      desc: "Store in the fridge. Keep away from direct sunlight, moisture and heat."
    },
    {
      icon: <Clock className="care-icon" />,
      title: "Serving",
      desc: "Take out 1-2h before serving and serve at room temperature."
    },
    {
      icon: <Archive className="care-icon" />,
      title: "Leftovers",
      desc: "Store in an airtight container in the fridge for up to 4 days."
    }
  ];

  return (
    <div className="cake-care-section">
      <h3 className="care-heading">Cake Handling Instructions</h3>
      <div className="care-grid">
        {instructions.map((item, idx) => (
          <div key={idx} className="care-card">
            <div className="care-icon-wrapper">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CakeCareGuide;
