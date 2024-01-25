//@ts-nocheck
import { Environment, Float, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { useMemo } from 'react';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shader';

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

  return (
    <Suspense>
      <color attach="background" args={['#000']} />
      <ambientLight />

      {/* Use a different preset */}
      <Environment preset="night" background />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1} floatingRange={[0.8, 1]}>
        <Particles />
      </Float>

      <OrbitControls enableDamping minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} makeDefault />
    </Suspense>
  );
};

const Particles = () => {
  const planePositions = useMemo(() => {
    const planeGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const positions = planeGeometry.attributes.position.array;

    console.log(positions);

    return positions;
  }, []);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    [],
  );

  useFrame(() => {
    shaderArgs.uniforms.uTime.value++;
    // @ts-ignore
  }, []);

  return (
    <points rotation={[2, 0, 0]}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={planePositions}
          itemSize={3}
          count={planePositions.length / 3}
        />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} transparent depthTest={false} depthWrite={false} />
    </points>
  );
};
