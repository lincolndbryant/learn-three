import React, { Suspense } from "react";
import SVGShape from "./SVGShape";
import CameraControls from "./CameraControls";
import { MOONLIGHT } from "../constants/colors";

const FiberCanvas = ({ animating, intensity, children }) => {
  return (
    <>
      <CameraControls animating={animating} />
      <ambientLight color={MOONLIGHT} />
      <gridHelper args={[2000, 20]} rotation={[Math.PI / 2, 0, 0]} />
      <pointLight position={[0, 0, 100]} intensity={intensity} />
      <Suspense fallback={null}>
        <SVGShape
          url="/svg/hexagon.svg"
          textureUrl="/img/dark-stone.jpg"
          scale={200}
          zPosition={-20}
        />
      </Suspense>
      {children}
    </>
  );
};

export default FiberCanvas;
