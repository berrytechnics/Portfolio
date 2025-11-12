import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

function FloatingCube({ position, rotationSpeed }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed * delta
      meshRef.current.rotation.y += rotationSpeed * delta
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
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
      
      <FloatingCube position={[-3, 2, -5]} rotationSpeed={0.5} />
      <FloatingCube position={[3, -2, -5]} rotationSpeed={-0.3} />
      <FloatingCube position={[0, 0, -8]} rotationSpeed={0.4} />
      <FloatingCube position={[-5, -3, -6]} rotationSpeed={-0.2} />
      <FloatingCube position={[5, 3, -7]} rotationSpeed={0.6} />
    </>
  )
}

export default BackgroundScene

