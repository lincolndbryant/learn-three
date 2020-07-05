import React, { Suspense } from "react";
import SVGShape from "./SVGShape";
import CameraControls from "./CameraControls";
import { MOONLIGHT } from "../constants/colors";

const FiberCanvas = ({ animating, intensity, children }) => {
  return (
    <>
      <CameraControls animating={animating} />
      <ambientLight position={[0, 0, 500]} color={MOONLIGHT} />
      <gridHelper args={[2000, 20]} rotation={[Math.PI / 2, 0, 0]} />
      <pointLight position={[0, 0, 500]} intensity={intensity} />
      <Suspense fallback={null}>
        <SVGShape
          url="/svg/hexagon.svg"
          textureUrl="/img/dark-stone.jpg"
          scale={200}
          zPosition={-20}
        />
      </Suspense>
        <mesh>
          <coneGeometry args={[50, 200, 320]} />
          <meshBasicMaterial color={0xffff00} />
        </mesh>
      {children}
    </>
  );
};

export default FiberCanvas;
