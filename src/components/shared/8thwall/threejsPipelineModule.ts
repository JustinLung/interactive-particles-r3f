import { Dispatch, SetStateAction } from 'react';
import { PerspectiveCamera, Scene } from 'three';

import { usePermissions } from '@/state/permissions';
import { Console } from '@/utils/console';

type Engage = {
  canvas: HTMLCanvasElement;
} & CanvasSizeChange;

type CanvasSizeChange = {
  canvasWidth: number;
  canvasHeight: number;
};

export const threejsPipelineModule = ({
  setScene,
  setCamera,
}: {
  setScene: Dispatch<SetStateAction<Scene | null>>;
  setCamera: Dispatch<SetStateAction<PerspectiveCamera | null>>;
}) => {
  let engaged = false;

  const engage = async ({ canvas }: Engage) => {
    if (engaged) {
      return;
    }
    const { scene, camera } = XR8.Threejs.xrScene();

    setScene(scene);
    setCamera(camera);
    engaged = true;

    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    });

    // Recenter content when the canvas is tapped.
    canvas.addEventListener(
      'touchstart',
      e => {
        e.touches.length === 1 && XR8.XrController.recenter();
      },
      true,
    );
  };

  return {
    name: 'customthreejs',
    onStart: (args: Engage) => engage(args),
    onAttach: (args: Engage) => engage(args),
    onDetach: () => {
      engaged = false;
    },
    onException: (error: any) => {
      Console.log('XR threw an exception -->', error);
      Console.log(error);
      if (error.type === 'permission' && error.status === 'denied') {
        usePermissions.setState(false);
      }
    },
    onCameraStatusChange: ({ status }: { status: string }) => {
      if (status === 'failed') {
        usePermissions.setState(false);
      }
    },
  };
};
