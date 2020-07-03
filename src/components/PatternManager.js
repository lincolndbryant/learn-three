import React, { useEffect, useState } from "react";
import FiberStar from "./FiberStar";

const Pattern = ({ pattern }) => {
  const layerData = pattern.layers.toList().toJS();
  return layerData.map((layer, i) => {
    return <FiberStar key={i} {...layer} />;
  });
};

const PatternManager = ({ pattern }) => {
  return (
    <>
      <Pattern pattern={pattern} />
    </>
  );
};

export default Pattern;
