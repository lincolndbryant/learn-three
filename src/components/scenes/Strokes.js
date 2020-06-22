import React from "react";
import Star from "../Star";
import {
  MOONLIGHT,
  NEW_ENGLAND,
  PEA,
  SLATE,
  TEAL,
} from "../../constants/colors";

export default () => {
  return (
    <>
      <Star
        url="/svg/drop-narrow.svg"
        radius={0}
        numPoints={3}
        strokeColor={PEA}
        fillColor={NEW_ENGLAND}
        // zPosition={20}
        drawStrokes={true}
      />
    </>
  );
};
