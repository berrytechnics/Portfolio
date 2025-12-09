import { MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { 
  COLOR_SHIFT_RANGE, 
  COLOR_SHIFT_SPEED, 
  FLICKER_DURATION_MAX, 
  FLICKER_DURATION_MIN, 
  FLICKER_TIMER_MAX, 
  FLICKER_TIMER_MIN, 
  HOVER_LERP, 
  MOUSE_ROTATION_LERP, 
  PULSE_AMOUNT, 
  PULSE_SPEED 
} from "./constants";
import { hexToHsl, hslToHex } from "./colorUtils";
import { getGeometry } from "./geometryUtils";
import { NestedShape } from "./NestedShape";

export const ParallaxShape = memo(function ParallaxShape({
  position,
  rotationSpeed,
  mousePosition,
  scrollProgress,
  shape = "sphere",
  size = 1,
  color = "#ffaacc",
  parallaxDepth = 1,
  nestedShape = null,
}) {
  const meshRef = useRef();
  const groupRef = useRef();
  const baseRotation = useRef({ x: 0, y: 0, z: 0 });
  const mouseRotation = useRef({ x: 0, y: 0 });
  const basePosition = useMemo(() => [...position], [position]);
  const mainMaterialRef = useRef();
  const flickerTimer = useRef(Math.random() * 4);
  const flickerIntensity = useRef(1.0);
  const flickerDuration = useRef(0);
  const hoverIntensity = useRef(1.0);
  const hoverScale = useRef(1.0);
  const pulsePhase = useRef(Math.random() * Math.PI * 2);
  const colorShiftPhase = useRef(Math.random() * Math.PI * 2);
  const baseColorHsl = useMemo(() => hexToHsl(color), [color]);
  const orbitalPhase = useRef(Math.random() * Math.PI * 2);
  const orbitalRadius = useRef(0.4 + Math.random() * 0.3);
  const [isFlickering, setIsFlickering] = useState(false);
  const prevFlickerState = useRef(false);
  const lastColor = useRef(color);
  const lastIntensity = useRef(0);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const group = groupRef.current;
    if (!mesh || !group) return;

    // Accumulate base rotation
    baseRotation.current.x += rotationSpeed * delta;
    baseRotation.current.y += rotationSpeed * delta * 0.7;
    baseRotation.current.z += rotationSpeed * delta * 0.5;

    // Calculate target mouse rotation
    const rotationInfluence = 0.8;
    const targetMouseX = mousePosition.y * rotationInfluence;
    const targetMouseY = mousePosition.x * rotationInfluence;

    // Smoothly interpolate mouse rotation
    mouseRotation.current.x += (targetMouseX - mouseRotation.current.x) * MOUSE_ROTATION_LERP;
    mouseRotation.current.y += (targetMouseY - mouseRotation.current.y) * MOUSE_ROTATION_LERP;

    // Apply base rotation + mouse rotation offset
    mesh.rotation.x = baseRotation.current.x + mouseRotation.current.x;
    mesh.rotation.y = baseRotation.current.y + mouseRotation.current.y;
    mesh.rotation.z = baseRotation.current.z;

    // Parallax effect based on scroll
    const parallaxOffset = scrollProgress * parallaxDepth * 2;
    const floatOffset = Math.sin(state.clock.elapsedTime + basePosition[0]) * 0.3;

    // Pulsing scale animation (breathing effect)
    pulsePhase.current += delta * PULSE_SPEED;
    const pulseScale = 1.0 + Math.sin(pulsePhase.current) * PULSE_AMOUNT;
    mesh.scale.setScalar(hoverScale.current * pulseScale);

    // Orbital motion - orbit around base position
    orbitalPhase.current += delta * 0.3;
    const orbitalX = Math.cos(orbitalPhase.current) * orbitalRadius.current;
    const orbitalY = Math.sin(orbitalPhase.current) * orbitalRadius.current * 0.7;
    const orbitalZ = Math.sin(orbitalPhase.current * 0.5) * orbitalRadius.current * 0.3;
    
    group.position.x = basePosition[0] + parallaxOffset * 0.5 + orbitalX;
    group.position.y = basePosition[1] + parallaxOffset + floatOffset + orbitalY;
    group.position.z = basePosition[2] + parallaxOffset * 0.3 + orbitalZ;

    // Neon flicker effect - optimized logic
    flickerDuration.current -= delta;
    const wasFlickering = prevFlickerState.current;

    if (flickerDuration.current <= 0) {
      // Not currently flickering
      if (wasFlickering) {
        setIsFlickering(false);
        prevFlickerState.current = false;
      }
      // Check if it's time to flicker
      flickerTimer.current -= delta;
      if (flickerTimer.current <= 0) {
        // Start a quick flicker
        if (!wasFlickering) {
          setIsFlickering(true);
          prevFlickerState.current = true;
        }
        const flickerType = Math.random();
        if (flickerType < 0.15) {
          flickerIntensity.current = 0.3 + Math.random() * 0.3;
        } else if (flickerType < 0.3) {
          flickerIntensity.current = 1.5 + Math.random() * 0.8;
        } else if (flickerType < 0.35) {
          flickerIntensity.current = 0.2 + Math.random() * 0.3;
        } else {
          flickerIntensity.current = 0.6 + Math.random() * 0.8;
        }
        flickerDuration.current = FLICKER_DURATION_MIN + Math.random() * (FLICKER_DURATION_MAX - FLICKER_DURATION_MIN);
        flickerTimer.current = FLICKER_TIMER_MIN + Math.random() * (FLICKER_TIMER_MAX - FLICKER_TIMER_MIN);
      } else {
        // Return to normal brightness quickly
        flickerIntensity.current += (1.0 - flickerIntensity.current) * 0.5;
      }
    } else if (!wasFlickering) {
      // Currently flickering, update state if needed
      setIsFlickering(true);
      prevFlickerState.current = true;
    }

    // Smooth hover intensity and scale transitions
    hoverIntensity.current += (1.0 - hoverIntensity.current) * HOVER_LERP;
    hoverScale.current += (1.0 - hoverScale.current) * HOVER_LERP;

    // Color-shifting glow (subtle hue shift over time)
    colorShiftPhase.current += delta * COLOR_SHIFT_SPEED;
    const hueShift = Math.sin(colorShiftPhase.current) * COLOR_SHIFT_RANGE;
    const shiftedHue = (baseColorHsl[0] + hueShift + 360) % 360;
    const shiftedColor = hslToHex(shiftedHue, baseColorHsl[1], baseColorHsl[2]);

    // Scroll-based color intensity
    const scrollIntensity = 0.7 + scrollProgress * 0.6;

    // Apply flicker, hover, and scroll to materials (only update if changed)
    const totalIntensity = flickerIntensity.current * hoverIntensity.current * scrollIntensity;
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
        material.emissiveIntensity = 0.6 * totalIntensity;
        lastIntensity.current = totalIntensity;
      }
      
      // Outer shape never distorts - keep at 0
      if (material.distort !== undefined && material.distort !== 0) {
        material.distort = 0;
      }
    }
  });

  const handlePointerEnter = useCallback(() => {
    hoverIntensity.current = 1.8;
    hoverScale.current = 1.05;
  }, []);

  const handlePointerLeave = useCallback(() => {
    hoverIntensity.current = 1.0;
    hoverScale.current = 1.0;
  }, []);

  // Memoize geometry
  const geometry = useMemo(() => getGeometry(shape, size), [shape, size]);

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <group ref={meshRef}>
        <mesh>
          {geometry}
          <MeshDistortMaterial
            ref={mainMaterialRef}
            color={color}
            transparent
            opacity={0.5}
            wireframe
            emissive={color}
            emissiveIntensity={0.6}
            distort={0}
            speed={1.2}
            roughness={0}
          />
        </mesh>
      </group>
      {nestedShape && (
        <NestedShape
          shape={nestedShape}
          size={size * 0.45}
          color={color}
          rotationSpeed={rotationSpeed}
          mousePosition={mousePosition}
          scrollProgress={scrollProgress}
          parentFlickerActive={isFlickering}
        />
      )}
    </group>
  );
});

