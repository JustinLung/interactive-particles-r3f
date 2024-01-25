interface Window {
  XR8: any;
  XRExtras: any;
  plausible: any;
}

interface Document {
  msHidden: string | undefined;
  webkitHidden: string | undefined;
}

declare const XR8: any;
declare const XRExtras: any;

namespace JSX {
  interface IntrinsicElements {
    fallingSparklesMaterial: ReactThreeFiber.Object3DNode<CustomMaterial, typeof CustomMaterial>;
  }
}
