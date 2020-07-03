import React, { useRef } from "react";
import { useFrame, useThree, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls component.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement },
  } = useThree();
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  let elapsedMs = 0;
  useFrame(({ camera }, delta) => {
    elapsedMs += delta * 0.4;
    controls.current.update();
    camera.rotation.z = elapsedMs % 360;
  });
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

export default CameraControls;
