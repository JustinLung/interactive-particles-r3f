//@ts-nocheck
import { Backdrop, Box, Environment, Float, OrbitControls, Stage } from '@react-three/drei';
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

      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0.8, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Particles />
      </Float>

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
