import { useCallback, useEffect, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import * as THREE from 'three';
import { PerspectiveCamera, Scene } from 'three';
import { threejsPipelineModule } from './threejsPipelineModule';
import { useLoader } from '@/state/loader';

export interface EightWallProps {
  XR8: any;
}

type Use8thwallReturn = {
  scene: Scene | null;
  camera: PerspectiveCamera | null;
};

export const use8thwall = (): Use8thwallReturn => {
  const [XRLoaded, setXRLoaded] = useState(false);
  const [XRExtrasLoaded, setXRExtrasLoaded] = useState(false);
  const [scene, setScene] = useState<Scene | null>(null);
  const [camera, setCamera] = useState<PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!XRLoaded || !XRExtrasLoaded) return;

    const { XRExtras, XR8 } = window;
    window.THREE = THREE;

    XR8.addCameraPipelineModules([
      XR8.GlTextureRenderer.pipelineModule(),
      XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
      XR8.XrController.pipelineModule(), // Enables SLAM tracking.
      XRExtras.AlmostThere.pipelineModule(),
      XRExtras.FullWindowCanvas.pipelineModule(),
      XRExtras.RuntimeError.pipelineModule(),
      threejsPipelineModule({ setScene, setCamera }),
    ]);

    document.body.insertAdjacentHTML('beforeend', '<canvas id="camerafeed"></canvas>');
    XR8.run({
      canvas: document.getElementById('camerafeed'),
      cameraConfig: {
        direction: XR8.XrConfig.camera().BACK,
      },
    });

    XR8.initialize().then(() => {
      useLoader.setState({
        loadedXr: XR8.isInitialized() as boolean,
      });
    });

    // Cleanup
    return () => {
      const canvas = document.getElementById('camerafeed');
      if (canvas) canvas.remove();
      XR8.stop();
      XR8.clearCameraPipelineModules();
    };
  }, [XRLoaded, XRExtrasLoaded]);

  const onxrloaded = useCallback(() => {
    setXRLoaded(true);
  }, []);

  useEffect(() => {
    if (window.XR8) {
      setXRLoaded(true);
    } else {
      window.addEventListener('xrloaded', onxrloaded);
    }

    return () => {
      window.removeEventListener('xrloaded', onxrloaded);
    };
  }, [onxrloaded]);

  const onxrExtrasLoaded = useCallback(() => {
    setXRExtrasLoaded(true);
  }, []);

  useEffect(() => {
    if (window.XRExtras) {
      setXRExtrasLoaded(true);
    } else {
      window.addEventListener('xrextrasloaded', onxrExtrasLoaded);
    }

    return () => {
      window.removeEventListener('xrextrasloaded', onxrExtrasLoaded);
    };
  }, [onxrExtrasLoaded]);

  useIsomorphicLayoutEffect(() => {
    let inDom = false;
    const observer = new MutationObserver(() => {
      if (document.querySelector('.prompt-box-8w')) {
        if (!inDom) {
          document.querySelector('.prompt-box-8w p')!.innerHTML =
            'Om de AR te kunnen starten hebben we toegang nodig tot de camera, microfoon en bewegingssensoren.';
          document.querySelector('.prompt-button-8w')!.innerHTML = 'Weigeren';
          document.querySelector('.button-primary-8w')!.innerHTML = 'Doorgaan';
        }
        inDom = true;
      } else if (inDom) {
        inDom = false;
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { scene, camera };
};
