import React, { Suspense } from "react";
import SVGShape from "./SVGShape";
import CameraControls from "./CameraControls";
import {MOONLIGHT, SLATE} from "../constants/colors";

const FiberCanvas = ({ animating, intensity, children }) => {
  return (
    <>
      <CameraControls animating={animating} />
      <gridHelper args={[2000, 20]} rotation={[Math.PI / 2, 0, 0]} />
      <ambientLight position={[0, 0, 500]} color={MOONLIGHT} />
      <pointLight position={[0, 0, 500]} intensity={intensity} />
      {children}
    </>
  );
};

export default FiberCanvas;
