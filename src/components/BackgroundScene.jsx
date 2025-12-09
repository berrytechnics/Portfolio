import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

function NestedShape({ 
  shape, 
  size, 
  color, 
  rotationSpeed,
  mousePosition
}) {
  const nestedRef = useRef()
  const nestedRotation = useRef({ x: 0, y: 0, z: 0 })
  const glowMaterialRef = useRef()
  const mainMaterialRef = useRef()
  const flickerTimer = useRef(Math.random() * 4)
  const flickerIntensity = useRef(1.0)
  const flickerTarget = useRef(1.0)

  useFrame((state, delta) => {
    if (nestedRef.current) {
      // Rotate in opposite direction for visual interest
      nestedRotation.current.x -= rotationSpeed * delta * 1.2
      nestedRotation.current.y -= rotationSpeed * delta * 0.9
      nestedRotation.current.z -= rotationSpeed * delta * 0.6
      
      // Apply mouse influence (inverse)
      const rotationInfluence = 0.5
      nestedRef.current.rotation.x = nestedRotation.current.x - mousePosition.y * rotationInfluence
      nestedRef.current.rotation.y = nestedRotation.current.y - mousePosition.x * rotationInfluence
      nestedRef.current.rotation.z = nestedRotation.current.z
    }

    // Neon flicker effect
    flickerTimer.current -= delta
    if (flickerTimer.current <= 0) {
      // Random flicker - sometimes dim, sometimes bright, sometimes off
      const flickerType = Math.random()
      if (flickerType < 0.1) {
        // Quick dim (higher minimum)
        flickerTarget.current = 0.6 + Math.random() * 0.2
      } else if (flickerType < 0.2) {
        // Quick bright flash
        flickerTarget.current = 1.2 + Math.random() * 0.5
      } else if (flickerType < 0.25) {
        // Very brief dim (not off, just dimmer)
        flickerTarget.current = 0.5 + Math.random() * 0.2
      } else {
        // Normal brightness
        flickerTarget.current = 0.8 + Math.random() * 0.4
      }
      // Random timing for next flicker (0.3 to 1.2 seconds)
      flickerTimer.current = 0.3 + Math.random() * 0.9
    }

    // Smoothly interpolate to target flicker intensity
    flickerIntensity.current += (flickerTarget.current - flickerIntensity.current) * 0.3

    // Apply flicker to materials (with minimum brightness)
    const minBrightness = 0.5
    const flickerValue = Math.max(minBrightness, flickerIntensity.current)
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.2 * flickerValue
    }
    if (mainMaterialRef.current) {
      mainMaterialRef.current.opacity = 0.7 * flickerValue
      mainMaterialRef.current.emissiveIntensity = 0.8 * flickerValue
    }
  })

  const getGeometry = () => {
    switch (shape) {
      case 'd4':
        return <tetrahedronGeometry args={[size, 0]} />
      case 'd6':
        return <boxGeometry args={[size, size, size]} />
      case 'd8':
        return <octahedronGeometry args={[size, 0]} />
      case 'd12':
        return <dodecahedronGeometry args={[size, 0]} />
      case 'd20':
        return <icosahedronGeometry args={[size, 0]} />
      default:
        return <boxGeometry args={[size, size, size]} />
    }
  }

  return (
    <group ref={nestedRef}>
      {/* Glow layer - slightly larger and more transparent */}
      <mesh>
        {getGeometry()}
        <meshBasicMaterial 
          ref={glowMaterialRef}
          color={color}
          transparent 
          opacity={0.2}
          wireframe
        />
      </mesh>
      {/* Main wireframe */}
      <mesh scale={0.95}>
        {getGeometry()}
        <meshStandardMaterial 
          ref={mainMaterialRef}
          color={color}
          transparent 
          opacity={0.7}
          wireframe
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

function ParallaxShape({ 
  position, 
  rotationSpeed, 
  mousePosition, 
  scrollProgress,
  shape = 'sphere',
  size = 1,
  color = '#ffaacc',
  parallaxDepth = 1,
  nestedShape = null
}) {
  const meshRef = useRef()
  const groupRef = useRef()
  const baseRotation = useRef({ x: 0, y: 0, z: 0 })
  const mouseRotation = useRef({ x: 0, y: 0 })
  const basePosition = useRef([...position])
  const glowMaterialRef = useRef()
  const mainMaterialRef = useRef()
  const flickerTimer = useRef(Math.random() * 4)
  const flickerIntensity = useRef(1.0)
  const flickerTarget = useRef(1.0)

  useFrame((state, delta) => {
    if (meshRef.current && groupRef.current) {
      // Accumulate base rotation
      baseRotation.current.x += rotationSpeed * delta
      baseRotation.current.y += rotationSpeed * delta * 0.7
      baseRotation.current.z += rotationSpeed * delta * 0.5
      
      // Calculate target mouse rotation
      const rotationInfluence = 0.8
      const targetMouseRotation = {
        x: mousePosition.y * rotationInfluence,
        y: mousePosition.x * rotationInfluence
      }
      
      // Smoothly interpolate mouse rotation
      const lerpFactor = 0.15
      mouseRotation.current.x += (targetMouseRotation.x - mouseRotation.current.x) * lerpFactor
      mouseRotation.current.y += (targetMouseRotation.y - mouseRotation.current.y) * lerpFactor
      
      // Apply base rotation + mouse rotation offset to rotation group
      meshRef.current.rotation.x = baseRotation.current.x + mouseRotation.current.x
      meshRef.current.rotation.y = baseRotation.current.y + mouseRotation.current.y
      meshRef.current.rotation.z = baseRotation.current.z
      
      // Parallax effect based on scroll
      const parallaxOffset = scrollProgress * parallaxDepth * 2
      const floatOffset = Math.sin(state.clock.elapsedTime + basePosition.current[0]) * 0.3
      
      groupRef.current.position.x = basePosition.current[0] + parallaxOffset * 0.5
      groupRef.current.position.y = basePosition.current[1] + parallaxOffset + floatOffset
      groupRef.current.position.z = basePosition.current[2] + parallaxOffset * 0.3
    }

    // Neon flicker effect
    flickerTimer.current -= delta
    if (flickerTimer.current <= 0) {
      // Random flicker - sometimes dim, sometimes bright, sometimes off
      const flickerType = Math.random()
      if (flickerType < 0.1) {
        // Quick dim (higher minimum)
        flickerTarget.current = 0.6 + Math.random() * 0.2
      } else if (flickerType < 0.2) {
        // Quick bright flash
        flickerTarget.current = 1.2 + Math.random() * 0.5
      } else if (flickerType < 0.25) {
        // Very brief dim (not off, just dimmer)
        flickerTarget.current = 0.5 + Math.random() * 0.2
      } else {
        // Normal brightness
        flickerTarget.current = 0.8 + Math.random() * 0.4
      }
      // Random timing for next flicker (0.3 to 1.2 seconds)
      flickerTimer.current = 0.3 + Math.random() * 0.9
    }

    // Smoothly interpolate to target flicker intensity
    flickerIntensity.current += (flickerTarget.current - flickerIntensity.current) * 0.3

    // Apply flicker to materials (with minimum brightness)
    const minBrightness = 0.5
    const flickerValue = Math.max(minBrightness, flickerIntensity.current)
    if (glowMaterialRef.current) {
      glowMaterialRef.current.opacity = 0.25 * flickerValue
    }
    if (mainMaterialRef.current) {
      mainMaterialRef.current.opacity = 0.8 * flickerValue
      mainMaterialRef.current.emissiveIntensity = 0.6 * flickerValue
    }
  })

  const getGeometry = () => {
    switch (shape) {
      case 'd4': // Tetrahedron - 4-sided die
        return <tetrahedronGeometry args={[size, 0]} />
      case 'd6': // Cube - 6-sided die
        return <boxGeometry args={[size, size, size]} />
      case 'd8': // Octahedron - 8-sided die
        return <octahedronGeometry args={[size, 0]} />
      case 'd12': // Dodecahedron - 12-sided die
        return <dodecahedronGeometry args={[size, 0]} />
      case 'd20': // Icosahedron - 20-sided die
        return <icosahedronGeometry args={[size, 0]} />
      default:
        return <boxGeometry args={[size, size, size]} />
    }
  }

  return (
    <group ref={groupRef} position={position}>
      <group ref={meshRef}>
        {/* Glow layer - slightly larger and more transparent */}
        <mesh>
          {getGeometry()}
          <meshBasicMaterial 
            ref={glowMaterialRef}
            color={color}
            transparent 
            opacity={0.25}
            wireframe
          />
        </mesh>
        {/* Main wireframe */}
        <mesh scale={0.95}>
          {getGeometry()}
          <meshStandardMaterial 
            ref={mainMaterialRef}
            color={color}
            transparent 
            opacity={0.8}
            wireframe
            emissive={color}
            emissiveIntensity={0.6}
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
        />
      )}
    </group>
  )
}

function BackgroundScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScrollProgress(progress)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial scroll position
    handleScroll()
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
      
      <ParallaxShape 
        position={[-4, 3, -6]} 
        rotationSpeed={0.3} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        shape="d4"
        size={1.5}
        color="#00ffff"
        parallaxDepth={1.5}
        nestedShape="d4"
      />
      <ParallaxShape 
        position={[4, -2, -8]} 
        rotationSpeed={-0.4} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        shape="d20"
        size={2.0}
        color="#667eea"
        parallaxDepth={2}
        nestedShape="d12"
      />
      <ParallaxShape 
        position={[0, 0, -10]} 
        rotationSpeed={0.5} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        shape="d8"
        size={1.8}
        color="#ff00ff"
        parallaxDepth={1.2}
        nestedShape="d6"
      />
      <ParallaxShape 
        position={[-6, -4, -7]} 
        rotationSpeed={-0.25} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        shape="d6"
        size={1.2}
        color="#ff6b9d"
        parallaxDepth={1.8}
        nestedShape="d4"
      />
      <ParallaxShape 
        position={[6, 4, -9]} 
        rotationSpeed={0.35} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
        shape="d12"
        size={1.6}
        color="#4facfe"
        parallaxDepth={1.6}
        nestedShape="d8"
      />
    </>
  )
}

export default BackgroundScene

