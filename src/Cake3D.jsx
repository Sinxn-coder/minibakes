import React, { useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';


// --- Layer size config ---
const BASE_RADIUS = 1.35; // constant base width
const LAYER_HEIGHTS = { '6': 0.98, '8': 0.95 }; // '8' is wider, '6' is taller proportionally
const SHRINK_FACTOR = 0.82; // each stacked layer is 82% of the one below

// --- Heart shape helper ---
function createHeartShape(size) {
  const shape = new THREE.Shape();
  const s = size;
  
  // Start at the top center indent
  shape.moveTo(0, s * 0.25);
  
  // Left top lobe
  shape.bezierCurveTo(
    -s * 0.1, s * 0.85, 
    -s * 1.15, s * 0.85, 
    -s * 1.15, s * 0.1
  );
  
  // Left bottom sweep to the tip
  shape.bezierCurveTo(
    -s * 1.15, -s * 0.4, 
    -s * 0.5, -s * 0.8, 
    0, -s * 1.05
  );
  
  // Right bottom sweep from the tip
  shape.bezierCurveTo(
    s * 0.5, -s * 0.8, 
    s * 1.15, -s * 0.4, 
    s * 1.15, s * 0.1
  );
  
  // Right top lobe
  shape.bezierCurveTo(
    s * 1.15, s * 0.85, 
    s * 0.1, s * 0.85, 
    0, s * 0.25
  );

  return shape;
}

// --- 1. Shell Border (Classic) ---
function ShellBorder({ curve, radius, count, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const geo = useMemo(() => {
    const baseRadius = 0.08 * scaleMultiplier;
    const g = new THREE.SphereGeometry(baseRadius, 64, 64); 
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i); let y = pos.getY(i); let z = pos.getZ(i);
      let angle = Math.atan2(z, x);
      let normalizedY = y / baseRadius; // -1 to 1
      let t = (normalizedY + 1) / 2; // 0 to 1
      
      // More realistic shell profile: fat at back, tapering to tail
      let profile = 0.1 + 0.9 * Math.sin(t * Math.PI * 0.8); 
      
      // Deeper ridges for 3D realism
      let ridge = 1 + (0.35 * Math.sin(t * Math.PI) * Math.cos(angle * 14));
      
      x *= profile * ridge; 
      z *= profile * ridge;
      
      // Elegant twist
      let twist = t * 1.5; 
      let tx = x * Math.cos(twist) - z * Math.sin(twist);
      let tz = x * Math.sin(twist) + z * Math.cos(twist);
      pos.setX(i, tx); pos.setZ(i, tz);
    }
    g.computeVertexNormals();
    g.rotateX(Math.PI / 2);
    g.translate(0, -baseRadius * 0.5, 0); // Move piping down to side of cake
    return g;
  }, [scaleMultiplier]);

  const dollops = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      let pos = new THREE.Vector3();
      let tangent = new THREE.Vector3();
      if (curve) {
        const t = i / count;
        pos = curve.getPointAt(t);
        tangent = curve.getTangentAt(t);
        pos.set(pos.x, yOffset, -pos.y);
        tangent.set(tangent.x, 0, -tangent.y);
        if (inset !== 0) {
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
          pos.addScaledVector(normal, inset);
        }
      } else {
        const angle = (i / count) * Math.PI * 2;
        const actualRadius = radius - inset;
        pos.set(Math.cos(angle) * actualRadius, yOffset, Math.sin(angle) * actualRadius);
        tangent.set(-Math.sin(angle), 0, Math.cos(angle));
      }
      const dummy = new THREE.Object3D();
      dummy.position.copy(pos);
      dummy.lookAt(pos.clone().add(tangent));
      dummy.rotateX(0); // Align piping to side, no upward tilt
      dummy.updateMatrix();
      arr.push(
        <mesh key={i} position={dummy.position} quaternion={dummy.quaternion} scale={[1, 0.9, 1.4]} geometry={geo} castShadow>
          <meshStandardMaterial color={color} roughness={0.25} metalness={0.05} />
        </mesh>
      );
    }
    return arr;
  }, [count, curve, radius, yOffset, color, inset, geo]);

  return <group>{dollops}</group>;
}

// --- 2. Pearl Bead Border ---
function PearlBorder({ curve, radius, count, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const geo = useMemo(() => new THREE.SphereGeometry(0.06 * scaleMultiplier, 32, 32), [scaleMultiplier]);
  
  const pearls = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      let pos = new THREE.Vector3();
      if (curve) {
        const t = i / count;
        pos = curve.getPointAt(t);
        let tangent = curve.getTangentAt(t);
        pos.set(pos.x, yOffset, -pos.y);
        if (inset !== 0) {
          const normal = new THREE.Vector3(-tangent.x, 0, tangent.y).normalize();
          pos.addScaledVector(normal, inset);
        }
      } else {
        const angle = (i / count) * Math.PI * 2;
        const actualRadius = radius - inset;
        pos.set(Math.cos(angle) * actualRadius, yOffset, Math.sin(angle) * actualRadius);
      }
      arr.push(
        <mesh key={i} position={pos} scale={[1, 0.9, 1]} geometry={geo} castShadow>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        </mesh>
      );
    }
    return arr;
  }, [count, curve, radius, yOffset, color, inset, geo]);

  return <group>{pearls}</group>;
}

// --- 3. Rope Border ---
function RopeBorder({ curve, radius, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const strands = useMemo(() => {
    const segments = 200;
    const pathPoints1 = [];
    const pathPoints2 = [];
    const strandRadius = 0.04 * scaleMultiplier;
    const twists = 40;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let pos = new THREE.Vector3();
      let tangent = new THREE.Vector3();
      let normal = new THREE.Vector3();

      if (curve) {
        pos = curve.getPointAt(t);
        tangent = curve.getTangentAt(t);
        pos.set(pos.x, yOffset, -pos.y);
        tangent.set(tangent.x, 0, -tangent.y);
        normal.set(-tangent.z, 0, tangent.x).normalize();
        if (inset !== 0) {
          pos.addScaledVector(normal, inset);
        }
      } else {
        const angle = t * Math.PI * 2;
        const actualRadius = radius - inset;
        pos.set(Math.cos(angle) * actualRadius, yOffset, Math.sin(angle) * actualRadius);
        tangent.set(-Math.sin(angle), 0, Math.cos(angle));
        normal.set(Math.cos(angle), 0, Math.sin(angle));
      }

      const up = new THREE.Vector3(0, 1, 0);
      const angleOffset = t * Math.PI * 2 * twists;
      
      const p1 = pos.clone().add(normal.clone().multiplyScalar(Math.cos(angleOffset) * strandRadius * 0.8))
                          .add(up.clone().multiplyScalar(Math.sin(angleOffset) * strandRadius * 0.8));
      const p2 = pos.clone().add(normal.clone().multiplyScalar(Math.cos(angleOffset + Math.PI) * strandRadius * 0.8))
                          .add(up.clone().multiplyScalar(Math.sin(angleOffset + Math.PI) * strandRadius * 0.8));
      
      pathPoints1.push(p1);
      pathPoints2.push(p2);
    }

    const curve1 = new THREE.CatmullRomCurve3(pathPoints1);
    const curve2 = new THREE.CatmullRomCurve3(pathPoints2);

    return [
      <mesh key="s1" castShadow><tubeGeometry args={[curve1, segments, strandRadius, 16, false]} /><meshStandardMaterial color={color} roughness={0.3} metalness={0.02} /></mesh>,
      <mesh key="s2" castShadow><tubeGeometry args={[curve2, segments, strandRadius, 16, false]} /><meshStandardMaterial color={color} roughness={0.3} metalness={0.02} /></mesh>
    ];
  }, [curve, radius, yOffset, color, inset, scaleMultiplier]);

  return <group>{strands}</group>;
}

// --- 4. Zigzag Ribbon Border ---
function ZigzagBorder({ curve, radius, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const ribbon = useMemo(() => {
    const segments = 200;
    const pathPoints = [];
    const zigzags = 35;
    const amplitude = 0.05 * scaleMultiplier;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      let pos = new THREE.Vector3();
      let tangent = new THREE.Vector3();
      let normal = new THREE.Vector3();

      if (curve) {
        pos = curve.getPointAt(t);
        tangent = curve.getTangentAt(t);
        pos.set(pos.x, yOffset, -pos.y);
        tangent.set(tangent.x, 0, -tangent.y);
        normal.set(-tangent.z, 0, tangent.x).normalize();
        if (inset !== 0) pos.addScaledVector(normal, inset);
      } else {
        const angle = t * Math.PI * 2;
        const actualRadius = radius - inset;
        pos.set(Math.cos(angle) * actualRadius, yOffset, Math.sin(angle) * actualRadius);
        tangent.set(-Math.sin(angle), 0, Math.cos(angle));
        normal.set(Math.cos(angle), 0, Math.sin(angle));
      }

      const wave = Math.sin(t * Math.PI * 2 * zigzags);
      pos.add(normal.multiplyScalar(wave * amplitude));
      pathPoints.push(pos);
    }

    const zigzagCurve = new THREE.CatmullRomCurve3(pathPoints);
    return (
      <mesh castShadow>
        <tubeGeometry args={[zigzagCurve, segments, 0.04 * scaleMultiplier, 16, false]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />
      </mesh>
    );
  }, [curve, radius, yOffset, color, inset, scaleMultiplier]);

  return <group>{ribbon}</group>;
}

// --- 5. Rosette Swirl Border ---
function RosetteBorder({ curve, radius, count, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const geo = useMemo(() => {
    const height = 0.15 * scaleMultiplier;
    const g = new THREE.CylinderGeometry(0.01, 0.12 * scaleMultiplier, height, 64, 8);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i); let y = pos.getY(i); let z = pos.getZ(i);
      let angle = Math.atan2(z, x);
      let r = Math.sqrt(x*x + z*z);
      
      // Star ridges for piping tip effect
      r *= 1 + 0.2 * Math.cos(angle * 6);
      
      // Twist and profile for rosette look
      let normalizedY = (y + (height / 2)) / height; // 0 to 1
      let twist = normalizedY * Math.PI * 3.5; 
      
      // Bulbous shape in the middle
      let profile = Math.sin(normalizedY * Math.PI);
      r *= profile * 1.3;

      let tx = r * Math.cos(angle + twist);
      let tz = r * Math.sin(angle + twist);
      pos.setX(i, tx); pos.setZ(i, tz);
    }
    g.computeVertexNormals();
    g.translate(0, height * 0.4, 0); // sit on bottom
    return g;
  }, [scaleMultiplier]);

  const rosettes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      let pos = new THREE.Vector3();
      let tangent = new THREE.Vector3();
      if (curve) {
        const t = i / count;
        pos = curve.getPointAt(t);
        tangent = curve.getTangentAt(t);
        pos.set(pos.x, yOffset, -pos.y);
        tangent.set(tangent.x, 0, -tangent.y);
        if (inset !== 0) {
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
          pos.addScaledVector(normal, inset);
        }
      } else {
        const angle = (i / count) * Math.PI * 2;
        const actualRadius = radius - inset;
        pos.set(Math.cos(angle) * actualRadius, yOffset, Math.sin(angle) * actualRadius);
        tangent.set(-Math.sin(angle), 0, Math.cos(angle));
      }
      
      const dummy = new THREE.Object3D();
      dummy.position.copy(pos);
      dummy.lookAt(pos.clone().add(tangent));
      // Orient rosette to face slightly outward and up
      dummy.rotateX(-Math.PI / 2);
      dummy.rotateZ(Math.PI / 4);
      dummy.updateMatrix();
      
      arr.push(
        <mesh key={i} position={dummy.position} quaternion={dummy.quaternion} geometry={geo} castShadow>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />
        </mesh>
      );
    }
    return arr;
  }, [count, curve, radius, yOffset, color, inset, geo]);

  return <group>{rosettes}</group>;
}

// --- Procedural Border Switcher ---
function ProceduralBorder(props) {
  if (!props.styleType || props.styleType === 'none') return null;
  switch (props.styleType) {
    case 'shell': return <ShellBorder {...props} count={props.count} />;
    case 'rope': return <RopeBorder {...props} />;
    case 'rosette': return <RosetteBorder {...props} count={Math.floor(props.count * 0.6)} />; // Rosettes are wider
    case 'pearl': return <PearlBorder {...props} count={Math.floor(props.count * 1.6)} />; // Pearls are smaller
    case 'zigzag': return <ZigzagBorder {...props} />;
    default: return <ShellBorder {...props} count={props.count} />;
  }
}


function DripEffect({ curve, radius, yOffset, color, isHeart = false, size = 0 }) {
  const isNutella = color === 'Nutella';
  const isWhiteChoc = color === 'White Chocolate';
  const isPistachio = color === 'Pistachio';
  const isFerrero = color === 'Ferrero Rocher';
  const isKinder = color === 'Kinder';
  const isBiscoff = color === 'Biscoff' || !['Nutella', 'White Chocolate', 'Pistachio', 'Ferrero Rocher', 'Kinder'].includes(color);

  const dripColor = isNutella ? '#351508' : 
                    isWhiteChoc ? '#f5ebd6' :
                    isPistachio ? '#a2d187' :
                    isFerrero ? '#5c3a21' :
                    isKinder ? '#e8d8c8' :
                    '#b07d4b'; // Biscoff / default
  
  const drips = useMemo(() => {
    const arr = [];
    const dripCount = isHeart ? 40 : 30;
    
    // Adjust drip characteristics based on spread type
    let baseH = 0.15;
    let baseThick = 0.03;
    let roughness = 0.05;
    let clearcoat = 1.0;
    
    if (isWhiteChoc) { baseH = 0.25; baseThick = 0.02; } // Thinner, longer drips
    if (isNutella) { 
      baseH = 0.12; 
      baseThick = 0.035; 
      roughness = 0.1; 
      clearcoat = 0.9;
    }
    if (isFerrero) { roughness = 0.15; } // Slightly rougher for chunky spreads

    // 1. Top "Sauce" Coating
    const liquidMaterial = (
      <meshPhysicalMaterial 
        color={dripColor} 
        roughness={roughness} 
        metalness={0.0} 
        clearcoat={clearcoat} 
        clearcoatRoughness={roughness}
      />
    );

    if (isHeart) {
      const shape = createHeartShape(size * 1.02); // slightly larger than cake
      const extrudeSettings = { depth: 0.03, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
      const sauceGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      sauceGeo.rotateX(-Math.PI / 2);
      arr.push(
        <mesh key="sauce-top" geometry={sauceGeo} position={[0, yOffset + 0.01, 0]} receiveShadow>
          {liquidMaterial}
        </mesh>
      );
    } else {
      arr.push(
        <mesh key="sauce-top" position={[0, yOffset + 0.015, 0]} receiveShadow>
          <cylinderGeometry args={[radius * 0.98, radius * 0.98, 0.03, 64]} />
          {liquidMaterial}
        </mesh>
      );
    }

    // 1.5 Procedural Specific Features
    
    // Kinder: White Chocolate Swirls
    if (isKinder) {
      const swirlColor = '#ffffff'; 
      if (isHeart) {
        const shape = createHeartShape(size * 0.85); // smaller inner shape
        const extrudeSettings = { depth: 0.01, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
        const sauceGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        sauceGeo.rotateX(-Math.PI / 2);
        arr.push(
          <mesh key="kinder-swirl" geometry={sauceGeo} position={[0, yOffset + 0.02, 0]} receiveShadow>
            <meshPhysicalMaterial color={swirlColor} roughness={0.05} clearcoat={1.0} />
          </mesh>
        );
      } else {
        // Swirl lines on round cake
        for(let i = 0; i < 5; i++) {
          arr.push(
            <mesh key={`kinder-swirl-${i}`} position={[0, yOffset + 0.03, 0]} rotation={[0, (Math.PI / 5) * i, 0]} receiveShadow>
              <tubeGeometry args={[new THREE.CatmullRomCurve3([
                new THREE.Vector3(-radius * 0.8, 0, Math.sin(i)*0.2),
                new THREE.Vector3(0, 0, -Math.sin(i)*0.2),
                new THREE.Vector3(radius * 0.8, 0, Math.sin(i)*0.2)
              ]), 20, 0.015, 8, false]} />
              <meshPhysicalMaterial color={swirlColor} roughness={0.05} clearcoat={1.0} />
            </mesh>
          );
        }
      }
    }

    // Additive Scatter Elements (Nuts, Chunks, Crumbs)
    let scatterCount = 0;
    let scatterSize = 0.01;
    let ScatterGeo = null;
    let ScatterMat = null;

    if (isPistachio) {
      scatterCount = 120;
      scatterSize = 0.015;
      ScatterGeo = <dodecahedronGeometry args={[scatterSize, 0]} />;
      ScatterMat = <meshStandardMaterial color="#8bba65" roughness={0.8} />;
    } else if (isFerrero) {
      scatterCount = 60;
      scatterSize = 0.035;
      ScatterGeo = <sphereGeometry args={[scatterSize, 5, 5]} />;
      ScatterMat = <meshStandardMaterial color="#4a2e1b" roughness={0.9} />;
    } else if (isBiscoff) {
      scatterCount = 150;
      scatterSize = 0.012;
      ScatterGeo = <cylinderGeometry args={[scatterSize, scatterSize, 0.005, 5]} />;
      ScatterMat = <meshStandardMaterial color="#a66a38" roughness={1.0} />;
    }

    if (scatterCount > 0) {
      for (let i = 0; i < scatterCount; i++) {
        // Random position
        let px, pz;
        if (isHeart) {
          px = (Math.random() - 0.5) * size * 1.3;
          pz = (Math.random() - 0.5) * size * 1.3;
        } else {
          const r = Math.random() * (radius * 0.85);
          const theta = Math.random() * 2 * Math.PI;
          px = r * Math.cos(theta);
          pz = r * Math.sin(theta);
        }

        const py = yOffset + 0.03 + (Math.random() * 0.01);
        const rotX = Math.random() * Math.PI;
        const rotY = Math.random() * Math.PI;
        
        arr.push(
          <mesh key={`scatter-${i}`} position={[px, py, pz]} rotation={[rotX, rotY, 0]} castShadow receiveShadow>
            {ScatterGeo}
            {ScatterMat}
          </mesh>
        );
      }
    }

    // 2. The Drips
    for (let i = 0; i < dripCount; i++) {
      const t = i / dripCount;
      let pos = new THREE.Vector3();
      
      if (isHeart && curve) {
        pos = curve.getPointAt(t);
        // Start drips slightly inside the sauce and at the sauce's height
        pos.set(pos.x * 0.98, yOffset + 0.015, -pos.y * 0.98);
      } else {
        const angle = t * Math.PI * 2;
        pos.set(Math.cos(angle) * (radius * 0.98), yOffset + 0.015, Math.sin(angle) * (radius * 0.98));
      }

      const h = baseH + Math.random() * 0.25;
      const thick = baseThick + Math.random() * 0.02;
      
      arr.push(
        <group key={`drip-${i}`} position={pos}>
          {/* Main Drip Body */}
          <mesh position={[0, -h/2, 0]} castShadow>
            <cylinderGeometry args={[thick * 1.1, thick * 0.6, h, 16]} />
            {liquidMaterial}
          </mesh>
          {/* Drip Droplet Tip */}
          <mesh position={[0, -h, 0]} castShadow>
            <sphereGeometry args={[thick * 0.7, 16, 16]} />
            {liquidMaterial}
          </mesh>
          
          {/* Ferrero Chunks on drips */}
          {isFerrero && Math.random() > 0.4 && (
            <mesh position={[0, -h/2 + Math.random()*0.1, thick * 0.6]} castShadow>
               <sphereGeometry args={[0.025, 5, 5]} />
               <meshStandardMaterial color="#4a2e1b" roughness={0.9} />
            </mesh>
          )}
        </group>
      );
    }
    return arr;
  }, [curve, radius, yOffset, color, isHeart, size, dripColor, isWhiteChoc, isNutella, isPistachio, isFerrero, isKinder, isBiscoff]);

  return <group>{drips}</group>;
}
// --- Fondant Bow Helper ---
function FondantBow({ radius, yOffset, color, isHeart, size }) {
  const pos = isHeart ? [0, yOffset, size * 1.05 + 0.05] : [0, yOffset, radius + 0.05];
  
  return (
    <group position={pos} rotation={[0, 0, 0]} scale={1.2}>
      {/* Left Loop */}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 8]} scale={[1, 0.6, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Right Loop */}
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, -Math.PI / 8]} scale={[1, 0.6, 0.3]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Center Knot */}
      <mesh position={[0, 0, 0.08]} scale={[1, 1, 0.5]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Left Tail */}
      <mesh position={[-0.15, -0.25, 0.02]} rotation={[0, 0, -Math.PI / 6]} scale={[1, 1, 0.1]} castShadow>
        <cylinderGeometry args={[0.02, 0.12, 0.4, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* Right Tail */}
      <mesh position={[0.15, -0.25, 0.02]} rotation={[0, 0, Math.PI / 6]} scale={[1, 1, 0.1]} castShadow>
        <cylinderGeometry args={[0.02, 0.12, 0.4, 16]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
    </group>
  );
}

// --- Cake Text Helper ---
function CakeText({ text, yOffset, isHeart = false, size = 0, color = '#ffffff' }) {
  if (!text) return null;
  
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 512, 512);
    context.font = 'bold 50px "Georgia", serif';
    context.fillStyle = '#5c0d1b'; // Match secondary color for luxury look
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    const lines = text.split('\n');
    const lineHeight = 60;
    const startY = 256 - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, i) => {
      context.fillText(line, 256, startY + i * lineHeight);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [text]);

  return (
    <group position={[0, yOffset + 0.035, isHeart ? -size * 0.1 : 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <planeGeometry args={[size * 1.8, size * 1.8]} />
        <meshBasicMaterial key={text} map={texture} transparent={true} opacity={0.85} depthWrite={false} />
      </mesh>
    </group>
  );
}

// --- Single Round Layer ---
function RoundLayer({ radius, posY, color, height, topBorder, bottomBorder, pearlBottom, bow, spread, customText, sizeNum }) {
  return (
    <group position={[0, posY, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius * 0.95, radius, height, 64]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
      </mesh>
      {spread && <DripEffect radius={radius * 0.95} yOffset={height / 2} color={spread} />}
      {customText && <CakeText text={customText} yOffset={height / 2} size={radius} />}
      {topBorder && topBorder !== 'none' && <ProceduralBorder styleType={topBorder} radius={radius * 0.95} inset={0.02} count={Math.floor(radius * 42)} yOffset={height / 2} color={color} />}
      {bottomBorder && bottomBorder !== 'none' && <ProceduralBorder styleType={bottomBorder} radius={radius * 1.02} inset={0.02} count={Math.floor(radius * 32)} yOffset={-height / 2} color={color} scaleMultiplier={1.4} />}
      {bow && <FondantBow radius={radius} yOffset={0} color={color} />}
    </group>
  );
}

// --- Single Heart Layer ---
function HeartLayer({ size, posY, color, height, topBorder, bottomBorder, pearlBottom, bow, spread, customText, sizeNum }) {
  const { cakeGeo, curve } = useMemo(() => {
    const shape = createHeartShape(size);
    const extrudeSettings = { depth: height, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 6, curveSegments: 64 };
    
    const cakeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    cakeGeo.translate(0, 0, -height / 2);
    cakeGeo.rotateX(-Math.PI / 2);

    const points = shape.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    const curve = new THREE.CatmullRomCurve3(points, true);

    return { cakeGeo, curve };
  }, [size, height]);

  return (
    <group position={[0, posY + height / 2, 0]}>
      <mesh geometry={cakeGeo} castShadow>
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
      </mesh>
      {spread && <DripEffect isHeart size={size} curve={curve} yOffset={height / 2} color={spread} />}
      {customText && <CakeText text={customText} yOffset={height / 2} isHeart size={size} />}
      {topBorder && topBorder !== 'none' && <ProceduralBorder styleType={topBorder} curve={curve} inset={0.02} count={Math.floor(size * 50)} yOffset={height / 2} color={color} />}
      {bottomBorder && bottomBorder !== 'none' && <ProceduralBorder styleType={bottomBorder} curve={curve} inset={0.02} count={Math.floor(size * 36)} yOffset={-height / 2} color={color} scaleMultiplier={1.4} />}
      {bow && <FondantBow isHeart size={size} yOffset={0} color={color} />}
    </group>
  );
}

// --- Stand ---
function CakeStand() {
  const mat = { color: '#e0e0e0', metalness: 0.5, roughness: 0.2 };
  return (
    <group>
      <mesh position={[0, -0.95, 0]} receiveShadow>
        <cylinderGeometry args={[1.9, 1.9, 0.06, 64]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[0, -1.18, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.42, 64]} />
        <meshStandardMaterial {...mat} />
      </mesh>
    </group>
  );
}

// --- Full Cake Model ---
function CakeModel({ layers }) {
  // Build each layer, accounting for shrinking scale per tier
  let currentY = -0.92; // start just above the stand plate
  const renderedLayers = [];

  layers.forEach((layer, i) => {
    const scaleFactor = Math.pow(SHRINK_FACTOR, i);
    const [sizeNum, shapeType] = layer.type.match(/^(\d+)(.+)$/).slice(1);

    let scaledRadius = BASE_RADIUS * scaleFactor;
    if (sizeNum === '6') {
      scaledRadius *= 0.85; // Make 6-inch less wide
    }
    
    const height = LAYER_HEIGHTS[sizeNum] ?? 0.65;
    const layerY = currentY + height / 2;
    const color = layer.color || '#F9C6C9';
    const topBorder = layer.topBorder || false;
    const bottomBorder = layer.bottomBorder || false;
    const bow = layer.bow || false;
    
    const spread = layer.spread || null;
    const customText = layer.customText || '';

    if (shapeType === 'round') {
      renderedLayers.push(
        <RoundLayer key={i} radius={scaledRadius} posY={layerY} color={color} height={height} topBorder={topBorder} bottomBorder={bottomBorder} bow={bow} spread={spread} customText={customText} sizeNum={sizeNum} />
      );
    } else {
      renderedLayers.push(
        <HeartLayer key={i} size={scaledRadius * 0.87} posY={currentY} color={color} height={height} topBorder={topBorder} bottomBorder={bottomBorder} bow={bow} spread={spread} customText={customText} sizeNum={sizeNum} />
      );
    }

    currentY += height;
  });

  return (
    <group>
      <CakeStand />
      {renderedLayers}
    </group>
  );
}

// --- Camera Zoom Controller ---
function CameraController({ zoom }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 2, zoom);
    camera.updateProjectionMatrix();
  }, [zoom, camera]);
  return null;
}

// --- Main Export ---
export default function Cake3D({ layers = [] }) {
  const [zoom, setZoom] = useState(5.5);

  return (
    <div 
      role="region" 
      aria-label="Interactive 3D model of a custom cake"
      style={{ 
        position: 'relative',
        width: '100%', 
        height: '100%', 
        minHeight: '300px', 
        background: '#fdf2f2', 
        borderRadius: '20px', 
        overflow: 'hidden' 
      }}
    >
      {/* Zoom Controller */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '10px 15px',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#666' }}>ZOOM</span>
        <input 
          type="range"
          min="3.5"
          max="8.5"
          step="0.01"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          style={{
            width: '120px',
            height: '4px',
            accentColor: '#30B8C0',
            cursor: 'pointer'
          }}
        />
      </div>

      <Canvas 
        shadows 
        gl={{ 
          antialias: true,
          shadowMapType: THREE.PCFShadowMap
        }}
        camera={{ position: [0, 2, zoom], fov: 42 }}
      >
        <CameraController zoom={zoom} />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <Suspense fallback={null}>
          <CakeModel layers={layers} />
        </Suspense>

        <Environment preset="studio" />
        <OrbitControls makeDefault enableZoom={true} autoRotate={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
