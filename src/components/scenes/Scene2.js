import React from "react";
import Star from "../FiberStar";
import { NEW_ENGLAND, SLATE, TEAL } from "../../constants/colors";

export default () => {
  return (
    <>
      <Star
        url="/svg/feather.svg"
        fillColor={TEAL}
        numPoints={16}
        zPosition={10}
        opacity={0.8}
        scale={0.8}
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
        numPoints={5}
        url="/svg/drop-01.svg"
        radius={20}
        zPosition={40}
        opacity={0.8}
        scale={0.5}
      />
    </>
  );
};
