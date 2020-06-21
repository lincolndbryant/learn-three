import React from "react";
import Shape from "../Shape";
import Star from "../Star";
import { NEW_ENGLAND, SLATE, TEAL } from "../../constants/colors";

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
        url="/svg/feather.svg"
        fillColor={TEAL}
        numPoints={16}
        zPosition={10}
      />

      <Star
        fillColor={NEW_ENGLAND}
        url="/svg/drop-narrow.svg"
        radius={100}
        scale={0.75}
        zPosition={20}
      />

      <Star
        fillColor={SLATE}
        numPoints={6}
        url="/svg/drop.svg"
        radius={20}
        zPosition={40}
        opacity={0.8}
        scale={0.5}
      />
    </>
  );
};
