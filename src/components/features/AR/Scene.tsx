import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group, PerspectiveCamera } from 'three';
import type { Scene as ThreeScene } from 'three';

import { useDebug } from '@/state/debug';

interface RevealSceneProps {
  camera: PerspectiveCamera | null;
  scene: ThreeScene | null;
}

export const Scene = ({ camera, scene }: RevealSceneProps) => {
  const isDebugMode = useDebug();
  const { set } = useThree();

  // ref to root of our ThreeJS app
  const containerRef = useRef<Group>(null);

  // add our app to 8thWall's ThreeJS scene
  useEffect(() => {
    if (scene && containerRef.current) {
      scene.add(containerRef.current);
    }
  }, [scene]);

  // set 8thWall's ThreeJS camera as default camera of
  // react-three-fiber
  useEffect(() => {
    if (camera) {
      set({ camera });
    }
  }, [camera, set]);

  return (
    <>
      <group ref={containerRef}>
        {isDebugMode && (
          <>
            <axesHelper args={[5]} />
          </>
        )}

        <mesh position={[0, 0, -2]}>
          <boxGeometry />
          <meshBasicMaterial color="hotpink" />
        </mesh>
      </group>
    </>
  );
};
