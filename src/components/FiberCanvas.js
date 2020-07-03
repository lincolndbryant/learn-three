import React, {Suspense} from 'react'
import FiberStar from "./FiberStar";
import SVGShape from "./SVGShape";
import {MOONLIGHT, SLATE, TEAL} from "../constants/colors";
import CameraControls from "./CameraControls";

const FiberCanvas = () => {
  return (
    <>
      <CameraControls/>
      <ambientLight/>
      <gridHelper args={[2000, 20]} rotation={[Math.PI / 2, 0, 0]}/>
      <pointLight position={[0, 0, 100]}/>
      <Suspense fallback={null}>
        <SVGShape url="/svg/hexagon.svg" textureUrl="/img/dark-stone.jpg" scale={20}/>
      </Suspense>
      <FiberStar url="/svg/drop.svg" numPoints={9} fillColor={SLATE} radius={100}/>
      <FiberStar url="/svg/drop-01.svg" textureUrl="/img/mosaic.jpg" numPoints={6} fillColor={TEAL} radius={150}
                 zPosition={50} scale={0.8}/>
      <FiberStar url="/svg/claw.svg" numPoints={4} fillColor={MOONLIGHT} zPosition={80} scale={0.5}/>
    </>
  )
}

export default FiberCanvas;
