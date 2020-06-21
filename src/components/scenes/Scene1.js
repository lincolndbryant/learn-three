import React from "react";
import Shape from "../Shape";
import Star from "../Star";
import { NEW_ENGLAND, PEA, TEAL } from "../../constants/colors";

export default () => {
  return (
    <>
      <Shape
        url="/svg/hexagon.svg"
        textureUrl={"/img/dark-stone.jpg"}
        name="hexagon"
        position={[0, 0, -50]}
        scale={10}
        zPosition={-50}
        depth={2}
      />

      <Star
        url="/svg/drop.svg"
        fillColor={NEW_ENGLAND}
        numPoints={16}
        zPosition={10}
      />

      <Star
        fillColor={TEAL}
        url="/svg/drop-narrow.svg"
        radius={100}
        scale={0.75}
        zPosition={20}
        opacity={0.8}
      />

      <Star
        fillColor={PEA}
        numPoints={6}
        url="/svg/drop-narrow.svg"
        radius={50}
        zPosition={40}
        opacity={0.6}
        scale={0.5}
      />
    </>
  );
};
