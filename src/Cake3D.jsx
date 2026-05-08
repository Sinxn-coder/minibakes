import React, { useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

const flowerModelUrl = `${import.meta.env.BASE_URL}3d/flower.glb`;

// --- Layer size config ---
const BASE_RADIUS = 1.35; // constant base width
const LAYER_HEIGHTS = { '6': 0.65, '8': 0.95 }; // '8' is taller than '6'
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

// --- Piped Border Helper ---
function PipedBorder({ curve, radius, count, yOffset, color, inset = 0, scaleMultiplier = 1 }) {
  const geo = useMemo(() => {
    const baseRadius = 0.08 * scaleMultiplier;
    // High segments to support deep ridges and twist
    const g = new THREE.SphereGeometry(baseRadius, 32, 32); 
    const pos = g.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      let angle = Math.atan2(z, x);
      let normalizedY = y / baseRadius; // -1 to 1
      
      // 10 ridges for a star-tip look. Taper them at poles to avoid jagged tips
      let taper = 1 - Math.abs(normalizedY); 
      let ridge = 1 + (0.3 * taper * Math.cos(angle * 10));

      x *= ridge;
      z *= ridge;

      // Twist the shell 
      let twist = normalizedY * 2.0; 
      
      let tx = x * Math.cos(twist) - z * Math.sin(twist);
      let tz = x * Math.sin(twist) + z * Math.cos(twist);

      pos.setX(i, tx);
      pos.setZ(i, tz);
    }
    g.computeVertexNormals();
    g.rotateX(Math.PI / 2); // Align poles with Z axis for the piped shell look
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
      dummy.rotateX(Math.PI / 6); // Tilt forward so the fat back rests on the tail of the previous shell
      dummy.updateMatrix();

      arr.push(
        <mesh key={i} position={dummy.position} quaternion={dummy.quaternion} scale={[1, 0.85, 1.8]} geometry={geo} castShadow>
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.02} />
        </mesh>
      );
    }
    return arr;
  }, [count, curve, radius, yOffset, color, inset, geo]);

  return <group>{dollops}</group>;
}

// --- Pearl Border Helper ---
function PearlBorder({ curve, radius, yOffset, color, inset = 0 }) {
  const pearlRadius = 0.038;
  const geo = useMemo(() => new THREE.SphereGeometry(pearlRadius, 32, 32), []);

  const pearls = useMemo(() => {
    const arr = [];
    const rows = 2; // Stacked double pearl border
    
    // Calculate perfect count so the balls touch side-by-side
    let perimeter = 0;
    if (curve) {
      perimeter = curve.getLength();
    } else {
      const actualRadius = radius - inset;
      perimeter = 2 * Math.PI * actualRadius;
    }
    const count = Math.round(perimeter / (pearlRadius * 2));

    for (let r = 0; r < rows; r++) {
      // Base sits exactly on the floor. Top row is nested in the honeycomb gaps.
      const currentYOffset = yOffset + pearlRadius + r * (pearlRadius * 1.65);
      
      // Distance from the cake edge (positive is outward, negative is inward)
      // Base row (r=0) sits slightly outward. Top row (r=1) is tucked inward.
      const edgeOffset = (-inset) - r * (pearlRadius * 0.9);
      const phaseOffset = r * 0.5; // Stagger the top row to nest in gaps
      
      for (let i = 0; i < count; i++) {
        let pos = new THREE.Vector3();
        let tangent = new THREE.Vector3();
        let adjustedI = i + phaseOffset;

        if (curve) {
          let t = (adjustedI / count) % 1.0;
          if (t < 0) t += 1.0;
          pos = curve.getPointAt(t);
          tangent = curve.getTangentAt(t);
          pos.set(pos.x, currentYOffset, -pos.y);
          tangent.set(tangent.x, 0, -tangent.y);
          
          if (edgeOffset !== 0) {
            // Normal points OUTWARD
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            pos.addScaledVector(normal, edgeOffset);
          }
        } else {
          const angle = (adjustedI / count) * Math.PI * 2;
          const actualRadius = radius + edgeOffset;
          pos.set(Math.cos(angle) * actualRadius, currentYOffset, Math.sin(angle) * actualRadius);
          tangent.set(-Math.sin(angle), 0, Math.cos(angle));
        }

        const dummy = new THREE.Object3D();
        dummy.position.copy(pos);
        dummy.lookAt(pos.clone().add(tangent));
        dummy.updateMatrix();

        arr.push(
          <mesh key={`${r}-${i}`} position={dummy.position} quaternion={dummy.quaternion} geometry={geo} castShadow>
            <meshStandardMaterial color={color} roughness={0.15} metalness={0.05} />
          </mesh>
        );
      }
    }
    return arr;
  }, [curve, radius, yOffset, color, inset, geo]);

  return <group>{pearls}</group>;
}

// --- Flower Model from GLB ---
function FlowerCluster({ radius, yOffset, isHeart = false, size = 0, sizeNum = '8' }) {
  const { scene } = useGLTF(flowerModelUrl);
  const masterScale = (sizeNum === '6' ? 0.78 : 1.0) * 0.8; // Significantly larger for the GLB
  
  const clonedScene = useMemo(() => {
    const s = scene.clone();
    s.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return s;
  }, [scene]);

  const pos = useMemo(() => {
    const lift = 0.12; 
    if (isHeart) return [size * 1.0, yOffset + lift, -size * 0.4];
    return [0, yOffset + lift, radius + 0.03]; 
  }, [isHeart, size, radius, yOffset]);

  const rotation = useMemo(() => {
    if (isHeart) return [0.1, Math.PI / 1.6, 0];
    return [0.2, -Math.PI / 2.2, 0];
  }, [isHeart]);

  return (
    <group position={pos} scale={masterScale} rotation={rotation}>
      <primitive object={clonedScene} />
    </group>
  );
}

// --- Drip Effect Helper ---
function DripEffect({ curve, radius, yOffset, color, isHeart = false, size = 0 }) {
  const dripColor = color === 'Nutella' ? '#3d1e16' : '#b07d4b'; // Nutella vs Biscoff
  
  const drips = useMemo(() => {
    const arr = [];
    const dripCount = isHeart ? 40 : 30;
    const dripLength = 0.25;
    
    // 1. Top "Sauce" Coating
    if (isHeart) {
      const shape = createHeartShape(size * 1.02); // slightly larger than cake
      const extrudeSettings = { depth: 0.02, bevelEnabled: false };
      const sauceGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      sauceGeo.rotateX(-Math.PI / 2);
      arr.push(
        <mesh key="sauce-top" geometry={sauceGeo} position={[0, yOffset + 0.01, 0]} receiveShadow>
          <meshStandardMaterial color={dripColor} roughness={0.1} metalness={0.1} />
        </mesh>
      );
    } else {
      arr.push(
        <mesh key="sauce-top" position={[0, yOffset + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[radius * 0.98, 64]} />
          <meshStandardMaterial color={dripColor} roughness={0.1} metalness={0.1} />
        </mesh>
      );
    }

    // 2. The Drips
    for (let i = 0; i < dripCount; i++) {
      const t = i / dripCount;
      let pos = new THREE.Vector3();
      
      if (isHeart && curve) {
        pos = curve.getPointAt(t);
        pos.set(pos.x, yOffset, -pos.y);
      } else {
        const angle = t * Math.PI * 2;
        pos.set(Math.cos(angle) * (radius * 0.98), yOffset, Math.sin(angle) * (radius * 0.98));
      }

      // Randomize drip length and thickness for realism
      const h = 0.15 + Math.random() * 0.25;
      const thick = 0.03 + Math.random() * 0.02;
      
      arr.push(
        <group key={`drip-${i}`} position={pos}>
          {/* Main Drip Body */}
          <mesh position={[0, -h/2, 0]} castShadow>
            <cylinderGeometry args={[thick, thick * 0.6, h, 8]} />
            <meshStandardMaterial color={dripColor} roughness={0.1} metalness={0.1} />
          </mesh>
          {/* Drip Droplet Tip */}
          <mesh position={[0, -h, 0]} castShadow>
            <sphereGeometry args={[thick * 1.1, 8, 8]} />
            <meshStandardMaterial color={dripColor} roughness={0.1} metalness={0.1} />
          </mesh>
        </group>
      );
    }
    return arr;
  }, [curve, radius, yOffset, dripColor, isHeart, size]);

  return <group>{drips}</group>;
}

useGLTF.preload(flowerModelUrl);


// --- Cake Text Helper ---
function CakeText({ text, yOffset, isHeart = false, size = 0, color = '#ffffff' }) {
  if (!text) return null;
  
  // Choose a contrasting color based on cake color if possible, 
  // but for now white/dark brown works well.
  const textColor = '#5c0d1b'; // Match secondary color for luxury look
  
  return (
    <group position={[0, yOffset + 0.02, isHeart ? -size * 0.1 : 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <Text
        fontSize={isHeart ? 0.22 : 0.25}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={isHeart ? size * 1.5 : size * 2}
        textAlign="center"
      >
        {text}
      </Text>
    </group>
  );
}

// --- Single Round Layer ---
function RoundLayer({ radius, posY, color, height, topBorder, bottomBorder, pearlBottom, flowerCluster, spread, customText, sizeNum }) {
  return (
    <group position={[0, posY, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[radius * 0.95, radius, height, 64]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
      </mesh>
      {spread && <DripEffect radius={radius * 0.95} yOffset={height / 2} color={spread} />}
      {customText && <CakeText text={customText} yOffset={height / 2} size={radius} />}
      {topBorder && <PipedBorder radius={radius * 0.95} inset={0.08} count={Math.floor(radius * 36)} yOffset={height / 2} color={color} />}
      {bottomBorder && <PipedBorder radius={radius * 1.02} inset={0.04} count={Math.floor(radius * 26)} yOffset={-height / 2} color={color} scaleMultiplier={1.4} />}
      {pearlBottom && <PearlBorder radius={radius} inset={-0.015} yOffset={-height / 2} color="#ffffff" />}
      {flowerCluster && <FlowerCluster radius={radius} yOffset={-height / 2} sizeNum={sizeNum} />}
    </group>
  );
}

// --- Single Heart Layer ---
function HeartLayer({ size, posY, color, height, topBorder, bottomBorder, pearlBottom, flowerCluster, spread, customText, sizeNum }) {
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
      {topBorder && <PipedBorder curve={curve} inset={0.08} count={Math.floor(size * 42)} yOffset={height / 2} color={color} />}
      {bottomBorder && <PipedBorder curve={curve} inset={0.04} count={Math.floor(size * 30)} yOffset={-height / 2} color={color} scaleMultiplier={1.4} />}
      {pearlBottom && <PearlBorder curve={curve} inset={-0.055} yOffset={-height / 2} color="#ffffff" />}
      {flowerCluster && <FlowerCluster isHeart size={size} yOffset={-height / 2} sizeNum={sizeNum} />}
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

    const scaledRadius = BASE_RADIUS * scaleFactor;
    const height = LAYER_HEIGHTS[sizeNum] ?? 0.65;
    const layerY = currentY + height / 2;
    const color = layer.color || '#F9C6C9';
    const topBorder = layer.topBorder || false;
    const bottomBorder = layer.bottomBorder || false;
    const pearlBottom = layer.pearlBottom || false;
    const flowerCluster = layer.flowerCluster || false;
    const spread = layer.spread || null;
    const customText = layer.customText || '';

    if (shapeType === 'round') {
      renderedLayers.push(
        <RoundLayer key={i} radius={scaledRadius} posY={layerY} color={color} height={height} topBorder={topBorder} bottomBorder={bottomBorder} pearlBottom={pearlBottom} flowerCluster={flowerCluster} spread={spread} customText={customText} sizeNum={sizeNum} />
      );
    } else {
      renderedLayers.push(
        <HeartLayer key={i} size={scaledRadius * 0.87} posY={currentY} color={color} height={height} topBorder={topBorder} bottomBorder={bottomBorder} pearlBottom={pearlBottom} flowerCluster={flowerCluster} spread={spread} customText={customText} sizeNum={sizeNum} />
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
    <div style={{ 
      position: 'relative',
      width: '100%', 
      height: '100%', 
      minHeight: '300px', 
      background: '#fdf2f2', 
      borderRadius: '20px', 
      overflow: 'hidden' 
    }}>
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
