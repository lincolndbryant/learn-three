import React from "react";
import Shape from "./Shape";
import Star from "./Star";
import { SLATE } from "../constants/colors";

export default () => {
  return (
    <>
      <Shape
        url="/svg/hexagon.svg"
        textureUrl={"/img/dark-stone.jpg"}
        name="hexagon"
        fillColor={SLATE}
        position={[0, 0, -20]}
        scale={10}
        depth={1}
      />

      <Star
        PointComponent={Shape}
        url="/svg/drop.svg"
        textureUrl={"/img/mosaic.jpg"}
        zPosition={10}
      />

      <Star
        PointComponent={Shape}
        fillColor="#2a9d8f"
        url="/svg/drop-narrow.svg"
        radius={100}
        zPosition={20}
        opacity={0.8}
      />
    </>
  );
};
