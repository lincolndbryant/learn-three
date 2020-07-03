import React from "react";
import FiberStar from "../FiberStar";
import { MOONLIGHT, SLATE, TEAL } from "../../constants/colors";

return () => [
  <FiberStar
    url="/svg/drop.svg"
    numPoints={9}
    fillColor={SLATE}
    radius={100}
  />,
  <FiberStar
    url="/svg/drop-01.svg"
    textureUrl="/img/mosaic.jpg"
    numPoints={6}
    fillColor={TEAL}
    radius={150}
    zPosition={50}
    scale={0.8}
  />,
  <FiberStar
    url="/svg/claw.svg"
    numPoints={4}
    fillColor={MOONLIGHT}
    zPosition={80}
    scale={0.5}
  />,
];
