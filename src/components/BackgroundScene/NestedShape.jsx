import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef } from "react";
import { COLOR_SHIFT_RANGE, COLOR_SHIFT_SPEED, HOVER_LERP, PULSE_AMOUNT, PULSE_SPEED } from "./constants";
import { hexToHsl, hslToHex } from "./colorUtils";
import { getGeometry } from "./geometryUtils";

export const NestedShape = memo(function NestedShape({ 
  shape, 
  size, 
  color, 
  rotationSpeed, 
  mousePosition, 
  scrollProgress, 
  parentFlickerActive 
}) {
  const nestedRef = useRef();
  const nestedRotation = useRef({ x: 0, y: 0, z: 0 });
  const mainMaterialRef = useRef();
  const hoverIntensity = useRef(1.0);
  const pulsePhase = useRef(Math.random() * Math.PI * 2);
  const colorShiftPhase = useRef(Math.random() * Math.PI * 2);
  const baseColorHsl = useMemo(() => hexToHsl(color), [color]);
  const orbitalPhase = useRef(Math.random() * Math.PI * 2);
  const orbitalRadius = useRef(0.3 + Math.random() * 0.2);
  const distortStrength = useRef(0);
  const distortPhase = useRef(0);
  const lastColor = useRef(color);
  const lastIntensity = useRef(0);
  const lastDistort = useRef(0);

  // Memoize geometry
  const geometry = useMemo(() => getGeometry(shape, size), [shape, size]);

  useFrame((state, delta) => {
    const mesh = nestedRef.current;
    if (!mesh) return;

    // Rotate in opposite direction for visual interest
    nestedRotation.current.x -= rotationSpeed * delta * 1.2;
    nestedRotation.current.y -= rotationSpeed * delta * 0.9;
    nestedRotation.current.z -= rotationSpeed * delta * 0.6;

    // Apply mouse influence (inverse)
    const rotationInfluence = 0.5;
    mesh.rotation.x = nestedRotation.current.x - mousePosition.y * rotationInfluence;
    mesh.rotation.y = nestedRotation.current.y - mousePosition.x * rotationInfluence;
    mesh.rotation.z = nestedRotation.current.z;

    // Smooth hover intensity transition
    hoverIntensity.current += (1.0 - hoverIntensity.current) * HOVER_LERP;

    // Pulsing scale animation (breathing effect)
    pulsePhase.current += delta * PULSE_SPEED;
    const pulseScale = 1.0 + Math.sin(pulsePhase.current) * PULSE_AMOUNT;
    mesh.scale.setScalar(pulseScale);

    // Orbital motion - orbit around center
    orbitalPhase.current += delta * 0.4;
    const orbitalX = Math.cos(orbitalPhase.current) * orbitalRadius.current;
    const orbitalY = Math.sin(orbitalPhase.current) * orbitalRadius.current * 0.6;
    mesh.position.x = orbitalX;
    mesh.position.y = orbitalY;

    // Color-shifting glow (subtle hue shift over time)
    colorShiftPhase.current += delta * COLOR_SHIFT_SPEED;
    const hueShift = Math.sin(colorShiftPhase.current) * COLOR_SHIFT_RANGE;
    const shiftedHue = (baseColorHsl[0] + hueShift + 360) % 360;
    const shiftedColor = hslToHex(shiftedHue, baseColorHsl[1], baseColorHsl[2]);

    // Scroll-based color intensity
    const scrollIntensity = 0.7 + scrollProgress * 0.6;

    // Wave distortion effect - only when parent shape is flickering
    if (parentFlickerActive) {
      distortPhase.current += delta * 15;
      const wave = Math.sin(distortPhase.current);
      distortStrength.current = 0.9 + wave * 0.3;
    } else {
      distortPhase.current = 0;
      distortStrength.current += (0 - distortStrength.current) * 0.2;
    }

    // Apply hover and scroll to materials (only update if changed)
    const totalIntensity = hoverIntensity.current * scrollIntensity;
    const material = mainMaterialRef.current;
    
    if (material) {
      // Only update color if it changed
      if (shiftedColor !== lastColor.current) {
        material.color.set(shiftedColor);
        material.emissive.set(shiftedColor);
        lastColor.current = shiftedColor;
      }
      
      // Only update intensity if it changed significantly
      if (Math.abs(totalIntensity - lastIntensity.current) > 0.01) {
        material.opacity = 0.5 * totalIntensity;
        material.emissiveIntensity = 0.8 * totalIntensity;
        lastIntensity.current = totalIntensity;
      }
      
      // Only update distortion if it changed
      if (Math.abs(distortStrength.current - lastDistort.current) > 0.01 && material.distort !== undefined) {
        material.distort = distortStrength.current;
        lastDistort.current = distortStrength.current;
      }
    }
  });

  const handlePointerEnter = useCallback(() => {
    hoverIntensity.current = 1.5;
  }, []);

  const handlePointerLeave = useCallback(() => {
    hoverIntensity.current = 1.0;
  }, []);

  return (
    <group 
      ref={nestedRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <mesh>
        {geometry}
        <MeshDistortMaterial
          ref={mainMaterialRef}
          color={color}
          transparent
          opacity={0.5}
          wireframe
          emissive={color}
          emissiveIntensity={0.8}
          distort={0}
          speed={1.2}
          roughness={0}
        />
      </mesh>
    </group>
  );
});

