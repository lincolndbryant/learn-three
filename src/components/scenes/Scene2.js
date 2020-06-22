import React from "react";
import Shape from "../Shape";
import Star from "../Star";
import { NEW_ENGLAND, SLATE, TEAL } from "../../constants/colors";

export default () => {
  return (
    <>
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
        url="/svg/drop-01.svg"
        numPoints={5}
        fillColor={SLATE}
        strokeColor={NEW_ENGLAND}
        radius={20}
        zPosition={40}
        opacity={0.8}
        // scale={0.5}
      />
    </>
  );
};
