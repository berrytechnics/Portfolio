import { Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { ParallaxShape } from "./ParallaxShape";
import { useMouseAndScroll } from "./useMouseAndScroll";

export default function BackgroundScene() {
  const { mousePosition, scrollProgress } = useMouseAndScroll();

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
        color="#764ba2"
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
        color="#00ff88"
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

      {/* Bloom post-processing effect */}
      <EffectComposer>
        <Bloom
          intensity={2.0}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.4}
          height={300}
        />
      </EffectComposer>
    </>
  );
}

