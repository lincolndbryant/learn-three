import React, { useRef } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

let startAt;
let elapsedMs = 0;
const speed = 0.2;
const radius = 500;

const CameraControls = ({ animating }) => {
  if (!startAt) {
    startAt = Date.now();
  }
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(({ camera }, delta) => {
    if (animating) {
      elapsedMs += delta * speed;
    }
    controls.current.update();
    // camera.rotation.z = elapsedMs % 360;
    camera.position.set(
      Math.sin(elapsedMs) * radius,
      Math.cos(elapsedMs) * radius,
      camera.position.z
    );
    // camera.lookAt(0, 0, 0);
  });
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default CameraControls;
