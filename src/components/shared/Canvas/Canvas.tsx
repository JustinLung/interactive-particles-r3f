import { Backdrop, Box, Environment, Float, OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export interface DynamicCanvasProps {}

export function DynamicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      ref={ref}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      gl={{
        antialias: false,
      }}
    >
      <CanvasElements />
    </Canvas>
  );
}

const CanvasElements = () => {
  const boxRef = useRef<any>(null);

  useGSAP(
    () => {
      if (!boxRef.current) return;

      gsap.to(boxRef.current.rotation, { x: '+=1', repeat: -1, ease: 'none', repeatRefresh: true });
    },
    { dependencies: [boxRef], revertOnUpdate: true },
  );
  return (
    <Suspense>
      <color attach="background" args={['#111']} />
      <ambientLight />

      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.8, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Box
          ref={boxRef}
          material-transparent={true}
          material-color="hotpink"
          args={[1.8, 3.6, 0.18]}
        />
      </Float>

      <Backdrop receiveShadow scale={[40, 40, 40]} floor={1.5} position={[0, -5, -5]}>
        <meshPhysicalMaterial roughness={1} color="#efefef" />
      </Backdrop>

      <rectAreaLight
        args={['white', 15]}
        width={5}
        height={5}
        position={[0, 3, 1]}
        // @ts-ignore
        target={[0, 0, 0]}
        visible={true}
      />

      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} makeDefault />
    </Suspense>
  );
};
