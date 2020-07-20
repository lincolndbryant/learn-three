import React from "react";
import CameraControls from "./CameraControls";

const FiberCanvas = ({ animating, intensity, children }) => {
  return (
    <>
      <CameraControls animating={animating} />
      <gridHelper args={[2000, 20]} rotation={[Math.PI / 2, 0, 0]} />
      <ambientLight position={[0, 0, 500]} />
      <pointLight position={[0, 0, 500]} intensity={intensity} />
      {children}
    </>
  );
};

export default FiberCanvas;
