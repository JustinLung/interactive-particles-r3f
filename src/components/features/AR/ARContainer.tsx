import { use8thwall } from '@/components/shared/8thwall/use8thwall';
import { Canvas } from '@react-three/fiber';
import { memo } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Scene } from './Scene';

export const ARContainer = memo(function ARContainer() {
  const { scene, camera } = use8thwall();

  return (
    <>
      <Canvas
        gl={{
          antialias: false,
        }}
        resize={{ polyfill: ResizeObserver }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        frameloop="never"
      >
        {scene && camera && <Scene scene={scene} camera={camera} />}
      </Canvas>
    </>
  );
});
