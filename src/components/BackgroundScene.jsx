import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'

function FloatingCube({ position, rotationSpeed, mousePosition }) {
  const meshRef = useRef()
  const baseRotation = useRef({ x: 0, y: 0 })
  const mouseRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Accumulate base rotation
      baseRotation.current.x += rotationSpeed * delta
      baseRotation.current.y += rotationSpeed * delta
      
      // Calculate target mouse rotation
      const rotationInfluence = 1.2
      const targetMouseRotation = {
        x: mousePosition.y * rotationInfluence,
        y: mousePosition.x * rotationInfluence
      }
      
      // Smoothly interpolate mouse rotation
      const lerpFactor = 0.2
      mouseRotation.current.x += (targetMouseRotation.x - mouseRotation.current.x) * lerpFactor
      mouseRotation.current.y += (targetMouseRotation.y - mouseRotation.current.y) * lerpFactor
      
      // Apply base rotation + mouse rotation offset
      meshRef.current.rotation.x = baseRotation.current.x + mouseRotation.current.x
      meshRef.current.rotation.y = baseRotation.current.y + mouseRotation.current.y
      
      // Keep original floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.001
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial 
        color="#667eea" 
        transparent 
        opacity={0.3}
        wireframe
      />
    </mesh>
  )
}

function BackgroundScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to -1 to 1 range
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
      
      <FloatingCube position={[-3, 2, -5]} rotationSpeed={0.5} mousePosition={mousePosition} />
      <FloatingCube position={[3, -2, -5]} rotationSpeed={-0.3} mousePosition={mousePosition} />
      <FloatingCube position={[0, 0, -8]} rotationSpeed={0.4} mousePosition={mousePosition} />
      <FloatingCube position={[-5, -3, -6]} rotationSpeed={-0.2} mousePosition={mousePosition} />
      <FloatingCube position={[5, 3, -7]} rotationSpeed={0.6} mousePosition={mousePosition} />
    </>
  )
}

export default BackgroundScene

