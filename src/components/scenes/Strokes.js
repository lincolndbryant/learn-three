import React from "react";
import Star from "../Star";
import { NEW_ENGLAND, PEA } from "../../constants/colors";

export default () => {
  return (
    <>
      <Star
        url="/svg/drop-narrow.svg"
        radius={100}
        numPoints={3}
        strokeColor={PEA}
        fillColor={NEW_ENGLAND}
        depth={50}
        zPosition={20}
      />
    </>
  );
};
