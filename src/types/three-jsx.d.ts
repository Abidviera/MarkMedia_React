/* eslint-disable @typescript-eslint/no-namespace */
import '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Geometries
      boxGeometry: any;
      sphereGeometry: any;
      planeGeometry: any;
      torusGeometry: any;
      cylinderGeometry: any;
      coneGeometry: any;
      circleGeometry: any;
      ringGeometry: any;
      octahedronGeometry: any;
      icosahedronGeometry: any;
      dodecahedronGeometry: any;
      tetrahedronGeometry: any;
      bufferGeometry: any;

      // Materials
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      meshPhysicalMaterial: any;
      pointsMaterial: any;
      lineBasicMaterial: any;

      // Objects
      mesh: any;
      group: any;
      scene: any;
      camera: any;
      points: any;
      line: any;
      sprite: any;

      // Lights
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      directionalLight: any;
      hemisphereLight: any;
      rectAreaLight: any;

      // Controls
      orbitControls: any;

      // Helpers
      axesHelper: any;
      gridHelper: any;

      // Attributes
      bufferAttribute: any;
    }
  }
}

export {};
