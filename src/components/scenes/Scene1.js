import React from "react";
import Star from "../Star";
import { NEW_ENGLAND, PEA, TEAL } from "../../constants/colors";

export default () => {
  return (
    <>
      <Star
        url="/svg/drop.svg"
        fillColor={NEW_ENGLAND}
        radius={100}
        numPoints={16}
        zPosition={10}
      />

      <Star
        fillColor={TEAL}
        url="/svg/bulb.svg"
        radius={100}
        scale={0.75}
        zPosition={20}
        opacity={0}
      />

      <Star
        fillColor={PEA}
        numPoints={6}
        url="/svg/claw.svg"
        radius={50}
        zPosition={40}
        opacity={0.6}
        scale={0.5}
      />
    </>
  );
};
